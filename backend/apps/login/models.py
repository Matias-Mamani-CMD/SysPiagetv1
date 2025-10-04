from django.db import models

class Rol(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=45, unique=True)

    class Meta:
        db_table = 'roles'
        managed = False

    def save(self, *args, **kwargs):
        self.nombre_rol = self.nombre_rol.strip().lower()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre_rol


class Empleado(models.Model):
    GENERO_OPCIONES = [('M','Masculino'),('F','Femenino')]
    ESTADO_OPCIONES = (
    ('Activo', 'Activo'),
    ('Inactivo', 'Inactivo'),)

    dni_empleado = models.IntegerField(primary_key=True)
    nombre_empleado = models.CharField(max_length=35)
    apellido_empleado = models.CharField(max_length=35)
    telefono_empleado = models.CharField(max_length=15, null=True, blank=True)
    genero_empleado = models.CharField(max_length=1, choices=GENERO_OPCIONES)

    # ForeignKey a Rol existente
    id_rol = models.ForeignKey(Rol, on_delete=models.DO_NOTHING, db_column='id_rol')

    estado_empleado = models.CharField(max_length=8, default='Activo')
    correo_empleado = models.CharField(max_length=45)

    class Meta:
        db_table = 'empleados'
        managed = False
        ordering = ['apellido_empleado', 'nombre_empleado']

    def __str__(self):
        return f"{self.apellido_empleado}, {self.nombre_empleado}"
    

    