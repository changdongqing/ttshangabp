import { inject, provideAppInitializer } from '@angular/core';
import { ReplaceableComponentsService } from '@abp/ng.core';
import { eThemeLeptonXComponents } from '@abp/ng.theme.lepton-x';
import { SideMenuApplicationLayoutComponent } from '../side-menu-application-layout/side-menu-application-layout.component';
import { EmptyLayoutComponent } from '../../empty-layout';

export const LPX_LAYOUT_PROVIDER = provideAppInitializer(() => {
  initLayouts();
});

export function initLayouts() {
  const replaceableComponents = inject(ReplaceableComponentsService);
  replaceableComponents.add({
    key: eThemeLeptonXComponents.ApplicationLayout,
    component: SideMenuApplicationLayoutComponent,
  });
  replaceableComponents.add({
    key: eThemeLeptonXComponents.EmptyLayout,
    component: EmptyLayoutComponent,
  });
}
