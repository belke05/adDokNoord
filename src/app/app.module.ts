import { environment } from "../environments/environment";

// importing MODULES
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LayoutModule } from "@angular/cdk/layout";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MaterialModule } from "./material/material.module";
import { AppRoutingModule } from "./routing/app-routing.module";
// ---- END

// importing COMPONENTS

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { OrdersComponent } from "./components/pages/orders/orders.component";
import { NavigationComponent } from "./components/global/navigation/navigation.component";
import { ButtonComponent } from "./components/utils/button/button.component";
import { SandwichListComponent } from "./components/utils/sandwich-list/sandwich-list.component";
import { OrderOverviewComponent } from "./components/utils/orders/order-overview/order-overview.component";
import { OrderFormComponent } from "./components/utils/orders/order-form/order-form.component";
import {
  OrderDialogComponent,
  DialogView
} from "./components/utils/orders/order-dialog/order-dialog.component";
import { DatePickerComponent } from "./components/utils/orders/datepicker/datepicker.component";
// ---- END

// importing SERVICES
import { HttpsService } from "./services/https.service";
import { DatabaseService } from "./services/database.service";
import { CommunicateService } from "./services/communicate.service";
import { StoreComponent } from "./components/pages/store/store.component";
import { ContactComponent } from "./components/pages/contact/contact.component";
import { VacaturesComponent } from "./components/pages/vacatures/vacatures.component";
import { FootComponent } from "./components/global/foot/foot.component";
import { IngredientsComponent } from "./components/utils/ingredients/ingredients.component";
import { CarouselComponent } from "./components/utils/carousel/carousel.component";
import { VacatureComponent } from "./components/utils/vacature/vacature.component";

// ---- END

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrdersComponent,
    NavigationComponent,
    ButtonComponent,
    SandwichListComponent,
    OrderOverviewComponent,
    OrderFormComponent,
    OrderDialogComponent,
    DialogView,
    DatePickerComponent,
    StoreComponent,
    ContactComponent,
    VacaturesComponent,
    FootComponent,
    IngredientsComponent,
    CarouselComponent,
    VacatureComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    LayoutModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [DatabaseService, CommunicateService, HttpsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
