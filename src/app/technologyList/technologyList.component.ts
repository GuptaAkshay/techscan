import { Component, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common'
import { Router } from '@angular/router';
import { ApiDataService } from "../services/apidata.service";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'tech-list',
  templateUrl: './technologyList.html',
  styleUrls: ['./technologyList.css']
})
export class TechListComponent {

    language_list = ["javascript", "java", "python", "ruby", "php", "csharp", "c++", "c", "html", "go" ];
    dataArr : any[];
    pagetitle:string
        
    constructor(private router: Router,
        private apidata: ApiDataService){
            this.pagetitle = "Technologies"
        }

    ngOnInit(){
        let resource = "search/repositories";
        this.dataArr = []; 
        this.language_list.forEach((element, index) => {
            let qry = "language:" + element;
            
            this.apidata.getAllRepositoryForTechnology(resource, qry)
                    .subscribe((res) =>{
                        let data = {
                            "name": element.replace(/\b\w/g, l => l.toUpperCase()),
                            "value":res,
                            "image": "assets/"+element+".png"
                        };
                        //localStorage.setItem(data.name, JSON.stringify(data))
                        this.dataArr.push(data);
                        //console.log("DATA=>"+this.dataArr);
            }); 
            
            // this.apidata.getLocalJsonData(element)
            //     .subscribe((res)=>{
                    
            //         let data = {
            //             "name": element.replace(/\b\w/g, l => l.toUpperCase()),
            //             "value":res,
            //             "image": "assets/"+element+".png"
            //         }
            //         console.log(data)
            //         this.dataArr.push(data);
            // });
            
        });

        
    }

    sendToRepos(item :any){
        //console.log(item);        
        let lang = item.name.replace(/\b\w/g, l => l.toLowerCase())
        this.router.navigate(['/repo', lang]);
    }
}
