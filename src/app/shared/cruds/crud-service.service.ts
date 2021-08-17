import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {
  private serverURL = 'http://localhost:8080/';
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})



  constructor(private http: HttpClient) { }

  public getModelWA(path): Observable<any> {
    return this.http.get<any>(`${this.serverURL}${path}`, {});
  }

  public createModel(path, model): Observable<any> {
    return this.http.post<any>(`${this.serverURL}${path}`, model);
  }
  
  public createParam(path): Observable<any> {
    return this.http.post<any>(`${this.serverURL}${path}`, {headers:this.httpHeaders});
  }


  public putModel(path, model): Observable<any> {
    return this.http.put<any>(`${this.serverURL}${path}`, model, {headers:this.httpHeaders});
  }

 
  public getModel(path): Observable<any> {
    
    return this.http.get<any>(`${this.serverURL}${path}`,{headers:this.httpHeaders});
  }

 

  public deleteModel(path): Observable<any> {
    return this.http.delete<any>(`${this.serverURL}${path}`,{headers:this.httpHeaders});
  }

  

 

}
