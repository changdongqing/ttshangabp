import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  Provider,
} from '@angular/core';
import {
  provideLpxSideMenuLayout,
  APPEND_DEFAULTS,
} from '@volo/ngx-lepton-x.lite/layouts';
import { LPX_LAYOUT_PROVIDER, NAV_ITEM_PROVIDER } from './';

export function provideSideMenuLayout(): EnvironmentProviders {
  const providers: (Provider | EnvironmentProviders)[] = [
    LPX_LAYOUT_PROVIDER,
    NAV_ITEM_PROVIDER,
    provideLpxSideMenuLayout(APPEND_DEFAULTS),
  ];

  return makeEnvironmentProviders(providers);
}
