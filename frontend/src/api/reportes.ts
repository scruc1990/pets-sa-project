import axios from 'axios'
import type { AxiosInstance, AxiosError } from 'axios'
import type { AuditoriaResponse } from '../types/reportes'

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
 * REPORTES API
 */
export async function getAuditoriaMedicamentosClientes() {
  try {
    const response = await apiClient.get<AuditoriaResponse>(
      `/reportes/auditoria/medicamentos-clientes`,
    )
    return response.data
  } catch (error) {
    throw new Error('No fue posible cargar el reporte de auditoría')
  }
}

// Export all functions as a single API object
export const reportesAPI = {
  getAuditoriaMedicamentosClientes,
}

export default apiClient
