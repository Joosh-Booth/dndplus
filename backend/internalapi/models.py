from dataclasses import dataclass
from datetime import timedelta
import uuid
from typing import Optional

from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models

from configuration.utils import tz_now


def default_expires():
    return tz_now() + timedelta(days=settings.INTERNALAPI_SESSION_EXPIRY_DAYS)


class PersistedAPISession(models.Model):
    """
    Represents the persisted part of an API session. By default every user
    can get a session ID with nothing persisted, but as soon as they're
    authenticated a record is created in our system.

    You shouldn't expect to interact with this directly. The Session class
    in internalapi.session is our primary interface.
    """

    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True, db_index=True)
    user = models.ForeignKey(
        "user.User",
        related_name='api_sessions',
        blank=True,
        null=True,
        on_delete=models.CASCADE
    )
    data = JSONField(null=True)
    expires_at = models.DateTimeField(default=default_expires, db_index=True)

    class Meta:
        verbose_name = 'Persisted API Session'
