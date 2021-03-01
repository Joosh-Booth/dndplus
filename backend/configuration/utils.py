import pytz
from django.conf import settings
from django.utils import timezone

def tz_now(tz=None):
    if tz is None:
        tz = pytz.timezone(settings.TIME_ZONE)
    return timezone.now().astimezone(tz)
