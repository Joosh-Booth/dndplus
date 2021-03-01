from configuration.utils import tz_now

from .session import Session


class SchemaContext:
    """
    This class will be a wrapper for the meta information that will be carried with every
    GraphQL request. It can be accessed from a field resolver from the info arg as such:

    def resolve_field(root, info):
        return info.context

    """
    def __init__(self, user, session=None, ip_address=None):
        self.session = session if session else Session(user=user)
        self.META = {}
        self.current_time = tz_now()
        self.ip_address = ip_address

    @property
    def user(self):
        return self.session.user

    def identify(self, user):
        self.session.user = user

        # Once we identify the user, finalise the session so that we create a PersistedAPISession
        # instance for the user.
        self.session.finalise()

    def build_absolute_uri(self, location=None):
        raise NotImplementedError()

    @staticmethod
    def from_request(request):
        session = getattr(request, 'api_session', Session.from_request(request))
        context = SchemaContext(
            session.user,
            session=session,
            ip_address=(
                request.META.get("HTTP_X_FORWARDED_FOR") or request.META.get("REMOTE_ADDR", None)
            )
        )

        context.build_absolute_uri = request.build_absolute_uri
        context.META = request.META
        # Pass in COOKIES manually, otherwise we get an error:
        # AttributeError: 'SchemaContext' object has no attribute 'COOKIES'
        context.COOKIES = request.COOKIES
        context.original_request = request
        return context
