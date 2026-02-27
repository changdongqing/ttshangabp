import { Component, inject } from '@angular/core';
import { AuthService, LocalizationPipe } from '@abp/ng.core';

@Component({
  selector: 'abp-navigate-to-login',
  template: `
    <a href="#" class="nav-link" (click)="navigateToLogin($event)">
      <span>{{ 'AbpUi::Login' | abpLocalization }}</span>
    </a>
  `,
  imports: [LocalizationPipe],
})
export class NavigateToLoginComponent {
  readonly authService = inject(AuthService);


  navigateToLogin(event: MouseEvent) {
    event.preventDefault();
    this.authService.navigateToLogin();
  }
}
