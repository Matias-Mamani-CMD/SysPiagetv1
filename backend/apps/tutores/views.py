from rest_framework import viewsets
from .models import Parentesco, Tutor, Alumno, AlumnoXTutor
from .serializers import (
    ParentescoSerializer,
    TutorSerializer,
    AlumnoSerializer,
    AlumnoXTutorSerializer,
)

class ParentescoViewSet(viewsets.ModelViewSet):
    queryset = Parentesco.objects.all()
    serializer_class = ParentescoSerializer


class TutorViewSet(viewsets.ModelViewSet):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer


class AlumnoViewSet(viewsets.ModelViewSet):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer


class AlumnoXTutorViewSet(viewsets.ModelViewSet):
    queryset = AlumnoXTutor.objects.all()
    serializer_class = AlumnoXTutorSerializer
