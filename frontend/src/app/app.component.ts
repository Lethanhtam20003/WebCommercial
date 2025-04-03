import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { SocialLoginModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SocialLoginModule],
  standalone: true,
  template:`
   <app-header></app-header>
   <router-outlet></router-outlet>
   <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
}
