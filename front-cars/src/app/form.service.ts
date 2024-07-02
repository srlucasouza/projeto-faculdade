import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = 'http://localhost:3000/forms';

  constructor(private http: HttpClient) { }

  getAllForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.apiUrl);
  }

  saveForm(form: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, form);
  }

  getForm(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateForm(id: string, form: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, form);
  }

  deleteForm(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
