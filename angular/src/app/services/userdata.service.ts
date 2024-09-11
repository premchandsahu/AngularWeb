import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:8000/";
  users() {
    return this.http.get(this.url + "todos")
  }
  productcategory() {
    return this.http.get(this.url + "productcategory")
  }
  productcategoryadd(data: any) {
    return this.http.post(this.url + "productcategory", data)
  }
  productcategoryedit(data: any) {
    return this.http.put(this.url + "productcategory", data)
  }
  productcategorydelete(data: any) {
    return this.http.delete(this.url + "productcategory", data)
  }
  customer() {
    return this.http.get(this.url + "customer")
  }
  customerbyID(ID: number) {
    return this.http.get(this.url + "customer/" + ID)
  }
  cusstomeradd(data: any) {
    return this.http.post(this.url + "customer", data)
  }
  customeredit(data: any) {
    return this.http.put(this.url + "customer", data)
  }
  customerdelete(data: any) {
    return this.http.delete(this.url + "customer", data)
  }
  product() {
    return this.http.get(this.url + "product")
  }
  productbyID(ID: number) {
    return this.http.get(this.url + "product/" + ID)
  }
  productadd(data: any) {
    return this.http.post(this.url + "product", data)
  }
  productedit(data: any) {
    return this.http.put(this.url + "product", data)
  }
  productdelete(data: any) {
    return this.http.delete(this.url + "product", data)
  }
  invoice() {
    return this.http.get(this.url + "invoice")
  }
  invoicebyID(invoiceno: any) {
    return this.http.get(this.url + "invoice/"+invoiceno)
  }
  invoicebyIDHeader(invoiceno: any) {
    return this.http.get(this.url + "invoice/"+invoiceno)
  }
  saveinvoice(data: any) {

    if (data.invoiceno === "" || data.invoiceno === null) {
      console.log("Empty")
      return this.http.post(this.url + "invoice", data)
    }
    else
      return this.http.put(this.url + "invoice/" + data.invoiceno, data)
  }
  invoiceedit(data: any) {
    return this.http.put(this.url + "invoice/" + data.invoiceno, data)
  }
  invoicedelete(data: any) {
    return this.http.delete(this.url + "invoice", data)
  }

}
