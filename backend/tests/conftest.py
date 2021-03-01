from shutil import rmtree
from tempfile import mkdtemp
import pytest




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
