import {Component, OnInit} from '@angular/core';
import {Ripple} from 'primeng/ripple';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {phoneNumberValidator} from '../../validators/phone.validator';
import {SignUpModel} from '../../models/sign-up.model';
import {confirmPasswordValidator} from '../../validators/confirm-password.validator';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-user-sign-up',
  imports: [Ripple, ButtonDirective, InputText, RouterLink, ReactiveFormsModule],
  templateUrl: './user-sign-up.component.html',
  standalone: true,
  styleUrl: './user-sign-up.component.css'
})
export class UserSignUpComponent implements OnInit {

  protected form: FormGroup<{
    username: FormControl<string>,
    email: FormControl<string>,
    phone: FormControl<string>,
    password: FormControl<string>,
    repeatPassword: FormControl<string>;
  }>;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _router: Router,
    private _messageService: MessageService) {
    this.form = this._fb.group({
      username: this._fb.control('', [Validators.required]),
      email: this._fb.control('', [Validators.required, Validators.email]),
      phone: this._fb.control('', [Validators.required, phoneNumberValidator()]),
      password: this._fb.control('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: this._fb.control('', [Validators.required, Validators.minLength(6), confirmPasswordValidator('password')])
    });
    this.form.valueChanges.subscribe(() => {
      this.form.setErrors(null);
    })
  }

  ngOnInit() {
  }

  protected signUp() {
    const signUpModel = this.form.value as SignUpModel;
    try {
      this._authService.signUp(signUpModel);
      this._messageService.add({
        severity: 'success',
        summary: "Регистрация завершена",
        detail: "Всё, ты на крючке у игромафии"
      });
      this._router.navigate(['/cabinet']).then();
    } catch (e: any) {
      this.form.setErrors({unregistered: true});
      this._messageService.add({
        severity: 'error',
        summary: "Что-то пошло не так!",
        detail: e.message,
      });
    }
  }
}
