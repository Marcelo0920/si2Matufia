// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-content">
        <div class="login-header">
          <div class="logo-container">
            <div class="logo">
              <span class="logo-icon">🔐</span>
            </div>
            <h1>Bienvenido</h1>
            <p>Ingresa a tu cuenta para continuar</p>
          </div>
        </div>

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="login-form">
          <div class="form-group">
            <label for="username">Usuario</label>
            <div class="input-container">
              <span class="input-icon">👤</span>
              <input
                id="username"
                type="text"
                [(ngModel)]="username"
                name="username"
                placeholder="Ingresa tu usuario"
                required
                [class.invalid]="
                  loginForm.submitted && loginForm.form.get('username')?.invalid
                "
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <div class="input-container">
              <span class="input-icon">🔒</span>
              <input
                id="password"
                type="password"
                [(ngModel)]="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                required
                [class.invalid]="
                  loginForm.submitted && loginForm.form.get('password')?.invalid
                "
              />
            </div>
          </div>

          <button
            type="submit"
            [disabled]="loginForm.form.invalid"
            class="login-button"
          >
            Iniciar Sesión
          </button>

          <div class="form-footer">
            <p>Usuario de prueba: admin</p>
            <p>Contraseña de prueba: admin</p>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        padding: 20px;
      }

      .login-content {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 2.5rem;
        width: 100%;
        max-width: 400px;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        border: 1px solid rgba(255, 255, 255, 0.18);
      }

      .login-header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .logo-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .logo {
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
      }

      .logo-icon {
        font-size: 2.5rem;
      }

      h1 {
        color: white;
        font-size: 2rem;
        margin: 0;
        font-weight: 600;
      }

      p {
        color: rgba(255, 255, 255, 0.8);
        margin: 0.5rem 0;
      }

      .login-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      label {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.9rem;
        font-weight: 500;
      }

      .input-container {
        position: relative;
        display: flex;
        align-items: center;
      }

      .input-icon {
        position: absolute;
        left: 1rem;
        font-size: 1.2rem;
      }

      input {
        width: 100%;
        padding: 0.8rem;
        padding-left: 3rem;
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        color: white;
        font-size: 1rem;
        transition: all 0.3s ease;
      }

      input::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }

      input:focus {
        outline: none;
        border-color: rgba(255, 255, 255, 0.5);
        background: rgba(255, 255, 255, 0.2);
      }

      input.invalid {
        border-color: #ff4444;
      }

      .login-button {
        background: linear-gradient(45deg, #4e54c8, #8f94fb);
        color: white;
        border: none;
        padding: 1rem;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .login-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      }

      .login-button:disabled {
        background: rgba(255, 255, 255, 0.1);
        cursor: not-allowed;
      }

      .form-footer {
        text-align: center;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .form-footer p {
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.8rem;
      }

      @media (max-width: 480px) {
        .login-content {
          padding: 1.5rem;
        }

        h1 {
          font-size: 1.5rem;
        }

        .logo {
          width: 60px;
          height: 60px;
        }

        .logo-icon {
          font-size: 2rem;
        }
      }
    `,
  ],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Credenciales inválidas');
    }
  }
}
