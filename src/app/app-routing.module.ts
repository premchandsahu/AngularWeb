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
import { ReceiptComponent } from './MyComponent/receipt/receipt.component';
import { ReceiptlistingComponent } from './MyComponent/receiptlisting/receiptlisting.component';
import { PurchaselistingComponent } from './MyComponent/purchaselisting/purchaselisting.component';
import { PurchaseComponent } from './MyComponent/purchase/purchase.component';
import { SupplierlistingComponent } from './MyComponent/supplierlisting/supplierlisting.component';
import { SupplierComponent } from './MyComponent/supplier/supplier.component';

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
    path: 'purchaselisting',
    component: PurchaselistingComponent
  },
  {
    path: 'purchase',
    component: PurchaseComponent
  },
  {
    path: 'editpurchase/:purchaseno',
    component: PurchaseComponent
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
    path: 'receipt',
    component: ProductComponent
  },
  {
    path: 'editproduct/:productno',
    component: ProductComponent
  },
    {
    path: 'editreceipt/:receiptno',
    component: ReceiptComponent
  },
  {
    path: 'receiptlisting',
    component: ReceiptlistingComponent
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
    path: 'supplierlisting',
    component: SupplierlistingComponent
  },
  {
    path: 'supplier',
    component: SupplierComponent
  },
    {
    path: 'editsupplier/:supplierno',
    component: SupplierComponent
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
