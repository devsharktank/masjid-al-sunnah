import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { HttpModule} from '@angular/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class PrayerDataProvider {
  data:string;
  url : string = 'https://sunnah.salahtimer.website/mobileapi.php';

  constructor(public http: Http) {
    console.log('Hello PrayerDataProvider Provider');
  }

  getRemoteData(){
    //return this.http.get(this.url).map(res => res.json()).subscribe(data =>{
    return this.http.get(this.url)
    
    .map((res:Response) => res.json())
    .do(this.logResponse)
    .catch(this.catchError)
   
  }
  private catchError(error: Response | any){
    console.log(error);
    return Observable.throw(error.json().error ||"Server error");

  }
  private logResponse(res:Response){

    console.log(res);
  }

  private extractData(res: Response){
    return res.json();

  }
}
