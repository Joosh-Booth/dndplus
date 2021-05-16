import factory
from django.contrib.auth.hashers import make_password

from user.models import User

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Sequence(lambda n: f"test-{n}@dndplus.com")
    email_verified = True
    username = "pussyslayer6942"
    is_active = True
    is_staff = False

    @classmethod
    def _create(cls, create, **kwargs):
        if 'password' in kwargs:
            password = kwargs.pop('password')
        else:
            password = "password"
        user = super(UserFactory, cls)._create(create, **kwargs)
        user.set_password(password)
        if create:
            user.save()
        return user
