import { Component } from '@angular/core';
import { UserdataService } from '../../services/userdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlisting',
  templateUrl: './productlisting.component.html',
  styleUrl: './productlisting.component.css'
})
export class ProductlistingComponent {
  constructor(private userdata: UserdataService,private router: Router){


  }
  ngOnInit(): void {
    this.loadInvoice();
  }
  loadInvoice(){
    
  }
productlisting: any;

Editproduct(productno:any){

}
productremove(productno:any){

}

}
