import { Component, OnInit, NgZone } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


import { ApiDataService } from "../services/apidata.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  pagetitle:string;
  user:any;
  repos:any[];
  queryParam:string;
  resource:string = "users/";

  constructor(private route: ActivatedRoute,
        private router: Router,
        private apidata: ApiDataService,
        private zone:NgZone) { 
          this.pagetitle = "Profile";
          console.log(this.route.snapshot.params['user'] );
        }

  ngOnInit() {
    this.repos=[]
    this.user=new Object();
    this.queryParam = this.route.snapshot.params['user'];
    this.getUserData();
    this.getRepositoryData()
  }

  getUserData(){
        
    this.apidata.getAllRepositoryForTechnology(this.resource+this.queryParam)
    //this.apidata.getLocalJsonData(this.key)
      .subscribe((res) =>{
        this.zone.run(() => {                                   
                  this.user =res                       
                  console.log("User"+this.user)
        })         
      });
  }
    getRepositoryData(){
    this.resource += this.queryParam+"/repos"
    this.apidata.getAllRepositoryForTechnology(this.resource)
    //this.apidata.getLocalJsonData(this.key)
      .subscribe((res) =>{
        this.zone.run(() => {                                   
                  this.repos = res     
                  
                  console.log("Repos"+this.repos)
        })         
      });
  }

}
