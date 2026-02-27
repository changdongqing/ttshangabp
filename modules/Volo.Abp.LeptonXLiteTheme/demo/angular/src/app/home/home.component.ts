import { LocalizationPipe } from "@abp/ng.core";
import { AuthService } from "@abp/ng.core";
import { NgTemplateOutlet } from "@angular/common";
import { Component, inject } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  imports: [LocalizationPipe, NgTemplateOutlet],
})
export class HomeComponent {
  private oAuthService = inject(OAuthService);
  private authService = inject(AuthService);

  get hasLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  login() {
    this.authService.navigateToLogin();
  }
}
