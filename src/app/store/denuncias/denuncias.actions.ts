import { createAction, props } from "@ngrx/store";
import { Denuncias } from "../../models/denuncias";

export const cargarDenuncias = createAction('[Denuncias] Cargar Denuncias');

export const cargarDenunciasSuccess =  createAction(
    '[Denuncias] Cargar Denuncias Success',
    props<{ denuncias: Denuncias[] }>()
  );

  export const cargarDenunciasFailure = createAction(
    '[Denuncias] Cargar Denuncias Failure',
    props<{ error: string }>()
  );