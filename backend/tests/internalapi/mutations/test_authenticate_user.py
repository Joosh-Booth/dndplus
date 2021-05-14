import pytest

from django.core import mail

from user.models import User as DjangoUser
from tests.user.factories import UserFactory


# This is to test whether a user can be authenticated using log in details so they can be supplied a token

@pytest.mark.django_db
class TestAuthenticateUser:
    mutation = """
        mutation AuthenticateUser($input:AuthenticateUserInput!) {
            authenticateUser(input: $input) {
                __typename
                ... on AuthenticateUserSuccess{
                  user{
                    localId
                  }
                  token  
                }
                ... on AuthenticateUserError{
                  nonFieldErrors
                } 
            }
        }
    """

    @pytest.fixture
    def user(self):
        return UserFactory(username="createdUserOne",password="useronepass")

    @pytest.fixture
    def client(self, graphql_client_factory):
        return graphql_client_factory()

    @pytest.fixture
    def variable_values(self,user):
        return {
            "input":{
                "username": user.username,
                "password": "useronepass",
            }
        }
        

    def test_authenticate_user_success(self, variable_values, client, user):

        response = client.execute(self.mutation, variable_values=variable_values)
        result = response["data"]["authenticateUser"]
        assert result["__typename"] == "AuthenticateUserSuccess"

        user_result = result["user"]
        assert user_result["localId"] == str(user.id)


    def test_authenticate_user_failure(self, variable_values, client, user):

        variable_values["input"]["password"] = " "
        response = client.execute(self.mutation, variable_values=variable_values)
        result = response["data"]["authenticateUser"]
        assert result["__typename"] == "AuthenticateUserError"
        assert "Username and/or password was incorrect" in result["nonFieldErrors"] 
