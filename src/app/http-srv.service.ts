import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productstore } from './model/productstore.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpSrvService {

  constructor(private http:HttpClient) { }

  get(url:string){
    return this.http.get(url);
  }

  getTodos():Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/todos');
  }

  getStoreProducts():Observable<Productstore[]>{
    return this.http.get<Productstore[]>('https://course-api.com/react-store-products')
    .pipe(
      map((response)=>{
        //console.log(response.filter(v => v.company === "ikea"));
        return response.filter(v => v.company === "ikea");
      })
    );
  }
}
