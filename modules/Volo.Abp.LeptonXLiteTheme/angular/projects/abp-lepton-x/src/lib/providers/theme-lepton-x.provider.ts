import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  Provider,
} from '@angular/core';
import {
  VALIDATION_ERROR_TEMPLATE,
  VALIDATION_TARGET_SELECTOR,
  VALIDATION_INVALID_CLASSES,
} from '@ngx-validate/core';
import { LpxStyles } from '@volo/ngx-lepton-x.core';
import { provideLeptonXAbpCore } from '@volo/abp.ng.lepton-x.core';
import {
  LpxOptions,
  provideLpxLite,
  withLiteOptions,
} from '@volo/ngx-lepton-x.lite';
import { ValidationErrorComponent } from '../components';
import {
  INIT_SERVICE_PROVIDER,
  LPX_LANGUAGE_PROVIDER,
  LPX_TRANSLATE_PROVIDER,
  LEPTON_X_USER_MENU_PROVIDERS,
  LPX_USER_PROVIDER,
} from './';

export type ThemeLeptonXModuleOptions = LpxOptions;

export enum ThemeLeptonXFeatureKind {
  Options,
}

export interface ThemeLeptonXFeature<KindT extends ThemeLeptonXFeatureKind> {
  ɵkind: KindT;
  ɵproviders: (Provider | EnvironmentProviders)[];
}

function makeThemeLeptonXFeature<KindT extends ThemeLeptonXFeatureKind>(
  kind: KindT,
  providers: (Provider | EnvironmentProviders)[],
): ThemeLeptonXFeature<KindT> {
  return {
    ɵkind: kind,
    ɵproviders: providers,
  };
}

export function withThemeLeptonXOptions(
  options = {} as ThemeLeptonXModuleOptions,
): ThemeLeptonXFeature<ThemeLeptonXFeatureKind.Options> {
  const optionsWithStyles = {
    ...options,
    styleFactory: (styles: LpxStyles) => {
      styles.push({
        bundleName: 'abp-bundle',
      });
      if (options?.styleFactory) {
        return options.styleFactory(styles);
      }
      return styles;
    },
  };

  return makeThemeLeptonXFeature(ThemeLeptonXFeatureKind.Options, [
    provideLpxLite(withLiteOptions(optionsWithStyles)),
  ]);
}

export function provideValidationError(): EnvironmentProviders {
  const providers = [
    {
      provide: VALIDATION_ERROR_TEMPLATE,
      useValue: ValidationErrorComponent,
    },
    {
      provide: VALIDATION_TARGET_SELECTOR,
      useValue: '.form-group',
    },
    {
      provide: VALIDATION_INVALID_CLASSES,
      useValue: 'is-invalid',
    },
  ];
  return makeEnvironmentProviders(providers);
}

export function provideThemeLeptonX(
  ...features: ThemeLeptonXFeature<ThemeLeptonXFeatureKind>[]
): EnvironmentProviders {
  const providers: (Provider | EnvironmentProviders)[] = [
    LPX_USER_PROVIDER,
    LPX_LANGUAGE_PROVIDER,
    LPX_TRANSLATE_PROVIDER,
    LEPTON_X_USER_MENU_PROVIDERS,
    INIT_SERVICE_PROVIDER,
    provideLpxLite(),
    provideValidationError(),
    provideLeptonXAbpCore(),
  ];

  features.forEach(({ ɵproviders }) => providers.push(...ɵproviders));

  return makeEnvironmentProviders(providers);
}
