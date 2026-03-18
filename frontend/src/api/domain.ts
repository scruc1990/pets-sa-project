import axios from 'axios'
import type { AxiosInstance, AxiosError } from 'axios'
import type {
  Cliente,
  CreateClientePayload,
  CreateMascotaPayload,
  CreateMedicamentoPayload,
  Mascota,
  Medicamento,
  UpdateClientePayload,
  UpdateMascotaPayload,
  UpdateMedicamentoPayload,
} from '../types/domain'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para manejo de errores global
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message =
      (error.response?.data as { message?: string })?.message ??
      'Error en la solicitud'
    return Promise.reject(new Error(message))
  },
)

/**
 * CLIENTES API
 */
export function getClientes() {
  return apiClient.get<Cliente[]>('/clientes').then((res) => res.data)
}

export function createCliente(payload: CreateClientePayload) {
  return apiClient.post<Cliente>('/clientes', payload).then((res) => res.data)
}

export function updateCliente(cedula: string, payload: UpdateClientePayload) {
  return apiClient
    .patch<Cliente>(`/clientes/${cedula}`, payload)
    .then((res) => res.data)
}

export function deleteCliente(cedula: string) {
  return apiClient.delete(`/clientes/${cedula}`).then((res) => res.data)
}

/**
 * MEDICAMENTOS API
 */
export function getMedicamentos() {
  return apiClient
    .get<Medicamento[]>('/medicamentos')
    .then((res) => res.data)
}

export function getMedicamentoById(id: number) {
  return apiClient.get<Medicamento>(`/medicamentos/${id}`).then((res) => res.data)
}

export function createMedicamento(payload: CreateMedicamentoPayload) {
  return apiClient
    .post<Medicamento>('/medicamentos', payload)
    .then((res) => res.data)
}

export function updateMedicamento(
  id: number,
  payload: UpdateMedicamentoPayload,
) {
  return apiClient
    .patch<Medicamento>(`/medicamentos/${id}`, payload)
    .then((res) => res.data)
}

export function deleteMedicamento(id: number) {
  return apiClient.delete(`/medicamentos/${id}`).then((res) => res.data)
}

/**
 * MASCOTAS API
 */
export function getMascotas() {
  return apiClient.get<Mascota[]>('/mascotas').then((res) => res.data)
}

export function getMascotaById(id: string) {
  return apiClient.get<Mascota>(`/mascotas/${id}`).then((res) => res.data)
}

export function createMascota(payload: CreateMascotaPayload) {
  return apiClient
    .post<Mascota>('/mascotas', payload)
    .then((res) => res.data)
}

export function updateMascota(id: string, payload: UpdateMascotaPayload) {
  return apiClient
    .patch<Mascota>(`/mascotas/${id}`, payload)
    .then((res) => res.data)
}

export function deleteMascota(id: string) {
  return apiClient.delete(`/mascotas/${id}`).then((res) => res.data)
}

// Export all functions as a single API object
export const domainAPI = {
  // Clientes
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
  // Medicamentos
  getMedicamentos,
  getMedicamentoById,
  createMedicamento,
  updateMedicamento,
  deleteMedicamento,
  // Mascotas
  getMascotas,
  getMascotaById,
  createMascota,
  updateMascota,
  deleteMascota,
}

export default apiClient
