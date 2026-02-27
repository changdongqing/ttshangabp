import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@abp/ng.core';
import { LpxSideMenuLayoutModule } from '@volo/ngx-lepton-x.lite/layouts';
import {
  LpxFooterModule,
  LpxNavbarModule,
  LpxTranslateModule,
  PanelsModule,
} from '@volo/ngx-lepton-x.core';
import {
  LanguageSelectionModule,
  UserProfileModule,
} from '@volo/ngx-lepton-x.lite';
import { LeptonXAbpCoreModule } from '@volo/abp.ng.lepton-x.core';
import { provideSideMenuLayout } from './providers';
import {
  NavItemsComponent,
  LanguageSelectionComponent,
  UserProfileComponent,
  NavigateToLoginComponent,
} from './components';
import { SideMenuApplicationLayoutComponent } from './side-menu-application-layout/side-menu-application-layout.component';

@NgModule({
  imports: [
    CommonModule,
    LpxSideMenuLayoutModule,
    RouterModule,
    LpxNavbarModule,
    CoreModule,
    LeptonXAbpCoreModule,
    PanelsModule,
    UserProfileModule,
    LanguageSelectionModule,
    LpxTranslateModule,
    LpxFooterModule,
    SideMenuApplicationLayoutComponent,
    NavItemsComponent,
    LanguageSelectionComponent,
    UserProfileComponent,
    NavigateToLoginComponent,
  ],
})
export class SideMenuLayoutModule {
  /**
   * @deprecated `SideMenuLayoutModule.forRoot()` is deprecated. You can use `provideSideMenuLayout` **function** instead.
   */
  static forRoot(): ModuleWithProviders<SideMenuLayoutModule> {
    return {
      ngModule: SideMenuLayoutModule,
      providers: [provideSideMenuLayout()],
    };
  }
}
