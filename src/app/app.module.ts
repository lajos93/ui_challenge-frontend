import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './pages/user/user.component';
import { HeaderComponent } from './header/header.component';
import { DropDownDirective } from './shared/dropdown/drop-down.directive';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { CoverComponent } from './pages/home/cover/cover.component';
import { IconsComponent } from './pages/home/icons/icons.component';
import { CommentsComponent } from './pages/home/comments/comments.component';
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component';
import { EditDataComponent } from './pages/user/user-detail/edit-data/edit-data.component';
import { BasicInfoComponent } from './pages/user/user-detail/basic-info/basic-info.component';
import { PictureComponent } from './pages/user/user-detail/picture/picture.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleCardComponent } from './pages/articles/article-card/article-card.component';
import { ArticleCardFavComponent } from './pages/articles/article-card-fav/article-card-fav.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserComponent,
    HeaderComponent,
    DropDownDirective,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CoverComponent,
    IconsComponent,
    CommentsComponent,
    UserDetailComponent,
    EditDataComponent,
    BasicInfoComponent,
    PictureComponent,
    ArticlesComponent,
    ArticleCardComponent,
    ArticleCardFavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
