import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechListComponent } from '../technologyList/technologyList.component'
import { RepoListComponent } from "../repo-list/repo-list.component";
import { UserProfileComponent } from "../user-profile/user-profile.component";

const routes: Routes = [
    
    { path: '', redirectTo: '/technologies', pathMatch: 'full' },
    { path: 'technologies',  component: TechListComponent },
    { path: 'repo/:lang', component: RepoListComponent, data:[] },
    { path: 'users/:user',     component: UserProfileComponent }
    
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }