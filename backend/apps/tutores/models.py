from django.db import models
from datetime import date

class Parentesco(models.Model):
    id_parentesco = models.AutoField(primary_key=True)
    parentesco_nombre = models.CharField(max_length=45)

    class Meta:
        db_table = 'parentescos'
        managed = True

    def __str__(self):
        return self.parentesco_nombre


class Tutor(models.Model):
    GENERO_OPCIONES = [
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro'),
    ]

    dni_tutor = models.IntegerField(primary_key=True)
    nombre_tutor = models.CharField(max_length=35)
    apellido_tutor = models.CharField(max_length=35)
    telefono_tutor = models.CharField(max_length=15, null=True)
    correo_tutor = models.EmailField(max_length=100, unique=True)
    genero_tutor = models.CharField(max_length=1, choices=GENERO_OPCIONES, null=True, blank=True)

    class Meta:
        db_table = 'tutores'
        managed = True
        ordering = ['apellido_tutor', 'nombre_tutor']

    def __str__(self):
        return f"{self.apellido_tutor}, {self.nombre_tutor} (DNI: {self.dni_tutor})"


class Alumno(models.Model):
    GENERO_OPCIONES = [
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro'),
    ]

    dni_alumno = models.IntegerField(primary_key=True)
    nombre_alumno = models.CharField(max_length=35)
    apellido_alumno = models.CharField(max_length=35)
    fecha_nacimiento_alumno = models.DateField(null=True, blank=True)
    genero_alumno = models.CharField(max_length=1, choices=GENERO_OPCIONES, null=True, blank=True)

    class Meta:
        db_table = 'alumnos'
        managed = True
        ordering = ['apellido_alumno', 'nombre_alumno']

    def __str__(self):
        return f"{self.apellido_alumno}, {self.nombre_alumno} (DNI: {self.dni_alumno})"

    def get_edad(self):
        if self.fecha_nacimiento_alumno:
            today = date.today()
            return today.year - self.fecha_nacimiento_alumno.year - (
                (today.month, today.day) < (self.fecha_nacimiento_alumno.month, self.fecha_nacimiento_alumno.day)
            )
        return None


class AlumnoXTutor(models.Model):
    id_alumno_x_tutor = models.AutoField(primary_key=True)
    dni_tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)
    dni_alumno = models.ForeignKey(Alumno, on_delete=models.RESTRICT)
    id_parentesco = models.ForeignKey(Parentesco, on_delete=models.CASCADE)

    class Meta:
        db_table = 'alumno_x_tutor'
        managed = True

    def __str__(self):
        return f"Alumno: {self.dni_alumno} - Tutor: {self.dni_tutor} - Parentesco: {self.id_parentesco}"
