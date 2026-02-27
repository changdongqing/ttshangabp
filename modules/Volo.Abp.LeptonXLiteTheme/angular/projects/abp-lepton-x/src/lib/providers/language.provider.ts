import { inject, provideAppInitializer } from '@angular/core';
import { AbpLanguageService } from '../services/language.service';

export const LPX_LANGUAGE_PROVIDER = provideAppInitializer(() => {
  const languageService = inject(AbpLanguageService);
  languageService.subscribeLanguage();
});
