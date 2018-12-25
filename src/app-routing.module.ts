import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from "@angular/router";

const appRoutes: Routes = [
    { path: 'crisis-center', component: CrisisListComponent },
    { path: 'heroes',        component: HeroListComponent },
    { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
