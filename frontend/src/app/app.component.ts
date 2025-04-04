import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
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
  styles: ``
})
export class AppComponent {
  title = 'frontend';
}
