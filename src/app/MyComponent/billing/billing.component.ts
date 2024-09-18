import { Component, inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { UserdataService } from '../../services/userdata.service'
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../../shared/models/Customer'

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
@Injectable({ providedIn: "root" })
export class BillingComponent implements OnInit {
  constructor(private userdata: UserdataService, private alert: ToastrService, private router: Router, private activeroute: ActivatedRoute) { }
  private formBuilder = inject(FormBuilder);
  invoiceform = this.formBuilder.group({
    invoiceno: this.formBuilder.control({ value: '', disabled: true }),
    invoicedate: this.formBuilder.control(new Date(), Validators.required),
    custno: this.formBuilder.control('', Validators.required),
    remarks: this.formBuilder.control('', Validators.required),
    details: this.formBuilder.array([]),
    total: this.formBuilder.control(''),
    tax: this.formBuilder.control(''),
    netTotal: this.formBuilder.control('')

  })
  invoicedetail !: FormArray<any>;
  invoiceproduct !: FormGroup<any>;
  pagetitle = "Create Invoice"
  mastercustomer: any;
  masterproduct: any;
  isedit = false;
  editinvoiceno: any;
  editinvdetail: any;
  invoiceno: any;


  ngOnInit(): void {
    this.GetCustomers();
    this.GetProducts();
    this.editinvoiceno = this.activeroute.snapshot.paramMap.get('invoiceno');
    if (this.editinvoiceno != null) {
      this.pagetitle = "Edit Invoice";
      this.isedit = true;
      this.SetEditInfo(this.editinvoiceno);
    }
  }



  GetCustomers() {
    this.userdata.customer().subscribe((res) => {

      this.mastercustomer = res;

    })
  }

  GetProducts() {
    this.userdata.product().subscribe((res) => {

      this.masterproduct = res;
    })
  }
  SaveInvoice() {
    console.log(this.invoiceform.getRawValue());
    if (this.invoiceform.valid) {

      this.userdata.saveinvoice(this.invoiceform.getRawValue()).subscribe((res: any) => {
        let result: any;
        result = res;
        console.log("return")
        console.log(result)
        console.log(result.result);
        if (result.result == 'pass') {
          if (this.isedit) {
            this.alert.success('Updated Successfully.', 'Invoice :' + result.kyValue);
          } else {
            this.alert.success('Created Successfully.', 'Invoice :' + result.kyValue);
          }
          this.router.navigate(['/invoicelisting']);
        } else {
          this.alert.error('Failed to save.', 'Invoice');
        }
      });
    } else {
      this.alert.warning('Please enter values in all mandatory filed', 'Validation');
    }
  }
  customerchange() {
    let custno = Number(this.invoiceform.get("custno")?.value);
    console.log(custno);
    //   if (custno
    if (custno === 0 || custno === null) {
      this.invoiceproduct.get("productrate")?.setValue(0);
      return;
    }
    this.userdata.customerbyID(custno).subscribe((res: any) => {
      let custdata: any;
      custdata = res;
      let a = { "c": 77887 }
      console.log(custdata);
      let custname: String;
      custname = custdata[0].customername;

      console.log(custname);
      if (custdata != null) {
        this.invoiceform.get("remarks")?.setValue(custdata[0].customeraddress + ',' + custdata[0].customerphone1 + ',' + custdata[0].customeremail);

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
    let array = this.invoiceform.getRawValue().details;
    let sumtotal = 0
    array.forEach((x: any) => {
      sumtotal = sumtotal + x.total;
    });

    // tax calculation
    let sumtax = (7 / 100) * sumtotal;
    let nettotal = sumtotal + sumtax;

    this.invoiceform.get("total")?.setValue(String(sumtotal));
    this.invoiceform.get("tax")?.setValue(String(sumtax));
    this.invoiceform.get("netTotal")?.setValue(String(nettotal));
  }
  async SetEditInfo(invoiceno: any) {
    this.userdata.invoiceItembyID(invoiceno).subscribe(res => {
      this.editinvdetail = res;
      for (let i = 0; i < this.editinvdetail[0].details.length; i++) {
        this.addnewproduct();
      };
    });

    await this.userdata.invoicebyID(invoiceno).subscribe(res => {
      let editdata: any;

      editdata = res;
      console.log("Master")
      console.log(editdata[0])
      console.log("details")
      console.log(editdata[0].details)
      if (this.editinvdetail != null) {
        this.invoiceform.setValue({
          invoiceno: editdata[0].invoiceno, invoicedate: editdata[0].invoicedate, custno: editdata[0].custno,
          remarks: editdata[0].remarks, details: this.editinvdetail[0].details,
          total: editdata[0].total, tax: editdata[0].total, netTotal: editdata[0].total
        }, {
          onlySelf: true,
          emitEvent: false
        })

      }
      console.log("Invoice form data")
      console.log(this.invoiceform.value);
    });

    // this.invoiceform

  }
  addnewproduct() {
    this.invoicedetail = this.invoiceform.get("details") as FormArray;

    let customercode = this.invoiceform.get("custno")?.value;

    if ((customercode != null && customercode != '') || this.isedit) {
      this.invoicedetail.push(this.Generaterow());
    } else {
      this.alert.warning('Please select the customer', 'Validation');
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
    this.invoicedetail = this.invoiceform.get("details") as FormArray;
    this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
    let qty = this.invoiceproduct.get("productqty")?.value;
    let price = this.invoiceproduct.get("productrate")?.value;
    let total = qty * price;
    this.invoiceproduct.get("total")?.setValue(total);

    this.summarycalculation();
  }
  productchange(index: any) {
    this.invoicedetail = this.invoiceform.get("details") as FormArray;
    this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
    let productcode = this.invoiceproduct.get("productno")?.value;
    if (productcode === "" || productcode === null) {
      this.invoiceproduct.get("productrate")?.setValue(0);
      return;
    }
    this.userdata.productbyID(productcode).subscribe((res: any) => {
      let proddata: any;
      proddata = res;

      if (proddata != null) {
        // this.invoiceproduct.get("productName")?.setValue(proddata.name);
        this.invoiceproduct.get("productrate")?.setValue(proddata[0].salerate);
        this.Itemcalculation(index);
      }
    });
  }



  get invproducts() {
    return this.invoiceform.get("details") as FormArray;
  }



}
