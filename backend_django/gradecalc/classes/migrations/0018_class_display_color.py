# Generated by Django 5.0.1 on 2024-01-12 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0017_remove_class_name_class_code_class_title_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='class',
            name='display_color',
            field=models.CharField(default='#23447d', max_length=10),
        ),
    ]