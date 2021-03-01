import pytz
from django.conf import settings
from django.utils import timezone
from django.utils.crypto import get_random_string


def number_generator(length):
    return get_random_string(length, '0123456789')

def tz_now(tz=None):
    if tz is None:
        tz = pytz.timezone(settings.TIME_ZONE)
    return timezone.now().astimezone(tz)
