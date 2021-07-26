import pytest

from django.core import mail

from user.models import User as DjangoUser
from tests.user.factories import UserFactory


@pytest.mark.django_db
class TestCreateUserMutation:
    mutation = """
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
    def client(self, graphql_client_factory):
        return graphql_client_factory()

    @pytest.fixture
    def exisiting_user(self):
        return UserFactory(email="testymctestface@flatmatch.com")

    @pytest.fixture
    def variable_values(self):
        return {
            "input": {
                "email": "testymctestface@flatmatch.com",
                "username": "createdUserOne",
                "password": "TestPassword"
            }
        }

    def test_create_user(self, variable_values, client):
        assert DjangoUser.objects.count() == 0
        response = client.execute(self.mutation, variable_values=variable_values)
        result = response["data"]["createUser"]

        assert result["__typename"] == "CreateUserSuccess"
        user_response = result["user"]
        variable_input = variable_values["input"]
        assert user_response["email"] == variable_input["email"]
        assert user_response["username"] == variable_input["username"]
        assert DjangoUser.objects.count() == 1

        user_instance = DjangoUser.objects.first()
        assert user_instance.email == variable_input["email"]
        assert user_instance.username == variable_input["username"]

        # Check that the user was sent an email when this mutation was successfully ran
        # assert len(mail.outbox) == 1
        # sent_email = mail.outbox[0]
        # assert sent_email.from_email == 'hello@flatmatch.com'
        # assert "testymctestface@flatmatch.com" in sent_email.to
        # html_body = sent_email.alternatives[0][0]
        # assert 'Hey Testy McTestFace!' in html_body

    # def test_missing_required_field(self, variable_values, client):
    #     variable_values["input"]["email"] = ""
    #     response = client.execute(self.mutation, variable_values=variable_values)
    #     result = response["data"]["createUser"]

    #     assert result["__typename"] == "CreateUserError"
    #     assert len(result["fieldErrors"]) == 1
    #     error = result["fieldErrors"][0]
    #     assert error["fieldName"] == "EMAIL"
    #     assert "This field is required." in error["errors"]

    #     assert len(mail.outbox) == 0

    # def test_duplicate_user_email_raises_error(self, exisiting_user, variable_values, client):
    #     # We pass in the existing_user fixture, so there's already a User with the email
    #     assert DjangoUser.objects.count() == 1
    #     response = client.execute(self.mutation, variable_values=variable_values)
    #     result = response["data"]["createUser"]

    #     assert result["__typename"] == "CreateUserError"
    #     assert len(result["fieldErrors"]) == 1
    #     error = result["fieldErrors"][0]
    #     assert error["fieldName"] == "EMAIL"
    #     assert "User with this Email already exists." in error["errors"]

    #     assert len(mail.outbox) == 0

    # def test_password_not_long_enough_raises_error(self, variable_values, client):
    #     variable_values["input"]["password"] = "Short"
    #     response = client.execute(self.mutation, variable_values=variable_values)
    #     result = response["data"]["createUser"]

    #     assert result["__typename"] == "CreateUserError"
    #     assert len(result["fieldErrors"]) == 1
    #     error = result["fieldErrors"][0]
    #     assert error["fieldName"] == "PASSWORD"
    #     assert "Ensure this value has at least 8 characters (it has 5)." in error["errors"]

    #     assert len(mail.outbox) == 0
