import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { eLayoutType } from '@abp/ng.core';

@Component({
  selector: 'abp-layout-empty',
  imports: [RouterModule],
  template: ` <router-outlet></router-outlet> `,
})
export class EmptyLayoutComponent {
  static type = eLayoutType.empty;
}
