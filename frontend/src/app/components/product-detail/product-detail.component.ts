
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(Number(productId)).subscribe(
      (response) => {
        this.product = response.data;
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }
}
