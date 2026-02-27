import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationPipe, ReplaceableTemplateDirective } from '@abp/ng.core';
import { LOGO_APP_NAME_TOKEN } from '@abp/ng.theme.shared';
import { LanguageSelectionComponent } from '@volo/ngx-lepton-x.lite';
import { TenantBoxComponent } from '../tenant-box/tenant-box.component';
import { AccountLayoutService } from '../../services/account-layout.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lpx-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  imports: [
    CommonModule,
    LocalizationPipe,
    ReplaceableTemplateDirective,
    TenantBoxComponent,
    LanguageSelectionComponent,
  ],
  providers: [AccountLayoutService],
})
export class AuthWrapperComponent {
  service = inject(AccountLayoutService);
  protected readonly appName =
    inject(LOGO_APP_NAME_TOKEN, {
      optional: true,
    }) ?? 'ProjectName';
}
