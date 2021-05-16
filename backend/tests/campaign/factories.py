import factory

from campaign.models import Campaign
from user.factories import UserFactory

class CampaignFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Campaign

    title = "Great Campaign Title"

