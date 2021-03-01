from datetime import timedelta
import uuid
from typing import Union

from dataclasses import dataclass
import jwt

from django.conf import settings
from django.contrib.auth.models import AnonymousUser

from configuration.utils import tz_now
from user.models import User

from .models import PersistedAPISession

JWT_SECRET = settings.SECRET_KEY
JWT_ALGORITHM = 'HS256'


@dataclass
class Session:
    """
    Represents a session container.
    When persisted fields (user and those
    inherited from SessionData are updated), they get written through to
    the persisted PersistedAPISession model. This ultimately allows us to create
    a split between what we expose in a token, and what only the platform can
    see.
    """

    needs_persist: bool = False
    needs_unpersist: bool = False
    __user: Union[User, AnonymousUser] = AnonymousUser()
    __data = {}

    def __init__(self, *, id=None, user=None, data=None):
        if id:
            self.id = id
            try:
                persisted_session = PersistedAPISession.objects.select_related(
                    'user'
                ).get(uuid=id)
                if persisted_session.user:
                    self.user = persisted_session.user
                if persisted_session.data:
                    self.data = persisted_session.data

            except PersistedAPISession.DoesNotExist:
                # It's not an issue that the PersistedAPISession doesn't exist
                pass
        else:
            """If we're creating an initial session, set the ID for this Session"""
            self.id = uuid.uuid4()
            if user:
                self.user = user
            if data:
                self.data = data

    @property
    def data(self):
        return self.__data

    @property
    def user(self):
        return self.__user

    @user.setter
    def user(self, value: Union[User, AnonymousUser]):
        # If the value has changed
        # if value is not self.__user:
        #     if value.is_authenticated:
        #         self.needs_persist = True
        #         self.needs_unpersist = False
        #     elif not value.is_authenticated:
        #         self.needs_persist = False
        #         self.needs_unpersist = True
        self.__user = value

    @data.setter
    def data(self, value):
        # If the data has changed
        if value is not self.__data:
            self.needs_persist = True
            self.needs_unpersist = False
        self.__data = value

    def finalise(self):
        if self.needs_persist:
            obj, created = PersistedAPISession.objects.get_or_create(
                uuid=self.id,
                defaults={
                    'user': self.user if self.user.is_authenticated else None,
                    'data': self.data
                },
            )

            if not created:
                obj.user = self.user if self.user.is_authenticated else None
                obj.data = self.data
                obj.save()

        elif self.needs_unpersist:
            PersistedAPISession.objects.filter(uuid=self.id).delete()

    def get_jwt(self, now=None):
        data = {'id': self.id.hex, 'exp': self.get_expiry(now)}
        return jwt.encode(data, JWT_SECRET, algorithm=JWT_ALGORITHM).decode('utf-8')

    def get_expiry(self, now=None):
        if not now:
            now = tz_now()

        return now + timedelta(days=settings.INTERNALAPI_SESSION_EXPIRY_DAYS)

    @staticmethod
    def from_token(token):
        try:
            decoded = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGORITHM)
            session_id = uuid.UUID(hex=decoded['id'])
            session = Session(id=session_id)
            return session
        except jwt.exceptions.ExpiredSignatureError:
            raise ValueError('Invalid session token')
        except jwt.exceptions.InvalidTokenError:
            raise ValueError('Invalid session token')

    @staticmethod
    def from_request(request):
        """
        From a GraphQL/API request, let's read the request headers to get the HTTP_AUTHORIZATION
        value. We'll then try getting the correct Session, using the latter part of the token
        """
        auth_header = request.META.get('HTTP_AUTHORIZATION')

        if auth_header:
            auth_parts = auth_header.split(' ', 1)

            if len(auth_parts) == 2:
                auth_type, auth_body = auth_parts
                if auth_type.lower() == 'bearer':
                    try:
                        return Session.from_token(auth_body)
                    except ValueError:
                        pass

        # Create an empty unsaved session
        return Session(user=getattr(request, 'user', None))
