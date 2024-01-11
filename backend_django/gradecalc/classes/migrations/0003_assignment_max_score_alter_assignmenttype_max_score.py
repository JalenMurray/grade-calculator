# Generated by Django 5.0.1 on 2024-01-07 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0002_assignmenttype_weight_alter_assignment_weight'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='max_score',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='assignmenttype',
            name='max_score',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
