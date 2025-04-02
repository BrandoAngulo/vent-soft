import { Component, computed, EventEmitter, Input, input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AlertService } from '../../services/alert.service';

export interface TableColumn<T> {
  label: string;
  def: keyof T | 'acciones';
  content: (row: T) => string | null | undefined | number | boolean;
}

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.css'],
})
export class UiTableComponent<T> implements OnChanges {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() isLoading = false;
  @Output() editRow = new EventEmitter<T>();
  @Output() deleteRow = new EventEmitter<T>();
  @Output() statusChanged = new EventEmitter<T>();

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T>([]);

  constructor(
    private alertService: AlertService,
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.setData();
    }
    if (changes['columns'] && changes['columns'].currentValue) {
      this.displayedColumns = this.columns.map((col) => col.def as string);
    }
  }

  private setData() {
    this.dataSource.data = this.data;
  }

  getColumnDef(columnDef: keyof T | 'acciones'): string {
    return columnDef as string;
  }

  isBoolean(row: T, field: keyof T | 'acciones'): boolean {
    if (field === 'acciones') return false; // 'acciones' no es un campo booleano
    const value = row[field as keyof T];
    return typeof value === 'boolean' ? value : false;
  }

  toggleStatus(row: T, field: keyof T | 'acciones') {
    if (field === 'acciones') return; // No hacer nada para 'acciones'
    const key = field as keyof T;
    if (typeof row[key] === 'boolean') {
      row[key] = !row[key] as any;
      this.statusChanged.emit(row);
      this.alertService.showSuccess();
    } else {
      this.alertService.showError(`El campo ${String(key)}`, "No es booleano")
    }
  }

  onEdit(row: T) {
    this.editRow.emit(row);
  }

  onDelete(row: T) {
    this.alertService.showConfirmation('Desea eliminar?').then((result) => {
      if (result.isConfirmed) {
        this.alertService.showSuccess();
        this.deleteRow.emit(row);
      }
    });
  }

}
