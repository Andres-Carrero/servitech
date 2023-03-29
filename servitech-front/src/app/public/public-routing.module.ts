import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticateAtmGuard } from "../config/authenticate-atm.guard";
import * as pages from "../pages/index";
import { AuthenticateAdminGuard } from "../config/authenticate-admin.guard";
import { AuthenticateGuard } from "../config/authenticate.guard";
import { AuthenticateVerifyGuard } from "../config/authenticate-verify.guard";
import { AuthenticateClientGuard } from "../config/authenticate-client.guard";

const routes: Routes = [
  {
    path: "",
    component: pages.LayoutComponent,
    children: [
      {
        path: "",
        component: pages.HomeComponent,
      },
      {
        path: "login",
        component: pages.LoginComponent,
      },
      {
        path: "registrarse",
        component: pages.ClientesComponent,
      },
      {
        path: "about",
        component: pages.AboutComponent,
      },
      {
        path: "ForgetPass",
        component: pages.ForgetPasswordComponent,
      },

      //Con Verificacion
      {
        path: "verificacion",
        component: pages.VerifyComponent,
        canActivate: [AuthenticateVerifyGuard]
      },
      {
        path: "dashboard",
        component: pages.DashboardComponent,
        canActivate: [AuthenticateGuard]
      },
      {
        path: "miperfil",
        component: pages.ClientesComponent,
        canActivate: [AuthenticateGuard]
      },
  

      //ADMINISTRACION
      {
        path: "productos",
        component: pages.ProductosComponent,
        canActivate: [AuthenticateAdminGuard]
      },
      {
        path: "productos/create",
        component: pages.ProductsDetailsComponent,
        canActivate: [AuthenticateAdminGuard]
      },
      {
        path: "productos/editar/:id",
        component: pages.ProductsDetailsComponent,
        canActivate: [AuthenticateAdminGuard]
      },
      {
        path: "proveedores",
        component: pages.ProveedoresIndexComponent,
        canActivate: [AuthenticateAdminGuard]
      },
      {
        path: "proveedores/create",
        component: pages.ProveedoresDetailsComponent,
        canActivate: [AuthenticateAdminGuard]
      },
      {
        path: "usuarios",
        component: pages.UsuariosIndexComponent,
        canActivate: [AuthenticateAdminGuard]
      },
      {
        path: "usuarios/create",
        component: pages.ClientesComponent,
        canActivate: [AuthenticateAdminGuard]
      },
      {
        path: "usuarios/editar/:id",
        component: pages.ClientesComponent,
        canActivate: [AuthenticateAdminGuard]
      },
      {
        path: "movimientos/compras",
        component: pages.ComprasComponent,
        canActivate: [AuthenticateAdminGuard]
      },
      {
        path: "movimientos/ventas",
        component: pages.VentasV2Component,
        canActivate: [AuthenticateAdminGuard]
      },
      {
        path: "ubicacion",
        component: pages.UbicacionIndexComponent,
        canActivate: [AuthenticateAdminGuard]
      },
      {
        path: "ubicacion/create",
        component: pages.UbicacionDetailsComponent,
        canActivate: [AuthenticateAdminGuard]
      },


      

      //CLIENTES
      {
        path:'misProductos',
        component: pages.CarritoClientComponent,
        canActivate: [AuthenticateClientGuard]
      },      
      {
        path: "verDetalles/:id",
        component: pages.VerDetallesComponent,
        canActivate: [AuthenticateClientGuard]
      },
      
      
     
    ],
    
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class PublicRoutingModule {}