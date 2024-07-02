import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  authenticate(password: string): Observable<boolean> {
    const isAuthenticated = password === 'Carro@20248';
    this.isAuthenticatedSubject.next(isAuthenticated);
    return this.isAuthenticatedSubject.asObservable();
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
