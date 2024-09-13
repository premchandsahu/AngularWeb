import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './MyComponent/about/about.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BillingComponent } from './MyComponent/billing/billing.component';
import { ProductcategoryComponent } from './MyComponent/productcategory/productcategory.component';
import { ListingComponent } from './MyComponent/listing/listing.component';
import { ProductlistingComponent } from './MyComponent/productlisting/productlisting.component';

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
    path: 'product',
    component: ProductlistingComponent
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
