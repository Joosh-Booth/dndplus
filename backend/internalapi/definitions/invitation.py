import graphene
from .user import User
from .campaign import Campaign
from campaign.models import Invitation as DjangoInvitation

class Invitation(graphene.ObjectType):
    sent_by = graphene.Field(User, required=True)
    sent_to = graphene.Field(User, required=True)
    game = graphene.Field(Campaign, required=True)

    class Meta:
        model = DjangoInvitation
