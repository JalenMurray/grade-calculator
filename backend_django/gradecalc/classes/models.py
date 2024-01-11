from django.db import models
from django.db.models import Model, CharField, DateTimeField, TextField, EmailField, IntegerField, FloatField,\
    ManyToManyField, ForeignKey, BooleanField


class User(Model):
    username = CharField(max_length=50)
    display_name = CharField(max_length=200)
    email = EmailField()
    created_at = DateTimeField()

    def __str__(self):
        return self.username


class Class(Model):
    name = CharField(max_length=8)
    semester = CharField(max_length=11)
    users = ManyToManyField(User, related_name='classes', blank=True)
    desired_score = FloatField(default=100.0)

    def __str__(self):
        return f'{self.name}-{self.semester}'


class AssignmentType(Model):
    name = CharField(max_length=100)
    max_score = IntegerField(blank=True, null=True, default=100)
    weight = FloatField(blank=True, null=True)
    class_associated = ForeignKey(Class, on_delete=models.CASCADE, related_name='assignment_types')
    default_name = CharField(max_length=100)
    lock_weights = BooleanField(default=False)

    def __str__(self):
        return self.name


    @property
    def total_score(self):
        assignments = Assignment.objects.filter(assignment_type=self)
        total_score = sum((a.score / a.max_score) * a.weight for a in assignments)
        return total_score

    @property
    def max_total_score(self):
        assignments = Assignment.objects.filter(assignment_type=self)
        max_total_score = sum(a.weight for a in assignments)
        return max_total_score

    def balance_weight(self):
        print("in Balance weights")
        if self.lock_weights:
            assignments = Assignment.objects.filter(assignment_type=self)
            num_assignments = assignments.count()
            new_weight = self.weight / num_assignments
            assignments.update(weight=new_weight)
        else:
            print("LOCK WEIGHTS: OFF")
            print(sum([a.weight for a in Assignment.objects.filter(assignment_type=self)]))
            self.weight = sum([a.weight for a in Assignment.objects.filter(assignment_type=self)])
            self.save()

    def save(self, *args, **kwargs):
        if not self.pk:
            self.score = self.max_score
        if self.lock_weights:
            self.balance_weight()
        super().save(*args, **kwargs)


class Assignment(Model):
    name = CharField(max_length=100)
    score = FloatField(null=True, blank=True)
    max_score = models.FloatField(null=True, blank=True)
    weight = FloatField(blank=True, null=True)
    assignment_type = ForeignKey(AssignmentType, on_delete=models.CASCADE, related_name='assignments')

    def __str__(self):
        return f'{self.name}\t{self.score} / {self.assignment_type.max_score}'

    def save(self, *args, **kwargs):
        if not self.pk:
            self.max_score = self.assignment_type.max_score if self.assignment_type.max_score else 100.0
            self.score = self.max_score
            self.weight = 0.0
        super().save(*args, **kwargs)
        self.assignment_type.balance_weight()