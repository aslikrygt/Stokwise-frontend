import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminProductManagementComponent } from './admin-product-management/admin-product-management.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminEditProductComponent } from './admin-edit-product/admin-edit-product.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { AdminShelfManagementComponent } from './admin-shelf-management/admin-shelf-management.component';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';


@NgModule({
  declarations: [
    AdminProductManagementComponent,
    AdminEditProductComponent,
    AdminAddProductComponent,
    AdminShelfManagementComponent,
    AdminUserManagementComponent,
    AdminAddUserComponent,
    AdminEditUserComponent,
    AdminAccountComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule, 
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }