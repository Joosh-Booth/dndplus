from django.conf import settings
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from .schema import schema
from graphene_django.views import GraphQLView


TESTING_ENVIRONMENTS = [
    "staging",
    "qa"
]


urlpatterns = [
    path("graphql/", csrf_exempt(GraphQLView.as_view(schema=schema))),
]


if settings.DEBUG or settings.ENVIRONMENT in TESTING_ENVIRONMENTS:
    urlpatterns += [
        path('graphiql/', csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema)))
    ]
