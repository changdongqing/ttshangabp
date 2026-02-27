import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { provideAbpCore, withOptions } from "@abp/ng.core";
import { registerLocaleForEsBuild } from "@abp/ng.core/locale";
import { provideAbpOAuth } from "@abp/ng.oauth";
import {
  provideAbpThemeShared,
  provideLogo,
  withEnvironmentOptions,
} from "@abp/ng.theme.shared";
import { provideAccountConfig } from "@abp/ng.account/config";
import { provideIdentityConfig } from "@abp/ng.identity/config";
import { provideTenantManagementConfig } from "@abp/ng.tenant-management/config";
import { provideSettingManagementConfig } from "@abp/ng.setting-management/config";
import { provideThemeLeptonX } from "@abp/ng.theme.lepton-x";
import { provideSideMenuLayout } from "@abp/ng.theme.lepton-x/layouts";
import { provideAccountLayout } from "@abp/ng.theme.lepton-x/account";
import { environment } from "../environments/environment";
import { APP_ROUTE_PROVIDER } from "./route.provider";
import { APP_ROUTES } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    APP_ROUTE_PROVIDER,
    provideRouter(APP_ROUTES),
    provideAnimations(),
    provideAccountLayout(),
    provideSideMenuLayout(),
    provideThemeLeptonX(),
    provideAbpCore(
      withOptions({
        environment,
        registerLocaleFn: registerLocaleForEsBuild(),
      })
    ),
    provideAbpOAuth(),
    provideAbpThemeShared(),
    provideAccountConfig(),
    provideIdentityConfig(),
    provideTenantManagementConfig(),
    provideSettingManagementConfig(),
    provideLogo(withEnvironmentOptions(environment)),
  ],
};
