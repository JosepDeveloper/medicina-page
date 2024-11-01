import {patientSchema} from "../../lib/patient.schema"
import {prisma} from "../../lib/prisma"

export async function GET() {
  const patients = await prisma.pacientes.findMany()

  return new Response(
    JSON.stringify(patients),
  )
}

export async function POST({request}) {
  let patient
  try {
    patient = await request.json()
  } catch {
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

  let resultPrisma
  try {
    resultPrisma = await prisma.pacientes.create({
      data: {
        ...patient,
        fecha_nacimiento: new Date(patient.fecha_nacimiento),
      },
    })
  } catch (e) {
    const { meta } = e

    if (meta.modelName === 'pacientes' && meta.target[0] === 'cedula') {
      return new Response(JSON.stringify({error: 'La cedula ya existe'}), {
        status: 400,
      })
    }

    return new Response(JSON.stringify({error: 'Error al crear el paciente'}), {
      status: 500,
    })
  }

  return new Response(
    JSON.stringify(patient),
  )
}
