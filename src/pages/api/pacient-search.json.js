import {prisma} from "../../lib/prisma.js";
import {patientSchema} from "../../lib/patient.schema.js";

export async function GET({ request }){
  const url = new URL(request.url)
  const cedula = url.searchParams.get('cedula')

  let result
  try {
    result = await prisma.pacientes.findMany({
      where: {
        cedula
      },
    })
  } catch {
    return new Response(JSON.stringify({error: 'Sercer Error'}), {
      status: 500,
    })
  }
  const cedulaUser = result[0]
  if (!cedulaUser) {
    return new Response(JSON.stringify({error: 'Cedula no encontrada'}), {
      status: 400,
    })
  }

  return new Response(
    JSON.stringify({
      message: 'Cedula encontrada',
      data: cedulaUser,
    }),
  )
}

export async function PUT({request}){
  let patient
  try {
    patient = await request.json()
  } catch {
    console.log('error')
    return new Response(JSON.stringify({error: 'Invalid JSON'}), {
      status: 400,
    })
  }
  const result = patientSchema.safeParse(patient)
  if (!result.success) {
    return new Response(JSON.stringify({error: result.error.message}), {
      status: 400,
    })
  }

  const { data } = result

  let resultPrisma
  try {
    resultPrisma = await prisma.pacientes.update({
      where: {
        id: data.id,
      },
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        cedula: data.cedula,
        edad: data.edad,
        direccion: data.direccion,
        alergia_medicamento: data.alergia_medicamento,
        diagnostico: data.diagnostico,
        tratamiento: data.tratamiento,
        fecha_nacimiento: new Date(patient.fecha_nacimiento),
      },
    })
  } catch (e) {
    return new Response(JSON.stringify({error: 'Error al crear el paciente'}), {
      status: 500,
    })
  }

  return new Response(
    JSON.stringify({message: 'Hola Mundo'}),
  )
}
