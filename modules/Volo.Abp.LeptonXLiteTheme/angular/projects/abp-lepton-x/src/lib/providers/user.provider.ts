import { inject, provideAppInitializer } from '@angular/core';
import { AbpUserProfileService } from '../services/user-profile.service';

export const LPX_USER_PROVIDER = provideAppInitializer(() => {
  const userProfile = inject(AbpUserProfileService);
  userProfile.subscribeUser();
});
