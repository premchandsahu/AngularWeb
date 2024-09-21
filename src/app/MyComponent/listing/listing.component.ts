import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../../services/userdata.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

 
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent implements OnInit{
  vfromdate: Date= new Date(Date.now());
  vtodate: Date= new Date(Date.now());;
  fromdate: Date= new Date(this.vfromdate.getFullYear(),this.vfromdate.getMonth(),this.vfromdate.getDate());
  todate: Date= new Date(Date.now());
  
  

constructor(private userdata: UserdataService,private router: Router,private alert: ToastrService,){
  fromdate: new Date(Date.now());
  todate: new Date(Date.now());
}

//dtoptions: DataTables.Settings = {};
Invoiceheader: any;
sumtotal: number=0;
cnttotal: number=0
ngOnInit(): void {
 
  this.loadInvoice(this.fromdate,this.todate);
}
loadInvoice(fromdate:Date,todate:Date){

  const paramdata={"fromdate": fromdate,"todate":todate};
  console.log("from load invoice",paramdata)
 // console.log(fromdate.getMonth(),fromdate.getDate(),fromdate.getFullYear())
 
  this.userdata.invoicesummary(paramdata).subscribe((res) => {
  
    this.Invoiceheader = res;
    this.cnttotal=0
    this.sumtotal=0
    this.Invoiceheader.forEach((x: any) => {
      this.cnttotal=this.cnttotal+1;
      this.sumtotal = this.sumtotal + x.total;
    });
  })
  console.log(this.Invoiceheader);
}
Editinvoice(invoiceno:number){
  this.router.navigateByUrl('/editbilling/' + invoiceno);
}
invoiceremove(invoiceno:number){
  if (confirm('Do you want to remove this Invoice :' + invoiceno)) {
    this.userdata.invoicedelete(invoiceno).subscribe(res => {
      let result: any;
      result = res;
      if (result.result == 'pass') {
        this.alert.success('Removed Successfully.', 'Remove Invoice')
        this.loadInvoice(this.fromdate,this.todate);
      } else {
        this.alert.error('Failed to Remove.', 'Invoice');
      }
    });
  }
}
PreviewInvoice(invoicno:number){

}
DownloadInvoice(invoicno:number){

}


}
