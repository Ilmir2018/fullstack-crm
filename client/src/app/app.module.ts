import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './components/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { TokenInterceptor } from './classes/token.interceptor';
import { OverviewComponent } from './components/overview/overview.component';
import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CategoriesFormComponent } from './components/categories-page/categories-form/categories-form.component';
import { PositionFormComponent } from './components/categories-page/categories-form/position-form/position-form.component';
import { OrderCategoriesComponent } from './components/order-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from './components/order-page/order-positions/order-positions.component';
import { HistoryListComponent } from './components/history-page/history-list/history-list.component';
import { HistoryFilterComponent } from './components/history-page/history-filter/history-filter.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    OverviewComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent,
    LoaderComponent,
    CategoriesFormComponent,
    PositionFormComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    HistoryListComponent,
    HistoryFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
