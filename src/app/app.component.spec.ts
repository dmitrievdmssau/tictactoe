import {AuthService} from './services/auth.service';
import {TestBed} from '@angular/core/testing';
import {SignUpModel} from './models/sign-up.model';
import {SignInModel} from './models/sign-in.model';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear(); // Очищаем localStorage перед каждым тестом
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign up a new user', () => {
    const signUpData: SignUpModel = {
      username: 'testUser',
      email: 'test@example.com',
      phone: '1234567890',
      password: 'password123',
      repeatPassword: 'password123'
    };

    const user = service.signUp(signUpData);
    expect(user).toBeTruthy();
    expect(user.username).toBe('testUser');
  });

  it('should not sign up with an existing username', () => {
    const signUpData: SignUpModel = {
      username: 'testUser',
      email: 'test@example.com',
      phone: '1234567890',
      password: 'password123',
      repeatPassword: 'password123'
    };

    service.signUp(signUpData);
    expect(() => service.signUp(signUpData)).toThrowError('Username already exists');
  });

  it('should not sign up if passwords do not match', () => {
    const signUpData: SignUpModel = {
      username: 'testUser',
      email: 'test@example.com',
      phone: '1234567890',
      password: 'password123',
      repeatPassword: 'password456'
    };
    expect(() => service.signUp(signUpData)).toThrowError('Passwords not match');
  });

  it('should sign in a user with correct credentials', () => {
    const signUpData: SignUpModel = {
      username: 'testUser',
      email: 'test@example.com',
      phone: '1234567890',
      password: 'password123',
      repeatPassword: 'password123'
    };
    service.signUp(signUpData);

    const signInData: SignInModel = {
      username: 'testUser',
      password: 'password123'
    };

    expect(service.signIn(signInData)).toBeTrue();
  });

  it('should not sign in with incorrect password', () => {
    const signUpData: SignUpModel = {
      username: 'testUser',
      email: 'test@example.com',
      phone: '1234567890',
      password: 'password123',
      repeatPassword: 'password123'
    };
    service.signUp(signUpData);

    const signInData: SignInModel = {
      username: 'testUser',
      password: 'wrongPassword'
    };

    expect(() => service.signIn(signInData)).toThrowError('Wrong Password');
  });

  it('should correctly check if user is logged in', () => {
    expect(service.isLoggedIn).toBeFalse();

    const signUpData: SignUpModel = {
      username: 'testUser',
      email: 'test@example.com',
      phone: '1234567890',
      password: 'password123',
      repeatPassword: 'password123'
    };
    service.signUp(signUpData);

    const signInData: SignInModel = {
      username: 'testUser',
      password: 'password123'
    };
    service.signIn(signInData);

    expect(service.isLoggedIn).toBeTrue();
  });
});
