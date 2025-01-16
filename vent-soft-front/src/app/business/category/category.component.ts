import { Component, OnInit } from '@angular/core';
import { UiTableComponent, TableColumn } from '../../shared/components/ui-table/ui-table.component';
import { timer } from 'rxjs';
import { CategoryFormComponent } from "./category-form/category-form.component";

interface Category {
  description: string;
  id: number;
  status: boolean;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [UiTableComponent, CategoryFormComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export default class CategoryComponent implements OnInit {
  categories: Category[] = [];
  tableColumns: TableColumn<Category>[] = [];
  isLoadingCategory = true;
  ngOnInit(): void {
    this.getCategories()
    this.setTableColumns();
  }
  getCategories() {
    timer(2000).subscribe(() => {
      this.isLoadingCategory = false;
      this.categories = [
        {
          description: 'Repuestos',
          id: 1,
          status: true,
        },
        {
          description: 'Tecnologia',
          id: 2,
          status: true,
        },
        {
          description: 'Accesorios',
          id: 3,
          status: true,
        },

      ]
    })
  }

  setTableColumns() {
    this.tableColumns = [
      {
        label: 'Id',
        def: 'id',
        content: (row) => row.id,
      },

      {
        label: 'Description',
        def: 'description',
        content: (row) => row.description,
      },

      {
        label: 'Status',
        def: 'status',
        content: (row) => row.status,
      },

    ]

  }

  addCategory(category: Category) {
    console.log(category);
    this.categories = [...this.categories, category];
  }
}
