import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxPaginationModule } from "ngx-pagination";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { ReactiveFormsModule } from '@angular/forms';

import { registerLocaleData } from "@angular/common";
import ptBr from "@angular/common/locales/pt";
registerLocaleData(ptBr);

import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { PostCardComponent } from "./components/post-card/post-card.component";
import { DestaqueCardComponent } from "./components/destaque-card/destaque-card.component";
import { ReviewCardComponent } from "./components/review-card/review-card.component";
import { HomeComponent } from "./pages/home/home.component";
import { ReviewNewsComponent } from "./components/review-news/review-news.component";
import { DestaqueNewsComponent } from "./components/destaque-news/destaque-news.component";
import { DestaqueBignewsComponent } from "./components/destaque-bignews/destaque-bignews.component";
import { PostagemComponent } from "./pages/postagem/postagem.component";
import { PostagemCardComponent } from "./components/postagem-card/postagem-card.component";
import { PostagemContentComponent } from "./components/postagem-content/postagem-content.component";
import { TagsCardComponent } from "./components/tags-card/tags-card.component";
import { TagsComponent } from "./pages/tags/tags.component";
import { SearchComponent } from "./pages/search/search.component";
import { CreateCardComponent } from "./pages/create-card/create-card.component";
import { CreateFormComponent } from "./components/create-form/create-form.component";
import { BannerComponent } from "./components/banner/banner.component";
import { DropdownCategoriasComponent } from "./components/dropdown-categorias/dropdown-categorias.component";
import { PostlistComponent } from "./components/postlist/postlist.component";
import { Error404CardComponent } from "./pages/error404-card/error404-card.component";
import { Error404ContentComponent } from "./components/error404-content/error404-content.component";
import { ComentarioCardComponent } from "./components/comentario-card/comentario-card.component";
import { ComentarioContentComponent } from "./components/comentario-content/comentario-content.component";
import { ComentarioFormComponent } from "./components/comentario-form/comentario-form.component";
import { SeletorUsuarioComponent } from './components/seletor-usuario/seletor-usuario.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SignUpFormComponent } from './pages/sign-up-form/sign-up-form.component';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from "src/environments/environment";
import { FirebaseService } from './services/firebase.service';
import { AngularFireStorageModule } from '@angular/fire/storage'

//State Management
import { StoreModule } from "@ngrx/store";
import { AuthReducer } from './store/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppSpinnerComponent } from './components/app-spinner/app-spinner.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileContentComponent } from './components/profile-content/profile-content.component'
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PostCardComponent,
    DestaqueCardComponent,
    ReviewCardComponent,
    HomeComponent,
    ReviewNewsComponent,
    DestaqueNewsComponent,
    DestaqueBignewsComponent,
    PostagemComponent,
    PostagemCardComponent,
    PostagemContentComponent,
    TagsCardComponent,
    TagsComponent,
    SearchComponent,
    CreateCardComponent,
    CreateFormComponent,
    BannerComponent,
    DropdownCategoriasComponent,
    PostlistComponent,
    Error404CardComponent,
    Error404ContentComponent,
    ComentarioCardComponent,
    ComentarioContentComponent,
    ComentarioFormComponent,
    SeletorUsuarioComponent,
    ConfirmDialogComponent,
    AuthComponent,
    SignUpFormComponent,
    AppSpinnerComponent,
    ProfileComponent,
    ProfileContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    AngularEditorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      AuthState: AuthReducer
    }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) : []
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt" },
    { provide: NgForm, useValue: "ngForm" },
    FirebaseService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
