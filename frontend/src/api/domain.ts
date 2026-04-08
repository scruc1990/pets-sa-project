import { apolloClient } from '../graphql/client';
import type { DocumentNode } from 'graphql';
import {
  CREATE_CLIENTE,
  CREATE_MEDICAMENTO,
  DELETE_CLIENTE,
  DELETE_MEDICAMENTO,
  GET_CLIENTE,
  GET_CLIENTES,
  GET_MEDICAMENTO,
  GET_MEDICAMENTOS,
  UPDATE_CLIENTE,
  UPDATE_MEDICAMENTO,
  type ClienteGraphQL,
  type MedicamentoGraphQL,
} from '../graphql/domain';
import {
  CREATE_MASCOTA,
  DELETE_MASCOTA,
  GET_MASCOTA,
  GET_MASCOTAS,
  UPDATE_MASCOTA,
  type MascotaGraphQL,
  type MascotaInputGraphQL,
  type UpdateMascotaInputGraphQL,
} from '../graphql/mascotas';
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
} from '../types/domain';

async function queryGraphQL<TData, TVariables extends Record<string, unknown> = Record<string, never>>(
  query: DocumentNode,
  variables?: TVariables,
): Promise<TData> {
  const response = await apolloClient.query<TData, TVariables>({
    query,
    variables: variables ?? ({} as TVariables),
    fetchPolicy: 'network-only',
  });

  return response.data as TData;
}

async function mutateGraphQL<TData, TVariables extends Record<string, unknown> = Record<string, never>>(
  mutation: DocumentNode,
  variables?: TVariables,
): Promise<TData> {
  const response = await apolloClient.mutate<TData, TVariables>({
    mutation,
    variables: variables ?? ({} as TVariables),
  });

  if (!response.data) {
    throw new Error('No fue posible completar la operación');
  }

  return response.data as TData;
}

/**
 * CLIENTES API
 */
export async function getClientes(): Promise<Cliente[]> {
  const data = await queryGraphQL<{ clientes: ClienteGraphQL[] }>(GET_CLIENTES);
  return data.clientes;
}

export async function createCliente(payload: CreateClientePayload): Promise<Cliente> {
  const data = await mutateGraphQL<{ createCliente: ClienteGraphQL }, { input: CreateClientePayload }>(
    CREATE_CLIENTE,
    { input: payload },
  );
  return data.createCliente;
}

export async function updateCliente(
  cedula: string,
  payload: UpdateClientePayload,
): Promise<Cliente> {
  const data = await mutateGraphQL<{ updateCliente: ClienteGraphQL }, { cedula: string; input: UpdateClientePayload }>(
    UPDATE_CLIENTE,
    { cedula, input: payload },
  );
  return data.updateCliente;
}

export async function deleteCliente(cedula: string): Promise<Cliente> {
  const data = await mutateGraphQL<{ deleteCliente: ClienteGraphQL }, { cedula: string }>(
    DELETE_CLIENTE,
    { cedula },
  );
  return data.deleteCliente;
}

export async function getClienteById(cedula: string): Promise<Cliente> {
  const data = await queryGraphQL<{ cliente: ClienteGraphQL }, { cedula: string }>(GET_CLIENTE, { cedula });
  return data.cliente;
}

/**
 * MEDICAMENTOS API
 */
export async function getMedicamentos(): Promise<Medicamento[]> {
  const data = await queryGraphQL<{ medicamentos: MedicamentoGraphQL[] }>(GET_MEDICAMENTOS);
  return data.medicamentos;
}

export async function getMedicamentoById(id: number): Promise<Medicamento> {
  const data = await queryGraphQL<{ medicamento: MedicamentoGraphQL }, { id: number }>(GET_MEDICAMENTO, { id });
  return data.medicamento;
}

export async function createMedicamento(
  payload: CreateMedicamentoPayload,
): Promise<Medicamento> {
  const data = await mutateGraphQL<{ createMedicamento: MedicamentoGraphQL }, { input: CreateMedicamentoPayload }>(
    CREATE_MEDICAMENTO,
    { input: payload },
  );
  return data.createMedicamento;
}

export async function updateMedicamento(
  id: number,
  payload: UpdateMedicamentoPayload,
): Promise<Medicamento> {
  const data = await mutateGraphQL<{ updateMedicamento: MedicamentoGraphQL }, { id: number; input: UpdateMedicamentoPayload }>(
    UPDATE_MEDICAMENTO,
    { id, input: payload },
  );
  return data.updateMedicamento;
}

export async function deleteMedicamento(id: number): Promise<Medicamento> {
  const data = await mutateGraphQL<{ deleteMedicamento: MedicamentoGraphQL }, { id: number }>(
    DELETE_MEDICAMENTO,
    { id },
  );
  return data.deleteMedicamento;
}

/**
 * MASCOTAS API
 */
export async function getMascotas(): Promise<Mascota[]> {
  const data = await queryGraphQL<{ mascotas: MascotaGraphQL[] }>(GET_MASCOTAS);
  return data.mascotas;
}

export async function getMascotaById(id: string): Promise<Mascota> {
  const data = await queryGraphQL<{ mascota: MascotaGraphQL | null }, { id: string }>(GET_MASCOTA, { id });
  if (!data.mascota) {
    throw new Error('Mascota no encontrada');
  }
  return data.mascota;
}

export async function createMascota(payload: CreateMascotaPayload): Promise<Mascota> {
  const data = await mutateGraphQL<{ createMascota: MascotaGraphQL }, { input: MascotaInputGraphQL }>(
    CREATE_MASCOTA,
    { input: payload },
  );
  return data.createMascota;
}

export async function updateMascota(
  id: string,
  payload: UpdateMascotaPayload,
): Promise<Mascota> {
  const data = await mutateGraphQL<{ updateMascota: MascotaGraphQL }, { id: string; input: UpdateMascotaInputGraphQL }>(
    UPDATE_MASCOTA,
    { id, input: payload },
  );
  return data.updateMascota;
}

export async function deleteMascota(id: string): Promise<Mascota> {
  const data = await mutateGraphQL<{ deleteMascota: MascotaGraphQL }, { id: string }>(
    DELETE_MASCOTA,
    { id },
  );
  return data.deleteMascota;
}

export const domainAPI = {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  getMedicamentos,
  getMedicamentoById,
  createMedicamento,
  updateMedicamento,
  deleteMedicamento,
  getMascotas,
  getMascotaById,
  createMascota,
  updateMascota,
  deleteMascota,
};

export default domainAPI;
