import graphene

from user.models import User as DjangoUser
from .definitions.user import User

class RootQuery(graphene.ObjectType):

    user_by_reference = graphene.Field(User, required=False, reference=graphene.String(required=True))


    def resolve_user_by_reference(root, info, reference):

      return DjangoUser.objects.filter(reference=reference).first()