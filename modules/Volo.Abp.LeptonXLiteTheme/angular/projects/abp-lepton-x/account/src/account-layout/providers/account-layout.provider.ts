import {
  EnvironmentProviders,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { ReplaceableComponentsService } from '@abp/ng.core';
import { AccountLayoutComponent } from '../account-layout.component';

export function provideAccountLayout(): EnvironmentProviders {
  return provideAppInitializer(() => {
    initAccountLayout();
  });
}

export function initAccountLayout() {
  const replaceableComponents = inject(ReplaceableComponentsService);
  replaceableComponents.add({
    key: 'Theme.AccountLayoutComponent',
    component: AccountLayoutComponent,
  });
}
