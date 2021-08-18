import pytest
from django.core import mail

from campaign.models import Campaign, Invitation, campaign
from user.models import User as DjangoUser

from tests.user.factories import UserFactory
from tests.campaign.factories import CampaignFactory



@pytest.mark.django_db
class TestLeaveCampaign:
    mutation = """
        mutation LeaveCampaign($input:LeaveCampaignInput!) {
            leaveCampaign(input: $input) {
                __typename
                ... on LeaveCampaignSuccess{
                  message
                }
                ... on LeaveCampaignError{
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
        u3 = UserFactory(username="createdUserThr",password="userthreepass")
        return u1,u2,u3

    @pytest.fixture
    def client(self, graphql_client_factory, user):
        return graphql_client_factory(user=user[0]), graphql_client_factory(user=user[1])

    @pytest.fixture
    def game(self, user):
        campaign = CampaignFactory(created_by=user[0], owner=user[0])
        user[0].campaigns.add(campaign)
        user[1].campaigns.add(campaign)
        user[2].campaigns.add(campaign)
        return campaign

    @pytest.fixture
    def variable_values(self,user, game):
        return {
            "input":{
                "roomCode": game.room_code,
            }
        }
        

    def test_leave_campaign_success(self, variable_values, client, user, game):
        assert game.user_set.count()==3
        response = client[1].execute(self.mutation, variable_values=variable_values)
        result = response["data"]["leaveCampaign"]
        assert result["__typename"] == "LeaveCampaignSuccess"
        assert game.user_set.count()==2
        object = Campaign.objects.get(room_code=game.room_code)
        print("fine")
        response = client[0].execute(self.mutation, variable_values=variable_values)
        result = response["data"]["leaveCampaign"]
        assert result["__typename"] == "LeaveCampaignSuccess"
        assert Campaign.objects.filter(room_code=game.room_code).count() == 0
        
