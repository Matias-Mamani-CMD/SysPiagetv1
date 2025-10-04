from django.db import models
from apps.tutores.models import Alumno

class Grado(models.Model):
    id_grado = models.AutoField(primary_key=True)
    nombre_grado = models.CharField(max_length=50)
    asientos_disponibles = models.IntegerField()

    class Meta:
        db_table = 'grados'
        managed = True
        ordering = ['nombre_grado']

    def __str__(self):
        return self.nombre_grado


class AlumnoXGrado(models.Model):
    id_alumno_x_grado = models.AutoField(primary_key=True)
    dni_alumno = models.ForeignKey(Alumno, on_delete=models.RESTRICT)
    id_grado = models.ForeignKey(Grado, on_delete=models.RESTRICT)
    anio = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'alumnos_x_grados'
        managed = True

    def __str__(self):
        return f"Alumno: {self.dni_alumno} - Grado: {self.id_grado} - Año: {self.anio}"
