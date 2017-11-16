import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from "../product";

@Injectable()
export class ProductService {

  constructor() { 

  }

  getProducts():Observable<Product>{
    return;
  }

}
