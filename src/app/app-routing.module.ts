import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'device-details', pathMatch: 'full' },
  { path: 'device-details', loadChildren: () => import('./device-details/device-details.module').then(m => m.DeviceDetailsPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
