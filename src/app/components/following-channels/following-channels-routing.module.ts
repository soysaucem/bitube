import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../../guards/login.guard';
import { FollowingChannelsComponent } from './following-channels.component';

const routes: Routes = [
  {
    path: '',
    component: FollowingChannelsComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowingChannelsRoutingModule {}
