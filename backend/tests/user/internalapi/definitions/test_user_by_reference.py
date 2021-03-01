import pytest

from tests.user.factories import UserFactory


@pytest.mark.django_db
class TestUserByReferenceQuery:

    query = '''
        query testUserByReference ($reference: String!) {
            userByReference (reference: $reference) {
                givenNames
                lastName
                email
                reference
            }
        }
    '''

    @pytest.fixture
    def client(self, graphql_client_factory, user):
        return graphql_client_factory(user=user)

    @pytest.fixture
    def user(self):
        return UserFactory(
            given_names="Arnold", last_name="Schwarzenegger"
        )

    def test_user_by_reference(self, client, user):
        result = client.execute(self.query, variable_values={'reference': user.reference})
        assert len(result['data']) == 1

        user_response = result["data"]["userByReference"]
        assert user_response["givenNames"] == "Arnold"
        assert user_response["lastName"] == "Schwarzenegger"
        assert user_response["reference"] == user.reference
        assert user_response["email"] == user.email