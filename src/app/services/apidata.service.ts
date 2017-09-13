import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';


@Injectable()
export class ApiDataService {


    baseUrl:string = "http://api.github.com/";
    currentData:any;

  constructor(private http:Http) { }


  make_query_param(query){
    return "?q="+query;
  }

  getAllRepositoryForTechnology(resr:string, query?:string){
    let resource =""
    if(query){
      resource = this.baseUrl + resr + this.make_query_param(query);
    }else{
      resource = this.baseUrl + resr;
    }
      return this.http.get(resource)
        .map((res) => res.json())
        .catch(this.handleError)
  }

  

  getLocalJsonData(dataName:string){    
    let resource = "assets/"+dataName+".json"
    console.log(resource);
      return this.http.get(resource)
        .map((res) => res.json())
        .catch(this.handleError)
  }

  private handleError(error:Response){
      console.log(error);
      if(error.status === 0 ){
        return Observable.throw("Some technical error");
      }
        return Observable.throw(error || "Server error");
  }
    
  set CurrentData(data: any){      
      console.log("Setting currentData to "+ JSON.stringify(data));
      this.currentData = data
  }

  get CurrentData(){
      console.log("cur data"+JSON.stringify(this.currentData));
      if(this.currentData){
        return this.currentData
      }
      else{
          console.log("No currentData");
      }

  }

}