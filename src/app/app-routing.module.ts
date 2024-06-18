import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './Components/Layouts/list/list.component';
import { TaskListComponent } from './Components/Layouts/task-list/task-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/taskList', pathMatch: 'full',data: { showHeader: true } }, // Redirect to projectsHome by default
  { path: 'taskList', component: TaskListComponent, data: { showHeader: true } },
  { path: 'list', component: ListComponent, data: { showHeader: true } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
