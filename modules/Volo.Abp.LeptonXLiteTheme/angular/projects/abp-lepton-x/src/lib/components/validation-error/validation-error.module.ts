import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from './validation-error.component';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { CoreModule } from '@abp/ng.core';
import { provideValidationError } from '../../providers';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgxValidateCoreModule,
    ValidationErrorComponent,
  ],
  exports: [ValidationErrorComponent, NgxValidateCoreModule],
})
export class ValidationErrorModule {
  /**
   * @deprecated `ValidationErrorModule.forRoot()` is deprecated. You can use `provideValidationError` **function** instead.
   */
  static forRoot(): ModuleWithProviders<ValidationErrorModule> {
    return {
      ngModule: ValidationErrorModule,
      providers: [provideValidationError()],
    };
  }
}
