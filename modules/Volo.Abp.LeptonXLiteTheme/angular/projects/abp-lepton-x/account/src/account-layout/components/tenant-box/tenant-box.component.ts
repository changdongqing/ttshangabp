import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutofocusDirective, LocalizationPipe } from '@abp/ng.core';
import {
  ButtonComponent,
  ModalCloseDirective,
  ModalComponent,
} from '@abp/ng.theme.shared';
import { AccountLayoutService } from '../../services/account-layout.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lpx-tenant-box',
  templateUrl: './tenant-box.component.html',
  imports: [
    CommonModule,
    FormsModule,
    AutofocusDirective,
    ModalCloseDirective,
    LocalizationPipe,
    ModalComponent,
    ButtonComponent,
  ],
})
export class TenantBoxComponent {
  public service = inject(AccountLayoutService);
}
