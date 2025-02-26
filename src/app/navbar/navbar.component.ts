import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, AmplifyAuthenticatorModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
