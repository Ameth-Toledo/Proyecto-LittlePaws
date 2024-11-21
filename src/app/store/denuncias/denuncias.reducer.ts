/*import { createReducer, on } from "@ngrx/store";
import { cargarDenuncias, cargarDenunciasSuccess, cargarDenunciasFailure } from "./denuncias.actions";
import { DenunciasState } from '../denuncias.state';

export const initialState: DenunciasState = {
    denuncias: [],
    loading: false,
    error: null
  };
  
  export const denunciasReducer = createReducer(
    initialState,
    on(cargarDenuncias, (state) => ({
      ...state,
      loading: true
    })),
    on(cargarDenunciasSuccess, (state, { denuncias }) => ({
      ...state,
      loading: false,
      denuncias
    })),
    on(cargarDenunciasFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    }))
  );*/