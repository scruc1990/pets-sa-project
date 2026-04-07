import { useMutation, useQuery } from '@apollo/client/react';
import {
  CREATE_MASCOTA,
  DELETE_MASCOTA,
  GET_MASCOTA,
  GET_MASCOTAS,
  UPDATE_MASCOTA,
  type MascotaGraphQL,
  type MascotaInputGraphQL,
  type UpdateMascotaInputGraphQL,
} from '../../graphql/mascotas';

export function useMascotasGraphQL() {
  const mascotasQuery = useQuery<{ mascotas: MascotaGraphQL[] }>(GET_MASCOTAS);

  const [createMascota, createState] = useMutation<
    { createMascota: MascotaGraphQL },
    { input: MascotaInputGraphQL }
  >(CREATE_MASCOTA, {
    refetchQueries: [{ query: GET_MASCOTAS }],
  });

  const [updateMascota, updateState] = useMutation<
    { updateMascota: MascotaGraphQL },
    { id: string; input: UpdateMascotaInputGraphQL }
  >(UPDATE_MASCOTA, {
    refetchQueries: [{ query: GET_MASCOTAS }],
  });

  const [deleteMascota, deleteState] = useMutation<
    { deleteMascota: MascotaGraphQL },
    { id: string }
  >(DELETE_MASCOTA, {
    refetchQueries: [{ query: GET_MASCOTAS }],
  });

  return {
    mascotas: mascotasQuery.data?.mascotas ?? [],
    loading: mascotasQuery.loading,
    error: mascotasQuery.error,
    refetch: mascotasQuery.refetch,
    createMascota,
    updateMascota,
    deleteMascota,
    createState,
    updateState,
    deleteState,
  };
}

export function useMascotaById(id: string) {
  return useQuery<{ mascota: MascotaGraphQL | null }>(GET_MASCOTA, {
    variables: { id },
    skip: !id,
  });
}