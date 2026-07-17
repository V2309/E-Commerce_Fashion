import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  categories: any = [];
  searchTerm: string = '';
  filteredData: any[] = [];

  constructor(
    private categoryService: CategoryService,
     private http: HttpClient,
     private productService: ProductService
    ) { }
    ngOnInit(): void {
      this.categoryService.getCategories().subscribe(
        (response) => {
          if (Array.isArray(response.data)) {
            this.categories = response.data;
          } else {
            console.error('Expected an array but got:', response.data);
          }
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
    }
  
    onSearch() {
      console.log('Search term:', this.searchTerm);
      this.http.get(`http://localhost:3000/api/products?search=${this.searchTerm}`)
        .subscribe((response: any) => {
          console.log('Search results:', response);
          this.filteredData = response.data;
          this.productService.updateSearchResults(this.filteredData); // Update the shared service
        });
    }
  }