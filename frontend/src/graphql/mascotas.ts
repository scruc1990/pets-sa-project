import { gql } from '@apollo/client';

export type MascotaClienteGraphQL = {
  cedula: string;
  nombres: string;
  apellidos: string;
};

export type MascotaMedicamentoGraphQL = {
  id: number;
  nombre: string;
  dosis: string;
};

export type MascotaGraphQL = {
  id: string;
  nombre: string;
  raza: string;
  edad: number;
  peso: number;
  medicamentoId: number;
  clienteId: string;
  createdAt: string;
  updatedAt: string;
  cliente?: MascotaClienteGraphQL | null;
  medicamento?: MascotaMedicamentoGraphQL | null;
};

export type MascotaInputGraphQL = {
  nombre: string;
  raza: string;
  edad: number;
  peso: number;
  medicamentoId: number;
  clienteId: string;
};

export type UpdateMascotaInputGraphQL = Partial<MascotaInputGraphQL>;

const MASCOTA_FIELDS = gql`
  fragment MascotaFields on Mascota {
    id
    nombre
    raza
    edad
    peso
    medicamentoId
    clienteId
    createdAt
    updatedAt
    cliente {
      cedula
      nombres
      apellidos
    }
    medicamento {
      id
      nombre
      dosis
    }
  }
`;

export const GET_MASCOTAS = gql`
  query GetMascotas {
    mascotas {
      ...MascotaFields
    }
  }
  ${MASCOTA_FIELDS}
`;

export const GET_MASCOTA = gql`
  query GetMascota($id: String!) {
    mascota(id: $id) {
      ...MascotaFields
    }
  }
  ${MASCOTA_FIELDS}
`;

export const CREATE_MASCOTA = gql`
  mutation CreateMascota($input: CreateMascotaDto!) {
    createMascota(input: $input) {
      ...MascotaFields
    }
  }
  ${MASCOTA_FIELDS}
`;

export const UPDATE_MASCOTA = gql`
  mutation UpdateMascota($id: String!, $input: UpdateMascotaDto!) {
    updateMascota(id: $id, input: $input) {
      ...MascotaFields
    }
  }
  ${MASCOTA_FIELDS}
`;

export const DELETE_MASCOTA = gql`
  mutation DeleteMascota($id: String!) {
    deleteMascota(id: $id) {
      ...MascotaFields
    }
  }
  ${MASCOTA_FIELDS}
`;