import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-category',
  standalone: false,
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent implements OnInit {
  products: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('categoryId');
      if (categoryId) {
        this.productService.getProductsByCategory(Number(categoryId)).subscribe(
          (response) => {
            console.log('Products:', response.data); // Kiểm tra dữ liệu nhận được
            this.products = response.data;
          },
          (error) => {
            console.error('Error fetching products by category:', error);
          }
        );
      }
    });
  }
}