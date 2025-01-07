import { Component, computed, input, OnChanges, SimpleChanges } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

export interface TableColumn<T> {
  label: string;
  def: string;
  content: (row: T) => string | null | undefined | number
}

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.css'
})
export class UiTableComponent<T> implements OnChanges{
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns = computed(() => this.columns().map(col => col.def));
  dataSource = new MatTableDataSource<T>([]);
  data = input<T[]>([]);
  columns = input<TableColumn<T>[]>([]);
  isLoading = input(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.setData();
    }
  }

  private setData() {
    this.dataSource.data = this.data();
  }
}
