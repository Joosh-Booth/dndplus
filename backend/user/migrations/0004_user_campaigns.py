# Generated by Django 3.1.7 on 2021-07-22 10:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0003_auto_20210722_1043'),
        ('user', '0003_remove_user_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='campaigns',
            field=models.ManyToManyField(to='campaign.Campaign'),
        ),
    ]