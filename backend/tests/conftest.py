from shutil import rmtree
from tempfile import mkdtemp
import pytest
from graphene.test import Client as GrapheneClient

from django.contrib.auth.models import AnonymousUser
from django.test import Client, RequestFactory

from internalapi.context import SchemaContext
from internalapi.schema import schema

@pytest.fixture
def graphql_client_factory():
    def _client_factory(user=None, http_cf_ipcountry='GB'):
        factory = RequestFactory()
        request = factory.post(
            "/internal/graphql",
            HTTP_CF_IPCOUNTRY=http_cf_ipcountry
        )

        if not user:
            request.user = AnonymousUser()
        else:
            request.user = user

        return GrapheneClient(schema, context_value=SchemaContext.from_request(request))

    return _client_factory


@pytest.fixture(autouse=True)
def local_storage(settings):
    """
    This configuration is auto-used so during local tests and CI/CD we store and serve static
    and media files from the local filesystem, rather than uploading them to a bucket in AWS S3
    """
    settings.STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'
    settings.DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
    temp_dir = mkdtemp()
    settings.MEDIA_ROOT = temp_dir
    yield
    rmtree(temp_dir)
