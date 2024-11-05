import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { UserFormComponent } from './user-form/user-form.component';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FlexModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TranslateModule} from "@ngx-translate/core";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    UserFormComponent
  ],
    imports: [
        BrowserModule,
        ButtonModule,
        DropdownModule,
        FlexModule,
        FormsModule,
        ReactiveFormsModule,
        RippleModule,
        SharedModule,
        TranslateModule,
        InputTextModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
