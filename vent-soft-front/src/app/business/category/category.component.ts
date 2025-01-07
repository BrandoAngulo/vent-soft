import { Component, OnInit } from '@angular/core';
import { UiTableComponent, TableColumn } from '../../shared/components/ui-table/ui-table.component';
import { timer } from 'rxjs';

interface Category {
  description: string;
  id: number;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [UiTableComponent],
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
          id: 1
        },
        {
          description: 'Tecnologia',
          id: 2
        },
        {
          description: 'Accesorios',
          id: 3
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

   ]

  }
}
