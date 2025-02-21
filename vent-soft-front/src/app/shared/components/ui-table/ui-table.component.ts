import { Component, computed, Input, input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface TableColumn<T> {
  label: string;
  def: keyof T;
  content: (row: T) => string | null | undefined | number | boolean ;
}

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSlideToggleModule, MatProgressSpinnerModule],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.css',
})
export class UiTableComponent<T> implements OnChanges {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() isLoading = false;

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.setData();
    }
    if (changes['columns'] && changes['columns'].currentValue) {
      this.displayedColumns = this.columns.map((col) => col.def.toString());
    }
  }

  private setData() {
    this.dataSource.data = this.data;
  }

  getColumnDef(columnDef: keyof T): string {
    return columnDef.toString();
  }

  isBoolean(row: T, field: keyof T): boolean {
    const value = row[field];
    return typeof value === 'boolean' ? value : false;
  }

  toggleStatus<K extends keyof T>(row: T, field: K) {
    if (typeof row[field] === 'boolean') {
      row[field] = !row[field] as T[K]; // Cambiar el estado del campo boolean
      console.log('Row updated:', row);
    } else {
      console.error(`El campo "${String(field)}" no es de tipo boolean.`);
    }
  }
}
