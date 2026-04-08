import { gql } from '@apollo/client';

export type ClienteGraphQL = {
  cedula: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  createdAt: string;
  updatedAt: string;
};

export type MedicamentoGraphQL = {
  id: number;
  nombre: string;
  descripcion: string;
  dosis: string;
  createdAt: string;
  updatedAt: string;
};

export const CLIENTE_FIELDS = gql`
  fragment ClienteFields on Cliente {
    cedula
    nombres
    apellidos
    direccion
    telefono
    createdAt
    updatedAt
  }
`;

export const MEDICAMENTO_FIELDS = gql`
  fragment MedicamentoFields on Medicamento {
    id
    nombre
    descripcion
    dosis
    createdAt
    updatedAt
  }
`;

export const GET_CLIENTES = gql`
  query GetClientes {
    clientes {
      ...ClienteFields
    }
  }
  ${CLIENTE_FIELDS}
`;

export const GET_CLIENTE = gql`
  query GetCliente($cedula: String!) {
    cliente(cedula: $cedula) {
      ...ClienteFields
    }
  }
  ${CLIENTE_FIELDS}
`;

export const CREATE_CLIENTE = gql`
  mutation CreateCliente($input: CreateClienteDto!) {
    createCliente(input: $input) {
      ...ClienteFields
    }
  }
  ${CLIENTE_FIELDS}
`;

export const UPDATE_CLIENTE = gql`
  mutation UpdateCliente($cedula: String!, $input: UpdateClienteDto!) {
    updateCliente(cedula: $cedula, input: $input) {
      ...ClienteFields
    }
  }
  ${CLIENTE_FIELDS}
`;

export const DELETE_CLIENTE = gql`
  mutation DeleteCliente($cedula: String!) {
    deleteCliente(cedula: $cedula) {
      ...ClienteFields
    }
  }
  ${CLIENTE_FIELDS}
`;

export const GET_MEDICAMENTOS = gql`
  query GetMedicamentos {
    medicamentos {
      ...MedicamentoFields
    }
  }
  ${MEDICAMENTO_FIELDS}
`;

export const GET_MEDICAMENTO = gql`
  query GetMedicamento($id: Int!) {
    medicamento(id: $id) {
      ...MedicamentoFields
    }
  }
  ${MEDICAMENTO_FIELDS}
`;

export const CREATE_MEDICAMENTO = gql`
  mutation CreateMedicamento($input: CreateMedicamentoDto!) {
    createMedicamento(input: $input) {
      ...MedicamentoFields
    }
  }
  ${MEDICAMENTO_FIELDS}
`;

export const UPDATE_MEDICAMENTO = gql`
  mutation UpdateMedicamento($id: Int!, $input: UpdateMedicamentoDto!) {
    updateMedicamento(id: $id, input: $input) {
      ...MedicamentoFields
    }
  }
  ${MEDICAMENTO_FIELDS}
`;

export const DELETE_MEDICAMENTO = gql`
  mutation DeleteMedicamento($id: Int!) {
    deleteMedicamento(id: $id) {
      ...MedicamentoFields
    }
  }
  ${MEDICAMENTO_FIELDS}
`;
