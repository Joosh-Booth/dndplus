import graphene
from .user import User
from campaign.models import Campaign as DjangoCampaign

class Campaign(graphene.ObjectType):
    room_code = graphene.String(required=True)
    title = graphene.String(required=True)
    created_by = graphene.Field(User, required=True)
    players = graphene.List(User, required=False)
    owner = graphene.Boolean(required=True)

    class Meta:
        model = DjangoCampaign

    def resolve_players(campaign, info):
        return campaign.user_set.all()
    
    def resolve_owner(campaign, info):
        print(campaign.created_by == info.context.user)
        print(campaign.created_by)
        print(info.context.user)
        return campaign.created_by == info.context.user