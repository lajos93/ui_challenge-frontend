import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  error:string = null;
  data;

  constructor(private authService:AuthService) {
    //get all users request
    this.authService.getAllUsers().subscribe(
      res=>{},
      error=>{this.error = error}
      );
    //Get the users from the local users "Subject"
    this.authService.users.subscribe(
      res=>{
        this.data = res;
      },
      error=>{this.error = error}
    );   

  }

  ngOnInit(): void {

  }

  deleteUser(userEmail){
    if(confirm("Are you sure you want to delete the user with the following email: "+userEmail)) {
      this.authService.deletUserByEmail(userEmail).subscribe(
        res=>{
          for (let i = 0; i < this.data.length; i++) {      
            if (this.data[i].email == userEmail) {
                console.log(this.data[i].email)
                this.data.splice(i, 1);
            }
          }
        },
        error=>{this.error = error}
        );
    }
  }
  

}
