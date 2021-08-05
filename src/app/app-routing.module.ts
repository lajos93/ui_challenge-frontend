import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ArticlesComponent } from './pages/articles/articles.component';
import { CreateNewArticleComponent } from './pages/articles/create-new-article/create-new-article.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', component: UserComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'create-new', component: CreateNewArticleComponent,canActivate: [AuthGuard] },
  { path: 'edit-article', component: CreateNewArticleComponent,canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
