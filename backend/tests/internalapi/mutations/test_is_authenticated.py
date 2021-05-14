import pytest

from django.core import mail

from user.models import User as DjangoUser
from tests.user.factories import UserFactory


# This runs the Is Authenticated mutation which is just an example mutation of how to
# Restrict access to a mutation from those who are not logged in.

@pytest.mark.django_db
class TestIsAuthenticatedMutation:

    mutation = """
        mutation AuthenticateUser($input:AuthenticateUserInput!) {
            authenticateUser(input: $input) {
                __typename
                ... on AuthenticateUserSuccess{
                  user{
                    localId
                    username
                  }
                  token  
                }
                ... on AuthenticateUserError{
                  nonFieldErrors
                } 
            }
        }
    """

    mutation2 = """
        mutation IsAuthenticated($input:IsAuthenticatedInput!) {
            isAuthenticated(input: $input) {
                __typename
                ... on IsAuthenticatedSuccess{
                  string  
                }
                ... on IsAuthenticatedError{
                  errors
                } 
            }
        }
    """


    @pytest.fixture
    def user(self):
        return UserFactory(username="createdUserOne",password="useronepass")

    @pytest.fixture
    def client(self, graphql_client_factory, user):
        return graphql_client_factory(user=user)

    @pytest.fixture
    def variable_values(self):
        return {
            "input":{
                "username": "createdUserOne",
                "password": "useronepass",
            }
        }
    
    @pytest.fixture
    def variable_values2(self, user):
        return {
            "input":{
                "id": user.id,
                "token": "asda.we.asd",
            }
        }

    def test_is_authenticated_success(self, variable_values,variable_values2,client):

        response = client.execute(self.mutation, variable_values=variable_values)
        variable_values2["input"]["token"]=response["data"]["authenticateUser"]["token"]
        response = client.execute(self.mutation2, variable_values=variable_values2)
        assert response["data"]["isAuthenticated"]["__typename"]=="IsAuthenticatedSuccess"
    
    def test_is_authenticated_token_wrong_failure(self, variable_values,variable_values2,client):

        response = client.execute(self.mutation, variable_values=variable_values)
        response = client.execute(self.mutation2, variable_values=variable_values2)
        print(response)
        assert response["data"]["isAuthenticated"]["__typename"]=="IsAuthenticatedError"
