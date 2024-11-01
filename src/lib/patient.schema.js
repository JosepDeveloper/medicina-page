import { z } from 'zod';

const patientSchema = z.object({
  id: z.number().optional(),
  nombre: z.string(),
  apellido: z.string(),
  cedula: z.string(),
  edad: z.number().int().positive(),
  fecha_nacimiento: z.string().date(),
  direccion: z.string().optional(),
  alergia_medicamento: z.string(),
  diagnostico: z.string(),
  tratamiento: z.string(),
});

export { patientSchema }
