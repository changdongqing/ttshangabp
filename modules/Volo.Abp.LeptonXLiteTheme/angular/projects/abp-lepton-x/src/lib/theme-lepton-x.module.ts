import { ModuleWithProviders, NgModule } from '@angular/core';
import { LpxModule } from '@volo/ngx-lepton-x.lite';
import { ValidationErrorModule } from './components/validation-error';
import {
  provideThemeLeptonX,
  ThemeLeptonXModuleOptions,
  withThemeLeptonXOptions,
} from './providers';

@NgModule({
  declarations: [],
  imports: [LpxModule, ValidationErrorModule],
  exports: [],
})
export class ThemeLeptonXModule {
  /**
   * @deprecated `ThemeLeptonXModule.forRoot()` is deprecated. You can use `provideThemeLeptonX` **function** instead.
   */
  static forRoot(
    options?: ThemeLeptonXModuleOptions,
  ): ModuleWithProviders<ThemeLeptonXModule> {
    return {
      ngModule: ThemeLeptonXModule,
      providers: [provideThemeLeptonX(withThemeLeptonXOptions(options))],
    };
  }
}
