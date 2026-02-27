import { Component } from '@angular/core';
import { eThemeLeptonXComponents } from '@abp/ng.theme.lepton-x';
import { ReplaceableTemplateDirective } from '@abp/ng.core';
import { UserProfileComponent as UserProfileComponent_1 } from '@volo/ngx-lepton-x.lite';

@Component({
  selector: 'abp-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [ReplaceableTemplateDirective, UserProfileComponent_1],
})
export class UserProfileComponent {
  key = eThemeLeptonXComponents.CurrentUser;
}
