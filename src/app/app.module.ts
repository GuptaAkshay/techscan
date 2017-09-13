import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from "ngx-pagination";

import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AppComponent } from './app.component';
import { TechListComponent } from "./technologyList/technologyList.component";
import { ApiDataService } from "./services/apidata.service";

import { RepoListComponent } from './repo-list/repo-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    TechListComponent,
    RepoListComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    AppRoutingModule
  ],
  providers: [ApiDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
