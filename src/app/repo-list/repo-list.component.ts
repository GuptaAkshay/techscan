import { Component, OnInit, NgZone } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


import { ApiDataService } from "../services/apidata.service";

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent {

  language_list = ["javascript", "java", "python", "ruby", "php", "go" ];
  searchedData:any[]; 
  repo_count:string;
  queryParam:string;
  key: string;
  pagetitle:string

  constructor( private route: ActivatedRoute,
        private router: Router,
        private apidata: ApiDataService, 
        private zone:NgZone ) {
          this.pagetitle = "Repositories"
         }

  ngOnInit() {

    this.queryParam = this.route.snapshot.params['lang'];    
    this.key = this.queryParam;
    this.getData();    
  }
  getData(){
    this.searchedData = [];
    if(this.language_list.indexOf(this.key) > -1 ){
      let key = this.key.replace(/\b\w/g, l => l.toUpperCase())
      let data = JSON.parse(localStorage.getItem(key)).value;
      this.repo_count = data.total_count;
      this.searchedData = data.items;
  
      console.log(this.key);
    }
    else{
      let resource = "search/repositories";    
      let qry = "language:" + this.key + "&page=1&per_page=100";
      this.apidata.getAllRepositoryForTechnology(resource, qry).subscribe(
      //this.apidata.getLocalJsonData(this.key).subscribe(
        res =>{        
          this.zone.run(() => {                                   
                    this.repo_count =res.total_count     
                    this.searchedData=res.items;                   
                    this.key = this.queryParam;               
                    //console.log(this.searchedData)
          })         
        },
        err =>{
          let code = err.status;
          let statusText = err.statusText;

          console.log(code+","+statusText);
        }
      );
    }
    // this.key = this.key.replace(/\b\w/g, l => l.toUpperCase())
    // let data = JSON.parse(localStorage.getItem(this.key)).value;
    // this.repo_count = data.total_count;
    // this.searchedData = data.items;

    // console.log(this.searchedData);
  }
  
  getSearchData(){
    this.queryParam = this.key;
    this.getData();
    this.router.navigate(['/repo', this.key]);
  }
  
}

