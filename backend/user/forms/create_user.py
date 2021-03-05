from django import forms

from user.models import User, username_allowed


class UserForm(forms.ModelForm):
    def clean(self, *args, **kwargs):
        cleaned_data=super().clean()
        username = cleaned_data.get("username")
        if not username_allowed(username):
            self.add_error("username","Invalid username")

    class Meta:
        model = User
        fields = (
            'username',
            'email',
        )


class NewUserForm(UserForm):

    password = forms.CharField(
        strip=False,
        widget=forms.PasswordInput,
        min_length=8
    )

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        user.save()
        return user
