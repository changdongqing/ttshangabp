import { NgComponentOutlet, AsyncPipe } from '@angular/common';
import { Component, TrackByFunction, inject } from '@angular/core';
import { PermissionDirective } from '@abp/ng.core';
import {
  AbpVisibleDirective,
  NavItem,
  NavItemsService,
} from '@abp/ng.theme.shared';

@Component({
  selector: 'abp-nav-items',
  templateUrl: 'nav-items.component.html',
  styles: [':host{ all: inherit }'],
  imports: [
    PermissionDirective,
    AbpVisibleDirective,
    NgComponentOutlet,
    AsyncPipe,
  ],
})
export class NavItemsComponent {
  readonly navItems = inject(NavItemsService);

  trackByFn: TrackByFunction<NavItem> = (_, element) => element.id;
}
