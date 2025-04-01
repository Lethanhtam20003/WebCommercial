import {Routes} from '@angular/router';
import {LoginComponent} from './components/login.components';
import {Label} from './constant/label';

const label: Label=new Label();

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: label.logIn,
  },
];
