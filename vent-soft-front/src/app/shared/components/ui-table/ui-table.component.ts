import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.css'
})
export class UiTableComponent<T> implements OnChanges{
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<T>([]);
  data = input<T[]>([])

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.dataSource.data = this.data()
    }
  }
}
