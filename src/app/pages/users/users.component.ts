import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
data;
  constructor(private authService:AuthService) { 
/*     this.data = [
      {"id": 30,
      "username": "lajos93",
      "email": "lajos93@gmail.com",
      "bio": "this si me"},
      {"id": 22,
      "username": "lajos3",
      "email": "lajos93@gmail.com",
      "bio": "this si me"}
     ]; */
  }

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe(res=>{
      this.data = res;
      console.log(res)
    })
  }

}
