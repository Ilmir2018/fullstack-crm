import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './classes/auth.guard';
import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component';
import { CategoriesFormComponent } from './components/categories-page/categories-form/categories-form.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './components/layouts/site-layout/site-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { OrderCategoriesComponent } from './components/order-page/order-categories/order-categories.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { OrderPositionsComponent } from './components/order-page/order-positions/order-positions.component';
import { OverviewComponent } from './components/overview/overview.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'overview', component: OverviewComponent},
      {path: 'analytics', component: AnalyticsPageComponent},
      {path: 'history', component: HistoryPageComponent},
      {path: 'order', component: OrderPageComponent, children: [
        {path: '', component: OrderCategoriesComponent},
        {path: ':id', component: OrderPositionsComponent}
      ]},
      {path: 'categories', component: CategoriesPageComponent},
      {path: 'categories/new', component: CategoriesFormComponent},
      {path: 'categories/:id', component: CategoriesFormComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
