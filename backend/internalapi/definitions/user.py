import graphene

from user.models import User as DjangoUser 


class User(graphene.ObjectType):
    local_id = graphene.ID(required=True)
    email = graphene.String(required=True)
    user_name = graphene.String(required=True)
    is_active = graphene.Boolean(required=True)
    is_staff= graphene.Boolean(required=True)
    reference = graphene.String(required=True)

    def resolve_local_id(user, info):
      return user.id

    class Meta:
      model = DjangoUser