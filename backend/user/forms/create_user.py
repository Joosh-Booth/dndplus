from django import forms

from user.models import User


class UserForm(forms.ModelForm):
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
