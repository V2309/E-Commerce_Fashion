
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-sidebar-category',
  standalone: false,
  
  templateUrl: './sidebar-category.component.html',
  styleUrl: './sidebar-category.component.css'
})
export class SidebarCategoryComponent implements OnInit{
  categories: any = [];
  constructor(private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (response) => {
        // Đảm bảo rằng response.data là một mảng
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
}
