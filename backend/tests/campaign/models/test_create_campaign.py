import pytest

from campaign.models import Campaign
from user.models import User
from tests.user.factories import UserFactory
from tests.campaign.factories import CampaignFactory


@pytest.mark.django_db
class TestCampaignModel:

    @pytest.fixture
    def user(self):
        return UserFactory(username="user1")
    
    @pytest.fixture
    def campaign(self, user):
        CampaignFactory(title="test campaign", created_by=user)
        return 

    def test_campaign_factories(self, user, campaign):
        assert Campaign.objects.count() == 1
        campaign = Campaign.objects.first()
        assert campaign.title == "test campaign"
        assert campaign.created_by == user
        return