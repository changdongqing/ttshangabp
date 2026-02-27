import { Component } from '@angular/core';
import { eThemeLeptonXComponents } from '@abp/ng.theme.lepton-x';
import { ReplaceableTemplateDirective } from '@abp/ng.core';
import { LanguageSelectionComponent as LanguageSelectionComponent_1 } from '@volo/ngx-lepton-x.lite';

@Component({
  selector: 'abp-language-selection',
  templateUrl: './language-selection.component.html',
  imports: [ReplaceableTemplateDirective, LanguageSelectionComponent_1],
})
export class LanguageSelectionComponent {
  languageSelectionKey = eThemeLeptonXComponents.Languages;
}
