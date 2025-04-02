import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  showAlert(title: string, text: string = '', icon: SweetAlertIcon = 'info', confirmButtonColor: string = '#3085d6', cancelButtonColor: string = '#d33'): void {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor,
      cancelButtonColor,
    });
  }

  showSuccess(text: string = '', ): void {
    this.showAlert("Proceso exitoso", text, 'success', '#3f51b5');
  }

  showError(title: string, text: string = ''): void {
    this.showAlert(title, text, 'error', '#dc3545');
  }

  showWarning(title: string, text: string = ''): void {
    this.showAlert(title, text, 'warning', '#ffc107');
  }

  showConfirmation(title: string, text: string = ''): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      confirmButtonColor: '#3f51b5',
    });
  }

}
