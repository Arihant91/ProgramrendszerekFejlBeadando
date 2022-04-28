import { JsonpClientBackend } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../utils/connection.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  products: any = [];
  cart: any = [];


  constructor(private connectionService: ConnectionService, private router: Router) {
    this.getProducts();
   }

  ngOnInit(): void {
    
  }

  ngOnDestroy(){
    
  }
  

  addedToCart(product: any){
    this.cart.push(product);
    console.log(this.cart)
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getProducts(){

    this.connectionService.getProducts().subscribe(data => {
      const tmp = JSON.parse(JSON.stringify(data)).forEach((product: any) => {
        this.products.push(product)
      })
  
    }, error => {
      console.log('Sorry we encoutnered an error: ', error)
    });
  }

}
