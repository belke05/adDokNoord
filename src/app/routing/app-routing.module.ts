import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../components/pages/home/home.component";
import { OrdersComponent } from "../components/pages/orders/orders.component";
import { StoreComponent } from "../components/pages/store/store.component";
import { ContactComponent } from "../components/pages/contact/contact.component";
import { VacaturesComponent } from "../components/pages/vacatures/vacatures.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "orders",
    component: OrdersComponent
  },
  {
    path: "store",
    component: StoreComponent
  },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "vacatures",
    component: VacaturesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
