import {Injectable} from '@angular/core';
import {SignUpModel} from '../models/sign-up.model';
import {UserAboutModel} from '../models/user-about.model';
import {SignInModel} from '../models/sign-in.model';

import sha256 from 'crypto-js/sha256';
import {JWT_PRIVATE_KEY} from '../app.config';

import {decodeJwt, JWTPayload, jwtVerify, SignJWT} from 'jose';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly LOCALSTORAGE_JWT_TOKEN_KEY = "AUTHENTICATION_TOKEN";
  private readonly LOCALSTORAGE_DB_KEY = "DB_USERS";
  private readonly JWT_LIFETIME_SECONDS = 3600000;

  constructor() {
  }

  get isLoggedIn(): boolean {
    return !!this.currentJWTToken;
  }

  get current(): UserAboutModel {
    if (this.isLoggedIn) {
      const data = this.currentJWTToken;
      if (data) return JSON.parse(data.sub) as UserAboutModel; else return null;
    }
    return null;
  }

  private get freeDBId(): number {
    const db = this.connectDB();
    if (db.length === 0) {
      return 1;
    } else {
      return db.map(m => m.id).sort().pop() + 1;
    }
  }

  private get currentJWTToken(): JWTPayload {
    const token = localStorage.getItem(this.LOCALSTORAGE_JWT_TOKEN_KEY);
    if (token) {
      const data: JWTPayload = decodeJwt(token) as JWTPayload;
      if (jwtVerify(token, new TextEncoder().encode(JWT_PRIVATE_KEY)) && data.exp > Date.now()) {
        return data;
      } else {
        localStorage.removeItem(this.LOCALSTORAGE_JWT_TOKEN_KEY);
        return null;
      }
    }
    return null;
  }

  public signUp(signUpInfo: SignUpModel): UserAboutModel {
    if (this.isUsernameExisted(signUpInfo.username)) {
      throw new Error("Username already exists");
    }
    if (this.isPhoneExisted(signUpInfo.phone)) {
      throw new Error("Phone already exists");
    }
    if (this.isEmailExisted(signUpInfo.email)) {
      throw new Error("Email already exists");
    }
    if (signUpInfo.password !== signUpInfo.repeatPassword) {
      throw new Error("Passwords not match");
    }
    signUpInfo.password = sha256(signUpInfo.password).toString();
    signUpInfo.repeatPassword = null;
    return this.createUser(signUpInfo);
  }

  public signIn(signInInfo: SignInModel): boolean {
    const user = this.getUserByUsername(signInInfo.username);
    if (!user) {
      throw new Error("Username not exists");
    }
    const hashPassword = sha256(signInInfo.password).toString();

    if (user.password !== hashPassword) {
      throw new Error("Wrong Password");
    }
    this.createNewAuthSession(signInInfo);
    return true;
  }

  getUserByUsername(username: string): UserAboutModel {
    const db = this.connectDB();
    return db.find(f => f.username === username);
  }

  createNewAuthSession(signInInfo: SignInModel): void {
    new SignJWT().setProtectedHeader({ alg: 'HS256', typ: 'JWT' }).setExpirationTime(Date.now() + this.JWT_LIFETIME_SECONDS).setSubject(signInInfo.username).sign(new TextEncoder().encode(JWT_PRIVATE_KEY)).then((token) => {
      localStorage.setItem(this.LOCALSTORAGE_JWT_TOKEN_KEY, token.toString());
    });
  }

  private connectDB(): UserAboutModel[] {
    const db = localStorage.getItem(this.LOCALSTORAGE_DB_KEY);
    if (db) {
      return JSON.parse(db) as UserAboutModel[];
    } else {
      localStorage.setItem("DB_USERS", JSON.stringify([]));
      return [];
    }
  }

  private closeDB(data: UserAboutModel[]) {
    localStorage.setItem(this.LOCALSTORAGE_DB_KEY, JSON.stringify(data));
  }

  private isUsernameExisted(username: string): boolean {
    const users: UserAboutModel[] = this.connectDB();
    return users.some(m => m.username === username);
  }

  private isEmailExisted(email: string): boolean {
    const users: UserAboutModel[] = this.connectDB();
    return users.some(m => m.email === email);
  }

  private isPhoneExisted(phone: string): boolean {
    const users: UserAboutModel[] = this.connectDB();
    return users.some(m => m.phone === phone);
  }

  private createUser(userInfo: SignUpModel): UserAboutModel {
    const users = this.connectDB();
    const id = this.freeDBId;

    const newUser: UserAboutModel = {
      id, username: userInfo.username, email: userInfo.email, phone: userInfo.phone, password: userInfo.password,
    }
    users.push(newUser);
    this.closeDB(users);
    this.createNewAuthSession(newUser as SignInModel);
    return newUser;
  }
}
