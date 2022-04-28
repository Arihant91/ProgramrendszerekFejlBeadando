import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart : any = [];

  constructor() {
    let tmp : any = localStorage.getItem('cart');
    this.cart = JSON.parse(tmp); 
   }

  ngOnInit(): void {
  }



}

class Cart {
  products : any = [];

  constructor(){

  }

  addProduct(product : Product){
    this.products.push(product);
  }

}

class Product {
  id: number;
  name : string;
  price: number;
  _id: number;

  constructor(id: number, name: string, price: number){
    this.id = id;
    this.name = name;
    this.price = price;
    this._id = id;
  }

}

