import { Injectable, inject, Injector } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  ConfigStateService,
  CurrentUserDto,
  NAVIGATE_TO_MANAGE_PROFILE,
} from '@abp/ng.core';
import {
  NavItem,
  NavBarPropPredicate,
  UserMenuService,
} from '@abp/ng.theme.shared';
import { UserProfileService } from '@volo/ngx-lepton-x.core';

@Injectable({
  providedIn: 'root',
})
export class AbpUserProfileService {
  private configState = inject(ConfigStateService);
  private userProfileService = inject(UserProfileService);
  navigateToManageProfile = inject(NAVIGATE_TO_MANAGE_PROFILE);
  private userMenuService = inject(UserMenuService);

  currentUser$: Observable<CurrentUserDto> =
    this.configState.getOne$('currentUser');

  subscribeUser() {
    combineLatest([
      this.currentUser$.pipe(filter<CurrentUserDto>(Boolean)),
      this.userMenuService.items$,
    ]).subscribe(([user, userMenuItems]) => {
      const userActionGroups = userMenuItems.reduce(
        (acc, curr) => {
          let menuItemVisibility: NavBarPropPredicate<NavItem> = () => true;
          if (typeof curr.visible === 'function') {
            menuItemVisibility = (_prop?: NavItem, injector?: Injector) =>
              curr.visible!(curr, injector);
          }

          const menuItem = {
            icon: curr.textTemplate?.icon,
            text: curr.textTemplate?.text,
            component: curr?.component,
            action: () => {
              curr.action();
              return of(true);
            },
            visible: menuItemVisibility,
          };
          acc[0].push(menuItem);
          return acc;
        },
        [[]],
      );

      this.userProfileService.setUser({
        id: user.id,
        isAuthenticated: user.isAuthenticated,
        fullName: user.name || user.userName || '',
        email: user.email || '',
        userName: user.userName || '',
        avatar: {
          type: 'icon',
          source: 'bi bi-person-circle',
        },
        userActionGroups,
      });
    });
  }
}
