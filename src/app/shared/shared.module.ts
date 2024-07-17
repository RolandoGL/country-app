import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { SeachBoxComponent } from './components/seach-box/seach-box.component';
import { CountryTableComponent } from './components/country-table/country-table.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    HomePageComponent,
    AboutPageComponent,
    SidebarComponent,
    ContactPageComponent,
    SeachBoxComponent,
    CountryTableComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    AboutPageComponent,
    HomePageComponent,
    SidebarComponent,
    SeachBoxComponent,
    CountryTableComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
