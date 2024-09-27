import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './MyComponent/todos/todos.component';
import {provideHttpClient} from '@angular/common/http';
import { AboutComponent } from './MyComponent/about/about.component';
import { HomeComponent } from './home/home.component';
import { BillingComponent } from './MyComponent/billing/billing.component';
import { ProductcategoryComponent } from './MyComponent/productcategory/productcategory.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './MyComponent/login/login.component';
import { HeaderComponent } from './MyComponent/header/header.component'
import {ToastrModule} from 'ngx-toastr';
import { ListingComponent } from './MyComponent/listing/listing.component';
import { ProductComponent } from './MyComponent/product/product.component';
import { ProductlistingComponent } from './MyComponent/productlisting/productlisting.component';
import { CustomerlistingComponent } from './MyComponent/customerlisting/customerlisting.component';
import { CustomerComponent } from './MyComponent/customer/customer.component'
import { NgSelectModule } from '@ng-select/ng-select';
import { ReceiptComponent } from './MyComponent/receipt/receipt.component';
import { ReceiptlistingComponent } from './MyComponent/receiptlisting/receiptlisting.component';
import { PurchaselistingComponent } from './MyComponent/purchaselisting/purchaselisting.component';
import { PurchaseComponent } from './MyComponent/purchase/purchase.component';
import { SupplierlistingComponent } from './MyComponent/supplierlisting/supplierlisting.component';
import { SupplierComponent } from './MyComponent/supplier/supplier.component';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    AboutComponent,
    HomeComponent,
    BillingComponent,
    ProductcategoryComponent,
    LoginComponent,
    HeaderComponent,
    ListingComponent,
    ProductComponent,
    ProductlistingComponent,
    CustomerlistingComponent,
    CustomerComponent,
    ReceiptComponent,
    ReceiptlistingComponent,
    PurchaselistingComponent,
    PurchaseComponent,
    SupplierlistingComponent,
    SupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgSelectModule,
    
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
