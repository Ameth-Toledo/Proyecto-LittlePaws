import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { DonacionesComponent } from './modules/donaciones/donaciones.component';
import { AdopcionComponent} from './modules/adopcion/adopcion.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { TermsComponent } from './modules/terms/terms.component';
import { PerfilVeterinariaComponent } from './modules/perfil-veterinaria/perfil-veterinaria.component';
import { VeterinariasComponent } from './modules/veterinarias/veterinarias.component';
import { RegistrarVeterinariaComponent } from './modules/registrar-veterinaria/registrar-veterinaria.component';
import { DenunciasComponent } from './modules/denuncias/denuncias.component';
import { EntidadComponent } from './modules/entidad/entidad.component';
import { AdopcionFormComponent } from './modules/adopcion-form/adopcion-form.component';
import { TemplateVeterinariaComponent } from './modules/template-veterinaria/template-veterinaria.component';
import { authGuard } from './Guard/authGuard/auth.guard';
import { DenunciasFormComponent} from './modules/denuncias-form/denuncias-form.component';
import { MascotasExtraviadasComponent } from './modules/mascotas-extraviadas/mascotas-extraviadas.component';
import { PerfilUserComponent } from './modules/perfil-user/perfil-user.component';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "donaciones", component: DonacionesComponent, canActivate : [authGuard] },
    { path: "adopciones", component: AdopcionComponent, canActivate : [authGuard] },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "terms-and-conditions", component: TermsComponent },
    { path: "perfil-veterinaria-zoo", component: PerfilVeterinariaComponent },
    { path: "veterinarias", component: VeterinariasComponent },
    { path: "denuncias-form", component: DenunciasFormComponent, /*canActivate : [authGuard]*/ },
    //Administracion 
    { path: "form-adoption", component: AdopcionFormComponent, canActivate : [authGuard] },
    { path: "registrar-veterinaria", component: RegistrarVeterinariaComponent, canActivate : [authGuard] },
    { path: "denuncias", component: DenunciasComponent, /*canActivate : [authGuard] */},
    { path: "entidad-littlepaws", component: EntidadComponent },
    { path: "perfil-refugio/:name", component: TemplateVeterinariaComponent, canActivate : [authGuard] },
    { path: "mascotas-extraviadas", component: MascotasExtraviadasComponent, canActivate : [authGuard] },
    { path: "perfil-user", component: PerfilUserComponent }
];