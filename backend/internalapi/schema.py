import graphene
from .query import RootQuery
from .mutation import RootMutation


schema = graphene.Schema(query=RootQuery, mutation=RootMutation)