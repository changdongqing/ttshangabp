import { AuthService, NAVIGATE_TO_MANAGE_PROFILE } from '@abp/ng.core';
import { UserMenuService } from '@abp/ng.theme.shared';
import { inject, provideAppInitializer } from '@angular/core';
import { eUserMenuItems } from '../enums/user-menu-items';

export const LEPTON_X_USER_MENU_PROVIDERS = [
  provideAppInitializer(() => {
    configureUserMenu();
  }),
];

export function configureUserMenu() {
  const userMenu = inject(UserMenuService);
  const authService = inject(AuthService);
  const navigateToManageProfile = inject(NAVIGATE_TO_MANAGE_PROFILE);
  userMenu.addItems([
    {
      id: eUserMenuItems.MyAccount,
      order: 100,
      textTemplate: {
        text: 'AbpAccount::MyAccount',
      },
      action: () => navigateToManageProfile(),
    },
    {
      id: eUserMenuItems.Logout,
      order: 101,
      textTemplate: {
        text: 'AbpUi::Logout',
      },
      action: () => authService.logout().subscribe(),
    },
  ]);
}
