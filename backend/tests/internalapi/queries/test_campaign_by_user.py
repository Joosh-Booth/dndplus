import pytest

from tests.campaign.factories import CampaignFactory
from tests.user.factories import UserFactory


@pytest.mark.django_db
class TestCampaignByUserQuery:

    query = '''
        query testCampaignByUser {
            campaignByUser {
                title
                roomCode
            }
        }
    '''


    @pytest.fixture
    def user(self):
        return UserFactory(
            username="noob"
        )

    @pytest.fixture
    def client(self, graphql_client_factory, user):
        return graphql_client_factory(user=user)

    @pytest.fixture
    def game(self, user):
        c1 = CampaignFactory(created_by=user)
        c2 = CampaignFactory(created_by=user)
        user.campaigns.add(c1)
        user.campaigns.add(c2)

        return c1,c2

    def test_campaign_by_user(self, client, user, game):
        result = client.execute(self.query)
        print(result)
        assert len(result['data']['campaignByUser']) == 2