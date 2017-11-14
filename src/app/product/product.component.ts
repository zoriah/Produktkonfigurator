import { Component, OnInit } from '@angular/core';
import { ProductService } from "../product-service/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {
  
  constructor(
    private productService:ProductService
  ) { }

  ngOnInit() {
  }

  getProducts():void{    
    //this.heroes = this.heroService.getHeroes();
  }

}
