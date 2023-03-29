import { ConfirmsModalComponent } from "../components/modals/confirmsModal/confirmsModal.component";
import { LayoutComponent } from "../components/layout/layout.component";
import { SnackbarComponent } from "../components/snackbar/snackbar.component";
import { AboutComponent } from "./about/about.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ForgetPasswordComponent } from "./forgetPassword/forgetPassword.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProductosComponent } from "./productos/productosIndex/productos.component";
import { ProductsDetailsComponent } from "./productos/productsDetails/productsDetails.component";
import { VerDetallesComponent } from "./productos/verDetalles/verDetalles.component";
import { ProveedoresDetailsComponent } from "./proveedores/proveedoresDetails/proveedoresDetails.component";
import { ProveedoresIndexComponent } from "./proveedores/proveedoresIndex/proveedoresIndex.component";
import { UbicacionDetailsComponent } from "./ubicacion/ubicacionDetails/ubicacionDetails.component";
import { UbicacionIndexComponent } from "./ubicacion/ubicacionIndex/ubicacionIndex.component";
import { ClientesComponent } from "./usuarios/clientes/clientes.component";
import { UsuariosIndexComponent } from "./usuarios/usuariosIndex/usuariosIndex.component";
import { VerifyComponent } from "./usuarios/verify/verify.component";
import { FileUploadModalComponent } from "../components/modals/FileUploadModal/FileUploadModal.component";
import { ComprasComponent } from "./movimientos/compras/compras.component";
import { ConfiguracionComponent } from "./configuracion/configuracion.component";
import { VentasV2Component } from "./movimientos/ventasV2/ventasV2.component";
import { MyTabsComponent } from "src/app/components/my-tabs/my-tabs.component";
import { MyTableComponent } from "src/app/components/my-table/my-table.component";
import { CarritoClientComponent } from "./movimientos/carritoClient/carritoClient.component";


export const containers: any[] = [
    LayoutComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    SnackbarComponent,
    VerDetallesComponent,
    ProductosComponent,
    ProveedoresIndexComponent,
    ProveedoresDetailsComponent,
    ClientesComponent,
    UsuariosIndexComponent,
    UbicacionIndexComponent,
    UbicacionDetailsComponent,
    VerifyComponent,
    ForgetPasswordComponent,
    AboutComponent,
    ProductsDetailsComponent,
    ComprasComponent,
    ConfiguracionComponent,
    VentasV2Component,
    CarritoClientComponent
];


export const components: any[] = [
    ConfirmsModalComponent,
    FileUploadModalComponent,
    MyTabsComponent,
    MyTableComponent
];


export * from "../components/layout/layout.component";
export * from "./home/home.component";
export * from "./login/login.component";
export * from "./dashboard/dashboard.component";
export * from "../components/snackbar/snackbar.component";
export * from "./productos/productosIndex/productos.component";
export * from "./proveedores/proveedoresIndex/proveedoresIndex.component";
export * from "./proveedores/proveedoresDetails/proveedoresDetails.component";
export * from "./usuarios/clientes/clientes.component";
export * from "./usuarios/usuariosIndex/usuariosIndex.component";
export * from "./ubicacion/ubicacionIndex/ubicacionIndex.component";
export * from "./ubicacion/ubicacionDetails/ubicacionDetails.component";
export * from "./usuarios/verify/verify.component";
export * from "./forgetPassword/forgetPassword.component";
export * from "./productos/verDetalles/verDetalles.component";
export * from "./about/about.component";
export * from "./productos/productsDetails/productsDetails.component";
export * from "../components/modals/confirmsModal/confirmsModal.component";
export * from "../components/modals/FileUploadModal/FileUploadModal.component";
export * from "./movimientos/compras/compras.component";
export * from "./configuracion/configuracion.component";
export * from "./movimientos/ventasV2/ventasV2.component";
export * from "./movimientos/carritoClient/carritoClient.component";









