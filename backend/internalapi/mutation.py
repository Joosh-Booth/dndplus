import graphene

from .mutations.campaign.create_campaign import CreateCampaign
from .mutations.campaign.create_invitation import CreateInvitation
from .mutations.campaign.leave_campaign import LeaveCampaign
from .mutations.user.authenticate_user import AuthenticateUser
from .mutations.user.create_user import CreateUser
from .mutations.user.is_authenticated import IsAuthenticated

class RootMutation(graphene.ObjectType):
    authenticate_user = AuthenticateUser.Field()
    create_campaign = CreateCampaign.Field()
    create_invitation = CreateInvitation.Field()
    create_user = CreateUser.Field()
    leave_campaign = LeaveCampaign.Field()
    is_authenticated = IsAuthenticated.Field()
