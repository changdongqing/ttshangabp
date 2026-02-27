import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReplaceableTemplateDirective } from '@abp/ng.core';
import { eThemeLeptonXComponents } from '@abp/ng.theme.lepton-x';
import {
  NavbarPanelDirective,
  NavbarComponent,
  LogoPanelDirective,
  NavbarRoutesDirective,
  NavbarRoutesComponent,
  CurrentUserImagePanelDirective,
  BreadcrumbPanelDirective,
  MobileNavbarPanelDirective,
  FooterPanelDirective,
  ContentPanelDirective,
} from '@volo/ngx-lepton-x.core';
import {
  LanguageSelectionPanelDirective,
  MobileLanguageSelectionDirective,
  MobileUserProfilePanelDirective,
  SideMenuLayoutComponent,
  TopbarContentPanelDirective,
  UserProfilePanelDirective,
} from '@volo/ngx-lepton-x.lite/layouts';
import {
  IfReplaceableTemplateExistsDirective,
  PageAlertContainerComponent,
} from '@volo/abp.ng.lepton-x.core';

@Component({
  selector: 'abp-application-layout',
  templateUrl: './side-menu-application-layout.component.html',
  imports: [
    IfReplaceableTemplateExistsDirective,
    NavbarPanelDirective,
    LogoPanelDirective,
    ReplaceableTemplateDirective,
    NavbarRoutesDirective,
    TopbarContentPanelDirective,
    UserProfilePanelDirective,
    CurrentUserImagePanelDirective,
    LanguageSelectionPanelDirective,
    BreadcrumbPanelDirective,
    MobileNavbarPanelDirective,
    MobileUserProfilePanelDirective,
    FooterPanelDirective,
    MobileLanguageSelectionDirective,
    ContentPanelDirective,
    PageAlertContainerComponent,
    SideMenuLayoutComponent,
    NavbarComponent,
    NavbarRoutesComponent,
    RouterOutlet,
  ],
})
export class SideMenuApplicationLayoutComponent {
  toolbarKey = eThemeLeptonXComponents.Toolbar;
  navbarKey = eThemeLeptonXComponents.Navbar;
  routesKey = eThemeLeptonXComponents.Routes;
  navItemsKey = eThemeLeptonXComponents.NavItems;
  breadcrumbKey = eThemeLeptonXComponents.Breadcrumb;
  footerKey = eThemeLeptonXComponents.Footer;
  mobileNavbarKey = eThemeLeptonXComponents.MobileNavbar;
  pageAlertContainerKey = eThemeLeptonXComponents.PageAlertContainer;
  logoKey = eThemeLeptonXComponents.Logo;
  currentUserKey = eThemeLeptonXComponents.CurrentUser;
  currentUserImageKey = eThemeLeptonXComponents.CurrentUserImage;
  languageKey = eThemeLeptonXComponents.Languages;
  mobileUserProfile = eThemeLeptonXComponents.MobileUserProfile;
  mobileLanguageSelection = eThemeLeptonXComponents.MobileLanguageSelection;
}
