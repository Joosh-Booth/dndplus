import graphene
from .user import User
from campaign.models import Campaign as DjangoCampaign

class Campaign(graphene.ObjectType):
    room_code = graphene.String(required=True)
    title = graphene.String(required=True)
    created_by = graphene.Field(User, required=True)

    class Meta:
        model = DjangoCampaign