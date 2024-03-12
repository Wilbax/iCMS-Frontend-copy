import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';
import {AuthRoutingModule} from "./auth-routing.module";
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    FormsModule
  ]
})
export class AuthModule { }