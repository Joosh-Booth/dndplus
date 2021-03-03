import factory

from user.models import User


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Sequence(lambda n: f"test-{n}@dndplus.com")
    email_verified = True
    user_name = "pussyslayer69420"
    is_active = True
    is_staff = False

