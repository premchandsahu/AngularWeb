import { Component } from '@angular/core';
import { UserdataService } from './services/userdata.service'
declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cwh-todo-list';
  users:any;

  constructor(private userdata: UserdataService) {
    this.users=userdata.users();
  }
  ngOnInit(){
   
  }
}
