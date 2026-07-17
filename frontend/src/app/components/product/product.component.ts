
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  httpClient = inject(HttpClient);
  data: Product[] = [];
  allProducts: Product[] = [];
  filteredData: Product[] = [];
  categories: { id: number, name: string }[] = [];
  limit = 12;
  currentPage = 1;
  totalPages = 5;
  selectedCategory = '';
  searchTerm: string = '';
  products: any[] = [];

  constructor(private router: Router, private http: HttpClient, private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchData();
    this.loadCategories();
    this.productService.currentSearchResults.subscribe(results => {
      if (results.length > 0) {
        this.filteredData = results;
      } else {
        this.filteredData = this.data;
      }
    });
  }

  fetchData() {
    const limit = 12;
    let currentPage = 1;
    this.httpClient
      .get<{ message: string; data: Product[]; currentPage: number; totalPages: number; totalProducts: number }>(
        `http://localhost:3000/api/products?page=${currentPage}&limit=${limit}`
      )
      .subscribe(
        (response) => {
          this.data = response.data;
          this.filteredData = this.data;
          const totalPages = response.totalPages;

          for (let page = 2; page <= totalPages; page++) {
            this.loadMoreData(page, limit);
          }
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
  }

  loadMoreData(page: number, limit: number) {
    this.httpClient
      .get<{ message: string; data: Product[] }>(`http://localhost:3000/api/products?page=${page}&limit=${limit}`)
      .subscribe(
        (response) => {
          this.data = [...this.data, ...response.data];
          this.filteredData = this.data;
        },
        (error) => {
          console.error('Error fetching data for page ' + page, error);
        }
      );
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = selectElement.value;
    this.filterData();
  }

  filterData() {
    this.filteredData = this.data.filter(product => 
      (this.searchTerm ? product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true)
    );
  }

  searchProducts() {
    this.filterData();
  }

  goToProductDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }


  loadCategories() {
    // Load categories logic here
  }

  addToCart(item: any) { 

    const cartId = localStorage.getItem('cart_id');
    if (!cartId) {
      console.error('Cart ID not found');
      return;
    }
    const cartItem = {
      cart_id: parseInt(cartId, 10), 
      product_id: item.id,
      quantity: 1 
    };
    console.log('Adding item to cart with cart_id:', cartItem.cart_id);
  
    this.httpClient.post('http://localhost:3000/api/cartitems', cartItem).subscribe(
      (response: any) => {
        console.log(`Item added to cart with cart_id: ${cartItem.cart_id}`, response);
        this.router.navigate(['/cart']); // Navigate to the cart page
      },
      (error: any) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }
}