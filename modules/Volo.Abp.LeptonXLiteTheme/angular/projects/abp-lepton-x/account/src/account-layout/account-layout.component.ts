import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageAlertContainerComponent } from '@volo/abp.ng.lepton-x.core';
import { AuthWrapperComponent } from './components/auth-layout/auth-wrapper.component';

@Component({
  selector: 'abp-account-layout',
  templateUrl: './account-layout.component.html',
  imports: [AuthWrapperComponent, RouterOutlet, PageAlertContainerComponent],
})
export class AccountLayoutComponent {}
