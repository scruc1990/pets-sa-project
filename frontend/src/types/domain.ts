export type Cliente = {
  cedula: string
  nombres: string
  apellidos: string
  direccion: string
  telefono: string
  createdAt: string
  updatedAt: string
}

export type Medicamento = {
  id: number
  nombre: string
  descripcion: string
  dosis: string
  createdAt: string
  updatedAt: string
}

export type Mascota = {
  id: string
  nombre: string
  raza: string
  edad: number
  peso: number
  medicamentoId: number
  clienteId: string
  createdAt: string
  updatedAt: string
}

export type CreateClientePayload = {
  cedula: string
  nombres: string
  apellidos: string
  direccion: string
  telefono: string
}

export type CreateMedicamentoPayload = {
  nombre: string
  descripcion: string
  dosis: string
}

export type CreateMascotaPayload = {
  nombre: string
  raza: string
  edad: number
  peso: number
  medicamentoId: number
  clienteId: string
}

export type UpdateClientePayload = {
  nombres: string
  apellidos: string
  direccion: string
  telefono: string
}

export type UpdateMedicamentoPayload = {
  nombre: string
  descripcion: string
  dosis: string
}

export type UpdateMascotaPayload = {
  nombre: string
  raza: string
  edad: number
  peso: number
  medicamentoId: number
  clienteId: string
}
