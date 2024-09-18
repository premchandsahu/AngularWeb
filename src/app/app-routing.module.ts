import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './MyComponent/about/about.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BillingComponent } from './MyComponent/billing/billing.component';
import { ProductcategoryComponent } from './MyComponent/productcategory/productcategory.component';
import { ListingComponent } from './MyComponent/listing/listing.component';
import { ProductlistingComponent } from './MyComponent/productlisting/productlisting.component';
import { ProductComponent } from './MyComponent/product/product.component';
import { CustomerlistingComponent } from './MyComponent/customerlisting/customerlisting.component';
import { CustomerComponent } from './MyComponent/customer/customer.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'invoicelisting',
    component: ListingComponent
  },
  {
    path: 'billing',
    component: BillingComponent
  },
  {
    path: 'editbilling/:invoiceno',
    component: BillingComponent
  },
  {
    path: 'productcategory',
    component: ProductcategoryComponent
  }
  ,
  {
    path: 'productlisting',
    component: ProductlistingComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  
  {
    path: 'editproduct/:productno',
    component: ProductComponent
  },
  {
    path: 'customerlisting',
    component: CustomerlistingComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  
  {
    path: 'editcustomer/:custno',
    component: CustomerComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
