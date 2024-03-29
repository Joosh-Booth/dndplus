import graphene
from .user import User
from campaign.models import Campaign as DjangoCampaign

class Campaign(graphene.ObjectType):
    room_code = graphene.String(required=True)
    title = graphene.String(required=True)
    created_by = graphene.Field(User, required=True)
    owner = graphene.Field(User, required=True)
    players = graphene.List(User, required=False)
    is_owner = graphene.Boolean(required=True)

    class Meta:
        model = DjangoCampaign

    def resolve_players(campaign, info):
        return campaign.user_set.all()
    
    def resolve_is_owner(campaign, info):
        return campaign.owner == info.context.user