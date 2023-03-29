import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PublicRoutingModule } from "./public-routing.module";
import { MaterialModule } from "../../assets/library/Material.module";
import * as fromContainers from "../pages/index";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [...fromContainers.containers, ...fromContainers.components ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class PublicModule {}

