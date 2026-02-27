import { inject, provideAppInitializer } from '@angular/core';
import {
  AbpNavbarService,
  AbpToolbarService,
} from '@volo/abp.ng.lepton-x.core';

export const INIT_SERVICE_PROVIDER = provideAppInitializer(() => {
  const abpToolbarService = inject(AbpToolbarService);
  const abpNavbarService = inject(AbpNavbarService);

  abpToolbarService.listenNavItems();
  abpNavbarService.initRoutes();
});
