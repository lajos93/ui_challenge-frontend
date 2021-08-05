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
import { RemoveButtonFocusDirective } from './shared/removeButtonFocus/remove-button-focus.directive';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component';
import { EditDataComponent } from './pages/user/user-detail/edit-data/edit-data.component';
import { BasicInfoComponent } from './pages/user/user-detail/basic-info/basic-info.component';
import { PictureComponent } from './pages/user/user-detail/picture/picture.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleCardComponent } from './pages/articles/article-card/article-card.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { UsersComponent } from './pages/users/users.component';
import { CreateNewArticleComponent } from './pages/articles/create-new-article/create-new-article.component';
import { ArticleCardSidebarComponent } from './pages/articles/article-card-sidebar/article-card-sidebar.component';
import { SidebarTagsComponent } from './pages/articles/create-new-article/sidebar/sidebar-tags/sidebar-tags.component';
import { SidebarImageComponent } from './pages/articles/create-new-article/sidebar/sidebar-image/sidebar-image.component';
import { ArticleItemComponent } from './pages/articles/article-item/article-item.component';


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
    UserDetailComponent,
    EditDataComponent,
    BasicInfoComponent,
    PictureComponent,
    ArticlesComponent,
    ArticleCardComponent,
    RemoveButtonFocusDirective,
    UsersComponent,
    CreateNewArticleComponent,
    SidebarTagsComponent,
    SidebarImageComponent,
    ArticleCardSidebarComponent,
    ArticleItemComponent
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
