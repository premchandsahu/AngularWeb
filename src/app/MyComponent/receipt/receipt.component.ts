import { Component, inject } from '@angular/core';
import { UserdataService } from '../../services/userdata.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent {
  constructor(private userdata: UserdataService, private alert: ToastrService, private router: Router, private activeroute: ActivatedRoute) { }
  
  pagetitle: string="Receipt Details";
  
  
  private formBuilder = inject(FormBuilder);



  receiptform = this.formBuilder.group({
    receiptno: this.formBuilder.control({value: '', disabled: true }),
    receiptdate: this.formBuilder.control('', Validators.required), 
    custno: this.formBuilder.control('',  Validators.required),
    paymentmode: this.formBuilder.control(0, Validators.required),
    amount: this.formBuilder.control(0, Validators.required),
    remarks: this.formBuilder.control(1)
  })
  editreceiptno:any;
  isedit: boolean=false;

  ngOnInit(): void {
    this.loadReceiptCategory();
    this.editreceiptno = this.activeroute.snapshot.paramMap.get('receiptno');
    if (this.editreceiptno != null) {
      this.pagetitle = "Edit Receipt";
      this.isedit = true;
      this.SetEditInfo(this.editreceiptno);
    }

   


  }
  async SetEditInfo(receiptno:any){
    await this.userdata.receiptbyID(receiptno).subscribe(res => {
      let editdata: any;

      editdata = res;
      if (editdata != null) {
        this.receiptform.setValue({
          receiptno: editdata[0].receiptno, receiptdate: editdata[0].receiptdate, custno: editdata[0].custno,
          paymentmode: editdata[0].paymentmode , amount: editdata[0].amount ,
          remarks: editdata[0].remarks
        },  {
          onlySelf: true,
          emitEvent: false
      })
       
      }

    });
   
  }

  SaveReceipt() {
    console.log(this.receiptform.getRawValue());
    if (this.receiptform.valid) {

      this.userdata.savereceipt(this.receiptform.getRawValue()).subscribe((res: any) => {
        let result: any;
        result = res;
        if (result.result == 'pass') {
          if (this.isedit) {
            this.alert.success('Updated Successfully.', 'Receipt :' + result.receiptno);
          } else {
            this.alert.success('Created Successfully.', 'Receipt :' + result.receiptno);
          }
          this.router.navigate(['/receiptlisting']);
        } else {
          this.alert.error('Failed to save.', 'Receipt');
        }
      });
    } else {
      this.alert.warning('Please enter values in all mandatory filed', 'Validation');
    }
  }

  mastercustomer: any;
  loadReceiptCategory() {
    this.userdata.customer().subscribe((res) => {
      this.mastercustomer = res;
    })
  }


  

}
