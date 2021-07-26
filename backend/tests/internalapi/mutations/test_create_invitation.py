from campaign.models import Campaign, Invitation, campaign
import pytest

from django.core import mail

from user.models import User as DjangoUser
from tests.user.factories import UserFactory
from tests.campaign.factories import CampaignFactory


# This is to test whether a user can be authenticated using log in details so they can be supplied a token

@pytest.mark.django_db
class TestCreateInvitation:
    mutation = """
        mutation CreateInvitation($input:CreateInvitationInput!) {
            createInvitation(input: $input) {
                __typename
                ... on CreateInvitationSuccess{
                  message
                }
                ... on CreateInvitationError{
                  fieldErrors{
                      fieldName
                      errors
                  }
                  nonFieldErrors
                } 
            }
        }
    """

    @pytest.fixture
    def user(self):
        u1 = UserFactory(username="createdUserOne",password="useronepass")
        u2 = UserFactory(username="createdUserTwo",password="usertwopass")
        return u1,u2

    @pytest.fixture
    def client(self, graphql_client_factory, user):
        return graphql_client_factory(user=user[0])

    @pytest.fixture
    def game(self, user):
        return CampaignFactory(created_by=user[0])

    @pytest.fixture
    def variable_values(self,user, game):
        return {
            "input":{
                "sentTo": user[1].username,
                "roomCode": game.room_code,
            }
        }
        

    def test_create_invite_success(self, variable_values, client, user, game):

        response = client.execute(self.mutation, variable_values=variable_values)
        result = response["data"]["createInvitation"]
        assert result["__typename"] == "CreateInvitationSuccess"
        
        assert user[1].invitations.filter(sent_by=user[0]).count() == 1

    def test_create_invite_failure_cannot_invite_self(self, variable_values, client, user):
        variable_values["input"]["sentTo"]=user[0].username
        response = client.execute(self.mutation, variable_values=variable_values)
        result = response["data"]["createInvitation"]
        assert result["__typename"] == "CreateInvitationError"
        errors = result["fieldErrors"]
        assert errors[0]["fieldName"]=="SENT_TO"

    def test_create_invite_failure_user_fail(self, variable_values, client, user):
        variable_values["input"]["sentTo"]="fdgsdgknkjgna"
        response = client.execute(self.mutation, variable_values=variable_values)
        result = response["data"]["createInvitation"]
        assert result["__typename"] == "CreateInvitationError"
        errors = result["fieldErrors"]
        assert errors[0]["fieldName"]=="SENT_TO"

    def test_create_invite_failure_already_invited(self, variable_values, client, user, game):

        client.execute(self.mutation, variable_values=variable_values)
        response = client.execute(self.mutation, variable_values=variable_values)
        result = response["data"]["createInvitation"]
        assert result["__typename"] == "CreateInvitationError"
        assert user[1].invitations.filter(sent_by=user[0]).count() == 1

        new_game = CampaignFactory(created_by=user[0])
        variable_values["input"]["roomCode"]=new_game.room_code

        response = client.execute(self.mutation, variable_values=variable_values)
        result = response["data"]["createInvitation"]
        assert result["__typename"] == "CreateInvitationSuccess"
        assert user[1].invitations.filter(sent_by=user[0]).count() == 2

    def test_create_invite_failure_already_in_game(self, variable_values, client, user, game):
        user[1].campaigns.add(game)
        response = client.execute(self.mutation, variable_values=variable_values)
        result = response["data"]["createInvitation"]
        assert result["__typename"] == "CreateInvitationError"
        
