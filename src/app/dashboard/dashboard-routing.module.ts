import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [{path:'', redirectTo:'home', pathMatch:'full'}, {
  path: 'home',
  component: HomeComponent,
},
{
  path: 'edit',
  component: EditComponent,
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
