import pytest

from tests.user.factories import UserFactory


@pytest.mark.django_db
class TestUserByReferenceQuery:

    query = '''
        query testUserByReference ($reference: String!) {
            userByReference (reference: $reference) {
                userName
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
            user_name="noob"
        )

    def test_user_by_reference(self, client, user):
        result = client.execute(self.query, variable_values={'reference': user.reference})
        assert len(result['data']) == 1

        user_response = result["data"]["userByReference"]
        assert user_response["userName"] == "noob"
        assert user_response["reference"] == user.reference
        assert user_response["email"] == user.email