# Generated by Django 5.0.1 on 2024-01-09 01:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0007_assignmenttype_default_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignmenttype',
            name='lock_weights',
            field=models.BooleanField(default=False),
        ),
    ]
