import pytest

from tests.user.factories import UserFactory


@pytest.mark.django_db
class TestUserByReferenceQuery:

    query = '''
        query testCampaignByUser {
            campaignByUser {
                title
                roomCode
            }
        }
    '''

    @pytest.fixture
    def client(self, graphql_client_factory, user):
        return graphql_client_factory(user=user)

    @pytest.fixture
    def user(self):
        return UserFactory(
            username="noob"
        )

    def test_user_by_reference(self, client, user):
        result = client.execute(self.query)
        assert len(result['data']) == 2