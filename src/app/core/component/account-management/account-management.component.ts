import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../../shared/dto/role';
import { UserService } from '../../../shared/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { RoleService } from '../../../shared/service/role.service';
import { User } from '../../../shared/dto/user';
import { LoginService } from '../../service/login.service';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.scss'
})
export class AccountManagementComponent implements  OnInit {
    updateForm = this.fb.nonNullable.group({
    email: "",
    oldPassword: "",
    newPassword: "",
    checkPassword: "",
    // roles: {value:this.loginService.roles}
    
  })


  userID = "";
  // roles: Role[]= []; 
  selectedRoles: string [] = [];


  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private roleService: RoleService,
    private loginService: LoginService,
    private accountService: AccountService   
      
    
  ) { }

  ngOnInit(): void {
       
        
    this.loadCurrentUser();

    if(this.userService.editingUser != null){
      this.userID = this.userService.editingUser.id;
      this.updateForm.patchValue({
        email : this.userService.editingUser.email,
        oldPassword : this.userService.editingUser.password
      });
    } else{}
  }

  loadCurrentUser() {
    
    if (this.loginService.loggedIn) {
      this.userID = this.loginService.email;
      this.selectedRoles=this.loginService.roles,
      this.updateForm.patchValue({
        email: this.loginService.email, 
        
        
        oldPassword: '' 
        
      });
    
    } else {
      console.log("Kullanıcı giriş yapmamış.");
    }
  }



   submit() {
    let oldPassword = this.updateForm.get('oldPassword')!.value;
    let newPassword = this.updateForm.get('newPassword')!.value;
    this.accountService.changePassword({oldPassword, newPassword }).subscribe({
      next: (sonuc) => {
        console.log(sonuc);
        this.toastr.info("Şifre değiştirilmiştir.");
        this.router.navigate(['/homepage/products'], { relativeTo: this.route });
      }
    });
  }


  

  cancel() {
    this.router.navigate(['/homepage/products']);
  }


pswCannotBeEmpty():boolean{
  return this.updateForm.value.oldPassword! === '' ;
}
confirmPswCannotBeEmpty():boolean{
  return this.updateForm.value.checkPassword! === '' ;
}

}
