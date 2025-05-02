import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LabelConstants } from './core/constants/label.constants';
import { RouteLink } from './core/constants/route-link';

/**
 * Định nghĩa các route cho module Auth
 */
const authRoutes: Routes = [
  {
    path: RouteLink.loginRoute,
    loadComponent: () => import('./features/auth/login/login.component')
      .then(m => m.LoginComponent),
    title: LabelConstants.logInPage,
    data: {
      showHeader: false,
      showFooter: false
    }
  },
  {
    path: RouteLink.registerRoute,
    loadComponent: () => import('./features/auth/register/register.component')
      .then(m => m.RegisterComponent),
    title: LabelConstants.registerPage,
    data: {
      showHeader: false,
      showFooter: false
    }
  },
  {
    path: RouteLink.oauth2RedirectRoute,
    loadComponent: () => import('./shared/components/redirect/oauth2_redirect.component')
      .then(m => m.Oauth2RedirectComponent),
    title: LabelConstants.ProcessingLogin,
    data: {
      showHeader: false,
      showFooter: false
    }
  }
];

/**
 * Định nghĩa các route được bảo vệ (yêu cầu đăng nhập)
 */
const protectedRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./shared/components/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    title: 'Dashboard',
    // canActivate: [AuthGuard],
    data: {
      showHeader: true,
      showFooter: true,
      breadcrumb: 'Dashboard'
    }
  }
];

/**
 * Routes chính của ứng dụng
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  ...authRoutes,
  ...protectedRoutes,
  {
    path: '**',
    loadComponent: () => import('./shared/components/error/not-found/not-found.component')
      .then(m => m.NotFoundComponent),
    title: 'Page Not Found',
    data: {
      showHeader: true,
      showFooter: true
    }
  }
];
