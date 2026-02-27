import { inject, provideAppInitializer } from '@angular/core';
import { NavItemsService } from '@abp/ng.theme.shared';
import { eThemeLeptonXComponents } from '@abp/ng.theme.lepton-x';
import { LanguageService } from '@volo/ngx-lepton-x.core';
import { LanguageSelectionComponent } from '../components/language-selection/language-selection.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { OAuthService } from 'angular-oauth2-oidc';
import { NavigateToLoginComponent } from '../components';

export const NAV_ITEM_PROVIDER = provideAppInitializer(() => {
  addNavItems();
});

export function addNavItems() {
  const navItems = inject(NavItemsService);
  const oAuthService = inject(OAuthService);
  const languageService = inject(LanguageService);

  navItems.addItems([
    {
      id: eThemeLeptonXComponents.Login,
      order: 100,
      visible: () => !oAuthService.hasValidAccessToken(),
      component: NavigateToLoginComponent,
    },
    {
      id: eThemeLeptonXComponents.Languages,
      order: 100,
      visible: () => {
        const { languages } = languageService.store.state || {};
        return Array.isArray(languages) && languages.length > 1;
      },
      component: LanguageSelectionComponent,
    },
    {
      id: eThemeLeptonXComponents.CurrentUser,
      order: 100,
      component: UserProfileComponent,
    },
  ]);
}
