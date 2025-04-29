import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  constructor() {}

  /** Aplica la capitalización automática a todos los campos de texto en un FormGroup */
  AutoFirstWordMayus(formGroup: FormGroup): void {
    formGroup.valueChanges.subscribe((values) => {
      Object.keys(values).forEach((field) => {
        let control = formGroup.get(field);
        if (control && typeof control.value === 'string') {
          control.setValue(this.firstWordMayus(control.value), { emitEvent: false });
        }
      });
    });
  }

  /** Convierte la primera letra de cada palabra en mayúscula */
  private firstWordMayus(text: string): string {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
