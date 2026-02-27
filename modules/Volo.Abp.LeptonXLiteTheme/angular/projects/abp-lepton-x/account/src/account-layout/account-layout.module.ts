import { ModuleWithProviders, NgModule } from '@angular/core';
import { AccountLayoutComponent } from './account-layout.component';
import { TenantBoxComponent } from './components/tenant-box/tenant-box.component';
import { AuthWrapperComponent } from './components/auth-layout/auth-wrapper.component';
import { CoreModule } from '@abp/ng.core';
import { LpxSideMenuLayoutModule } from '@volo/ngx-lepton-x.lite/layouts';
import { LanguageSelectionModule } from '@volo/ngx-lepton-x.lite';
import { RouterModule } from '@angular/router';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { PageAlertContainerModule } from '@volo/abp.ng.lepton-x.core';
import { provideAccountLayout } from './providers';

@NgModule({
  imports: [
    RouterModule,
    CoreModule,
    LpxSideMenuLayoutModule,
    ThemeSharedModule,
    PageAlertContainerModule,
    LanguageSelectionModule,
    TenantBoxComponent,
    AuthWrapperComponent,
    AccountLayoutComponent,
  ],
})
export class AccountLayoutModule {
  /***
   * @deprecated `AccountLayoutModule.forRoot()` is deprecated. You can use `provideAccountLayout()` **function** instead.
   */
  static forRoot(): ModuleWithProviders<AccountLayoutModule> {
    return {
      ngModule: AccountLayoutModule,
      providers: [provideAccountLayout()],
    };
  }
}
