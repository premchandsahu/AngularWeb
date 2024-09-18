import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../../services/userdata.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent implements OnInit{
constructor(private userdata: UserdataService,private router: Router){

}
//dtoptions: DataTables.Settings = {};
Invoiceheader: any;
ngOnInit(): void {
  this.loadInvoice();
}
loadInvoice(){
  this.userdata.invoicesummary().subscribe((res) => {
  
    this.Invoiceheader = res;
    console.log(this.Invoiceheader)
  })
  //console.log(this.Invoiceheader);
}
Editinvoice(invoiceno:number){
  this.router.navigateByUrl('/editbilling/' + invoiceno);
}
invoiceremove(invoicno:number){

}
PreviewInvoice(invoicno:number){

}
DownloadInvoice(invoicno:number){

}
}
