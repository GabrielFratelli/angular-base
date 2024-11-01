import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../input/input.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthAccountService } from '../../services/auth-account.service';

interface LoginForm {
  email: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, ButtonComponent, CommonModule, ModalComponent, ReactiveFormsModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>
  @Output("submit") onSubmit = new EventEmitter()
  @Output("navigate") onNavigate = new EventEmitter()

  constructor(
    private authAccount: AuthAccountService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  getHandleSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authAccount.login(email, password).subscribe((response) => {
        if (response.length > 0) {
          this.router.navigate(['/dashboard']);
        } else {
          alert('Email ou senha inválidos');
        }
      });
    }
  }
}
