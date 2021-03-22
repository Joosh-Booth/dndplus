import pytest

from django.core import mail

from user.models import User as DjangoUser
from tests.user.factories import UserFactory


@pytest.mark.django_db
class TestCreateUserMutation:
    mutation1 = """
        mutation createUserMutation($input: CreateUserInput!) {
            createUser(input: $input) {
                __typename
                ... on CreateUserSuccess {
                    user {
                        localId
                        email
                        username
                    }
                }
                ... on CreateUserError {
                    nonFieldErrors
                    fieldErrors {
                        fieldName
                        errors
                    }
                }
            }
        }
    """

    mutation2 = """
        mutation AuthoriseUser($input:AuthoriseUserInput!) {
            authoriseUser(input: $input) {
                __typename
                ... on AuthoriseUserSuccess{
                  user{
                    localId
                    username
                  }
                  token  
                }
                ... on AuthoriseUserError{
                  
                  nonFieldErrors
                } 
            }
        }
    """

    mutation3 = """
        mutation IsAuthenticated($input:IsAuthenticatedInput!) {
            isAuthenticated(input: $input) {
                __typename
                ... on IsAuthenticatedSuccess{
                  string  
                }
                ... on IsAuthenticatedError{
                  nonFieldErrors
                } 
            }
        }
    """

    @pytest.fixture
    def variable_values1(self):
        return {
            "input": {
                "email": "testymctestface@flatmatch.com",
                "username": "createdUserOne",
                "password": "TestPassword"
            }
        }


    @pytest.fixture
    def client(self, graphql_client_factory):
        return graphql_client_factory()

    @pytest.fixture
    def variable_values2(self):
        return {
            "input":{
                "username": "createdUserOne",
                "password": "TestPassword",
            }
        }
    
    @pytest.fixture
    def variable_values3(self):
        return {
            "input":{
                "username": "createdUserOne",
                "token": " ",
            }
        }

    def test_create_user(self, variable_values1, variable_values2,variable_values3,client):
        response = client.execute(self.mutation1, variable_values=variable_values1)
        
        assert DjangoUser.objects.count() == 1
        user = DjangoUser.objects.first()
        print(user.username+".."+user.password+" "+user.email)
        response = client.execute(self.mutation2, variable_values=variable_values2)
        print(response)
        variable_values3["input"]["token"]=response["data"]["authoriseUser"]["token"]
        response = client.execute(self.mutation3, variable_values=variable_values3)
        print(response)
        #result = response["data"]["createUser"]
        assert 1==0
