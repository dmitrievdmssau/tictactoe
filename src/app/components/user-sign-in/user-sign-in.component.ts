import {Component, OnInit} from '@angular/core';
import {Ripple} from 'primeng/ripple';
import {ButtonDirective} from 'primeng/button';
import {Checkbox} from 'primeng/checkbox';
import {InputText} from 'primeng/inputtext';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {SignInModel} from '../../models/sign-in.model';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-user-sign-in',
  imports: [
    Ripple,
    ButtonDirective,
    Checkbox,
    InputText,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './user-sign-in.component.html',
  styleUrl: './user-sign-in.component.scss',
  standalone: true
})
export class UserSignInComponent implements OnInit {

  protected form: FormGroup<{
    username: FormControl<string>,
    password: FormControl<string>,
  }>;

  constructor(
              private _authService: AuthService,
              private _fb: FormBuilder,
              private _router: Router,
              private _messageService: MessageService,
              ) {
  }

  ngOnInit() {
    this.form = this._fb.group({
      username: this._fb.control('', [Validators.required]),
      password: this._fb.control('', [Validators.required])
    });
  }

  protected signIn($event: MouseEvent) {
    $event.stopPropagation();
   const signInModel = this.form.value as SignInModel;
   try {
   this._authService.signIn(signInModel);
   this._router.navigate(['cabinet']).then();
   } catch (e: any) {
     this._messageService.add({severity: 'error', summary: 'Не вошёл', detail: e.message})
   }
  }
}
