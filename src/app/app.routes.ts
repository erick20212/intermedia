import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlancarreraComponent } from './plancarrera/plancarrera.component';
import { PlanComponent } from './plan/plan.component';
import { CarreraComponent } from './carrera/carrera.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        title:'home'
    },
    {
        path:'plan',
        component:PlanComponent,
        title:'plan'
    },
    {
        path:'carrera',
        component:CarreraComponent,
        title:'carrera'
    },
    {
        path:'plancarrera',
        component:PlancarreraComponent,
        title:'plancarrera'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }
];
