import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { DonacionesComponent } from './modules/donaciones/donaciones.component';
import { AdopcionComponent } from './modules/adopcion/adopcion.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { TermsComponent } from './modules/terms/terms.component';
import { PerfilVeterinariaComponent } from './modules/perfil-veterinaria/perfil-veterinaria.component';
import { VeterinariasComponent } from './modules/veterinarias/veterinarias.component';
import { RegistrarVeterinariaComponent } from './modules/registrar-veterinaria/registrar-veterinaria.component';
import { DenunciasComponent } from './modules/denuncias/denuncias.component';
import { EntidadComponent } from './modules/entidad/entidad.component';
import { DenunciasFormComponent } from './modules/denuncias-form/denuncias-form.component';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "donaciones", component: DonacionesComponent },
    { path: "adopciones", component: AdopcionComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "terms-and-conditions", component: TermsComponent },
    { path: "perfil-veterinaria-zoo", component: PerfilVeterinariaComponent },
    { path: "veterinarias", component: VeterinariasComponent },
    { path: "denuncias-form", component: DenunciasFormComponent },
    //Administracion 
    { path: "registrar-veterinaria", component: RegistrarVeterinariaComponent },
    { path: "denuncias", component: DenunciasComponent },
    { path: "entidad-littlepaws", component: EntidadComponent }
];

