import { SupplierDTO } from '../supplier.dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtilsService } from '../../../shared/utils/form-utils.service';
import { AlertService } from '../../../shared/services/alert.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [
        CommonModule,
        RouterModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatIconModule
  ],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.css'
})
export class SupplierFormComponent implements OnInit, OnChanges{

@Output() add = new EventEmitter<SupplierDTO>();
@Input() supplierEdit: SupplierDTO | null = null;
@Output() update = new EventEmitter<SupplierDTO>;

  message = "";
  supplierForm!: FormGroup;
  submit = false;

  constructor(
    private formBuilder: FormBuilder,
    private formUtilsService: FormUtilsService,
    private alertService: AlertService,

  ) {
    this.supplierForm = this.formBuilder.group({
      name: ['', Validators.required],
      cellPhone: ['', Validators.required],
      nit: ['', Validators.required],
    });
    this.formUtilsService.AutoFirstWordMayus(this.supplierForm);
  }

    ngOnInit(): void {
      this.loadSupplierData();
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['supplierEdit']) {
        this.loadSupplierData();
      }
    }

    loadSupplierData() {
      if (this.supplierEdit) {
        this.supplierForm.patchValue({
          name: this.supplierEdit?.name,
          lastName: this.supplierEdit?.lastName,
          cellPhone: this.supplierEdit?.cellPhone,
          nit: this.supplierEdit?.nit,
        });
      } else {
        this.supplierForm.reset({
          name: '',
          lastName: '',
          cellPhone: '',
          nit: '',
        });
      }
    }

  addSupplier(){
      if (this.supplierForm.invalid) {
          console.log(this.message = "Creating supplier error");
          return;
        }
        this.submit = true;
        const formValue = this.supplierForm.value;
        const supplier: SupplierDTO = {
          ...formValue,
          id: this.supplierEdit?.id,
          status: true
        }
        if (this.supplierEdit) {
          this.alertService.showSuccess();
          this.update.emit(supplier);
        } else {
          this.alertService.showSuccess();
          this.add.emit(supplier);
        }
        this.submit = false;
        this.supplierForm.reset({
          name: '',
          lastName: '',
          cellPhone: '',
          nit: '',
        })
      }
}
