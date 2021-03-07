import pytest

from django.core import mail

from user.models import User as DjangoUser
from tests.user.factories import UserFactory


@pytest.mark.django_db
class TestCreateUserMutation:
    mutation1 = """
        mutation AuthoriseUser($input:AuthoriseUserInput!) {
            authoriseUser(input: $input) {
                __typename
                ... on AuthoriseUserSuccess{
                  user{
                    localId
                  }
                  token  
                }
                ... on AuthoriseUserError{
                  
                  nonFieldErrors
                } 
            }
        }
    """

    mutation2 = """
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

    @pytest.fixture
    def variable_values2(self):
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
    def variable_values1(self):
        return {
            "input":{
                "username": "createdUserOne",
                "password": "TestPassword",
            }
        }
        

    def test_create_user(self, variable_values1, variable_values2,client):
        response = client.execute(self.mutation2, variable_values=variable_values2)
        
        assert DjangoUser.objects.count() == 1
        user = DjangoUser.objects.first()
        print(user.username+".."+user.password+" "+user.email)
        response = client.execute(self.mutation1, variable_values=variable_values1)
        print(response)
        #result = response["data"]["createUser"]
        assert 1==0
