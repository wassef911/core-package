import { ErrorHandler, Injectable } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToastLuncherService implements ErrorHandler {

  constructor(protected toastrService: NbToastrService) { }

  dialogToast(msg: string, status: NbComponentStatus) {
    if (!environment.production) console.log(msg);

    this.toastrService.show('', msg, {
      status: status,
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_LEFT,
      preventDuplicates: true,
    });
  }

  success(msg: string) {
    this.dialogToast(msg, 'success');
  }

  alert(msg: string) {
    this.dialogToast(msg, 'danger');
  }

  info(msg: string) {
    this.dialogToast(msg, 'info');
  }

  handleError(error) {
    console.error(error);
    this.alert(error.message);
  }
}
