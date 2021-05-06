import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Pages
import { HomeComponent } from "./pages/home/home.component";
import { PostagemComponent } from "./pages/postagem/postagem.component";
import { TagsComponent } from "./pages/tags/tags.component";
import { SearchComponent } from "./pages/search/search.component";
import { CreateCardComponent } from "./pages/create-card/create-card.component";
import { Error404CardComponent } from "./pages/error404-card/error404-card.component";
import { AuthComponent } from "./pages/auth/auth.component";
import { SignUpFormComponent } from './pages/sign-up-form/sign-up-form.component'

//Guards
import { AdminGuard } from "./guards/admin.guard";
import { LoggedGuard } from "./guards/logged.guard";
import { OwnerGuard } from "./guards/owner.guard";
import { DisconnectedGuard } from "./guards/disconnected.guard";
import { ProfileComponent } from "./pages/profile/profile.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "post/:id",
    component: PostagemComponent,
    runGuardsAndResolvers: "always",
  },
  {
    path: "tags",
    component: TagsComponent,
  },
  {
    path: "busca/:type",
    component: SearchComponent,
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
  },
  {
    path: "postar",
    component: CreateCardComponent,
    canActivate: [AdminGuard, LoggedGuard]
  },
  {
    path: "editar/:id",
    component: CreateCardComponent,
    canActivate: [OwnerGuard, AdminGuard, LoggedGuard]
  },
  {
    path: "auth",
    component: AuthComponent,
    canActivate: [DisconnectedGuard]
  },
  {
    path: "sign-up",
    component: SignUpFormComponent,
    canActivate: [DisconnectedGuard]
  },
  {
    path: "adm-sign-up",
    component: SignUpFormComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "me",
    component: ProfileComponent
  },
  {
    path: "profile/:id",
    component: ProfileComponent
  },
  {
    path: "**",
    component: Error404CardComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "top",
      onSameUrlNavigation: "reload",
      relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
