import { Component, inject } from '@angular/core';
import { UserdataService } from '../../services/userdata.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {
  constructor(private userdata: UserdataService, private alert: ToastrService, private router: Router, private activeroute: ActivatedRoute) { }
  private formBuilder = inject(FormBuilder);
  purchaseform = this.formBuilder.group({
    purchaseno: this.formBuilder.control({ value: '', disabled: true }),
    purchasedate: this.formBuilder.control(new Date(), Validators.required),
    supplierno: this.formBuilder.control('', Validators.required),
    remarks: this.formBuilder.control('', Validators.required),
    details: this.formBuilder.array([]),
    total: this.formBuilder.control(''),
    tax: this.formBuilder.control(''),
    netTotal: this.formBuilder.control('')

  })
  purchasedetail !: FormArray<any>;
  purchaseproduct !: FormGroup<any>;
  pagetitle = "Create Purchase"
  mastersupplier: any;
  masterproduct: any;
  isedit = false;
  editpurchaseno: any;
  editinvdetail: any;
  purchaseno: any;


  ngOnInit(): void {
    this.GetSuppliers();
    this.GetProducts();
    this.editpurchaseno = this.activeroute.snapshot.paramMap.get('purchaseno');
    if (this.editpurchaseno != null) {
      this.pagetitle = "Edit Purchase";
      this.isedit = true;
      this.SetEditInfo(this.editpurchaseno);
    }
  }



  GetSuppliers() {
    this.userdata.supplier().subscribe((res) => {

      this.mastersupplier = res;

    })
  }

  GetProducts() {
    this.userdata.product().subscribe((res) => {

      this.masterproduct = res;
    })
  }
  SavePurchase() {
    console.log(this.purchaseform.getRawValue());
    if (this.purchaseform.valid) {

      this.userdata.savepurchase(this.purchaseform.getRawValue()).subscribe((res: any) => {
        let result: any;
        result = res;
        console.log("return")
        console.log(result)
        console.log(result.result);
        if (result.result == 'pass') {
          if (this.isedit) {
            this.alert.success('Updated Successfully.', 'Purchase :' + result.kyValue);
          } else {
            this.alert.success('Created Successfully.', 'Purchase :' + result.kyValue);
          }
          this.router.navigate(['/purchaselisting']);
        } else {
          this.alert.error('Failed to save.', 'Purchase');
        }
      });
    } else {
      this.alert.warning('Please enter values in all mandatory filed', 'Validation');
    }
  }
  supplierchange() {
    let supplierno = Number(this.purchaseform.get("supplierno")?.value);
    console.log(supplierno);
    //   if (supplierno
    if (supplierno === 0 || supplierno === null) {
      this.purchaseproduct.get("productrate")?.setValue(0);
      return;
    }
    this.userdata.supplierbyID(supplierno).subscribe((res: any) => {
      let supplierdata: any;
      supplierdata = res;
     
      console.log(supplierdata);
      let suppliername: String;
      suppliername = supplierdata[0].suppliername;

      console.log(suppliername);
      if (supplierdata != null) {
        this.purchaseform.get("remarks")?.setValue(supplierdata[0].supplieraddress + ',' + supplierdata[0].supplierphone1 + ',' + supplierdata[0].supplieremail);

      }
    });
  }

  Removeproduct(index: any) {
    if (confirm('Do you want to remove?')) {
      this.invproducts.removeAt(index);
      this.summarycalculation();

    }
  }

  summarycalculation() {
    let array = this.purchaseform.getRawValue().details;
    let sumtotal = 0
    array.forEach((x: any) => {
      sumtotal = sumtotal + x.total;
    });

    // tax calculation
    let sumtax = (7 / 100) * sumtotal;
    let nettotal = sumtotal + sumtax;

    this.purchaseform.get("total")?.setValue(String(sumtotal));
    this.purchaseform.get("tax")?.setValue(String(sumtax));
    this.purchaseform.get("netTotal")?.setValue(String(nettotal));
  }
  async SetEditInfo(purchaseno: any) {
    this.userdata.purchaseItembyID(purchaseno).subscribe(res => {
      this.editinvdetail = res;
      for (let i = 0; i < this.editinvdetail[0].details.length; i++) {
        this.addnewproduct();
      };
    });

    await this.userdata.purchasebyID(purchaseno).subscribe(res => {
      let editdata: any;

      editdata = res;
      console.log("Master")
      console.log(editdata[0])
      console.log("details")
      console.log(editdata[0].details)
      if (this.editinvdetail != null) {
        this.purchaseform.setValue({
          purchaseno: editdata[0].purchaseno, purchasedate: editdata[0].purchasedate, supplierno: editdata[0].supplierno,
          remarks: editdata[0].remarks, details: this.editinvdetail[0].details,
          total: editdata[0].total, tax: editdata[0].total, netTotal: editdata[0].total
        }, {
          onlySelf: true,
          emitEvent: false
        })

      }
      console.log("Purchase form data")
      console.log(this.purchaseform.value);
    });

    // this.purchaseform

  }
  addnewproduct() {
    this.purchasedetail = this.purchaseform.get("details") as FormArray;

    let suppliercode = this.purchaseform.get("supplierno")?.value;

    if ((suppliercode != null && suppliercode != '') || this.isedit) {
      this.purchasedetail.push(this.Generaterow());
    } else {
      this.alert.warning('Please select the supplier', 'Validation');
    }
  }
  Generaterow() {
    return this.formBuilder.group({
      _id: this.formBuilder.control(''), //Validators.required),
      productno: this.formBuilder.control(''), //Validators.required),
      productqty: this.formBuilder.control(1),
      productrate: this.formBuilder.control(0),
      total: this.formBuilder.control({ value: 0, disabled: true })
    });
  }
  Itemcalculation(index: any) {
    this.purchasedetail = this.purchaseform.get("details") as FormArray;
    this.purchaseproduct = this.purchasedetail.at(index) as FormGroup;
    let qty = this.purchaseproduct.get("productqty")?.value;
    let price = this.purchaseproduct.get("productrate")?.value;
    let total = qty * price;
    this.purchaseproduct.get("total")?.setValue(total);

    this.summarycalculation();
  }
  productchange(index: any) {
    this.purchasedetail = this.purchaseform.get("details") as FormArray;
    this.purchaseproduct = this.purchasedetail.at(index) as FormGroup;
    let productcode = this.purchaseproduct.get("productno")?.value;
    if (productcode === "" || productcode === null) {
      this.purchaseproduct.get("productrate")?.setValue(0);
      return;
    }
    this.userdata.productbyID(productcode).subscribe((res: any) => {
      let proddata: any;
      proddata = res;

      if (proddata != null) {
        // this.purchaseproduct.get("productName")?.setValue(proddata.name);
        this.purchaseproduct.get("productrate")?.setValue(proddata[0].purchaserate);
        this.Itemcalculation(index);
      }
    });
  }



  get invproducts() {
    return this.purchaseform.get("details") as FormArray;
  }


}
