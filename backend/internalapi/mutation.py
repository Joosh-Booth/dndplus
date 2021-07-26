import graphene

from .mutations.user.create_user import CreateUser
from .mutations.user.authenticate_user import AuthenticateUser
from .mutations.user.is_authenticated import IsAuthenticated
from .mutations.campaign.create_campaign import CreateCampaign
from .mutations.campaign.create_invitation import CreateInvitation

class RootMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    authenticate_user = AuthenticateUser.Field()
    is_authenticated = IsAuthenticated.Field()
    create_campaign = CreateCampaign.Field()
    create_invitation = CreateInvitation.Field()
