import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  password: string = '';
  passwordVisible: boolean = false;
  @Output() passwordEntered = new EventEmitter<string>();

  submitPassword(): void {
    this.passwordEntered.emit(this.password);
    this.password = '';
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
