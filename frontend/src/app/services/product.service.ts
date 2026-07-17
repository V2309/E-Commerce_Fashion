import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:3000/api/products'; 
    private searchResultsSource = new BehaviorSubject<any[]>([]);
    currentSearchResults = this.searchResultsSource.asObservable();
  
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl); }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`); }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product); }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product)}
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);}
  
  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/${categoryId}`);
  }
  updateSearchResults(results: any[]) {
    this.searchResultsSource.next(results);
  }
}