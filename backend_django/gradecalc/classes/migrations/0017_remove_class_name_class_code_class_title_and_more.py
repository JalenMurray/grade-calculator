# Generated by Django 5.0.1 on 2024-01-12 13:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0016_alter_class_semester'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='class',
            name='name',
        ),
        migrations.AddField(
            model_name='class',
            name='code',
            field=models.CharField(default='CMSC320', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='class',
            name='title',
            field=models.CharField(default='Intro to Data Science', max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='class',
            name='semester',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='classes', to='classes.semester'),
        ),
    ]