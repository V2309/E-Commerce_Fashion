
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-admin',
  standalone: false,
  
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']; 
  categories: any[] = [];
  editProductData: any = {};
  newProduct: any = {
    name: '',
    price: 0,
    oldprice: 0,
    description: '',
    buyturn: 0,
    quantity: 0,
    category_id: null,
    image: '',
    size: '',
  };
  selectedFile: File | null = null;
  isAddProductFormVisible: boolean = false;
  isProductListVisible: boolean = true;
  isEditProductFormVisible: boolean = false;
  constructor(
    private categoryService: CategoryService,
    private http: HttpClient,
    private authService: AuthService,

  ) {}

  
  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<{ message: string; data: Product[] }>('http://localhost:3000/api/products')
      .subscribe(
        (response) => {
          this.products = response.data;
        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );
  }
  loadCategories(): void {
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

  
  showAddProductForm(): void {
    this.isAddProductFormVisible = true;
    this.isProductListVisible = false;
  }

  hideAddProductForm(): void {
    this.isAddProductFormVisible = false;
    this.isProductListVisible = true;
  }

  showEditProductForm(product: Product): void {
    this.editProductData = { ...product };
    this.isEditProductFormVisible = true;
    this.isProductListVisible = false;
  }

  hideEditProductForm(): void {
    this.isEditProductFormVisible = false;
    this.isProductListVisible = true;
  }
 
  
  onImageUpload(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onEditImageUpload(event: any): void {
    this.editProductData.selectedFile = event.target.files[0];
  }
  addProduct(): void {
    if (this.newProduct.price < 0 || this.newProduct.oldprice < 0 || this.newProduct.quantity < 0 || this.newProduct.buyturn < 0) {
      alert('Price, old price, quantity, and buy turn cannot be negative.');
      return;
    }
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile); // Ensure the field name is 'image'

      this.http.post<{ filePath: string }>('http://localhost:3000/api/images/upload', formData).subscribe(
        (response) => {
          console.log('Image uploaded successfully:', response.filePath);
          this.newProduct.image = response.filePath; // Update the newProduct object with the image path
          console.log('Updated newProduct object:', this.newProduct); // Debugging statement
          this.saveProduct();
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    } else {
      this.saveProduct();
    }
  }

  saveProduct(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Saving product with newProduct object:', this.newProduct); // Debugging statement
    this.http.post('http://localhost:3000/api/products', this.newProduct, { headers }).subscribe(
      () => {
        this.newProduct = {
          name: '',
          price: 0,
          oldprice: 0,
          description: '',
          buyturn: 0,
          quantity: 0,
          category_id: null,
          image: '',
          size: '',
        };
        this.isAddProductFormVisible = false;
        this.selectedFile = null;
        this.fetchProducts();
      },
      (error) => {
        console.error('Error saving product:', error);
      }
    );
  }


  deleteProduct(productId: number) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`http://localhost:3000/api/products/${productId}`, { headers })
      .subscribe(
        () => {
          this.products = this.products.filter(product => product.id !== productId);
        },
        (error) => {
          console.error('Error deleting product', error);
        }
      );
  }
  updateProduct(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (this.editProductData.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.editProductData.selectedFile);

      this.http.post<{ filePath: string }>('http://localhost:3000/api/images/upload', formData).subscribe(
        (response) => {
          this.editProductData.image = response.filePath;
          this.saveUpdatedProduct(headers);
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    } else {
      this.saveUpdatedProduct(headers);
    }
  }

  saveUpdatedProduct(headers: HttpHeaders): void {
    const { id, created_at, updated_at, selectedFile, ...updateData } = this.editProductData; // Remove the id, created_at, updated_at, and selectedFile fields from the payload
    this.http.put(`http://localhost:3000/api/products/${id}`, updateData, { headers }).subscribe(
      () => {
        this.isEditProductFormVisible = false;
        this.fetchProducts();
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }
  cancelEdit(): void {
    this.isEditProductFormVisible = false;
    this.isProductListVisible = true;
  }
}