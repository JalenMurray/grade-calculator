from django.contrib import admin
from .models import User, Class, AssignmentType, Assignment

admin.site.register(User)
admin.site.register(Class)
admin.site.register(AssignmentType)
admin.site.register(Assignment)