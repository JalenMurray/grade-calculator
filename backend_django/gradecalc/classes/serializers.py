from rest_framework.serializers import ModelSerializer, SerializerMethodField, FloatField
from .models import User, Class, AssignmentType, Assignment


class UserSerializer(ModelSerializer):
    classes = SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'

    def get_classes(self, user):
        user_classes = user.classes.all()
        serializer = ClassSerializer(user_classes, many=True)
        return serializer.data


class AssignmentSerializer(ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'


class AssignmentTypeSerializer(ModelSerializer):
    assignments = AssignmentSerializer(many=True, read_only=True)
    total_score = FloatField(read_only=True)
    max_total_score = FloatField(read_only=True)

    class Meta:
        model = AssignmentType
        fields = '__all__'


class ClassSerializer(ModelSerializer):
    assignment_types = AssignmentTypeSerializer(many=True, read_only=True)
    score = SerializerMethodField()

    class Meta:
        model = Class
        fields = '__all__'

    def get_score(self, obj):
        a_types = AssignmentType.objects.filter(class_associated=obj)
        score = 0.0

        for at in a_types:
            assignments = Assignment.objects.filter(assignment_type=at)
            for a in assignments:
                if at.max_score > 0:
                    weighted_score = (a.score / at.max_score) * a.weight
                    score += weighted_score
        return score
