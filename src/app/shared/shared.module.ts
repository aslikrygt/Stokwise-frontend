import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserListComponent } from './components/user-list/user-list.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductListComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    ProductCardComponent,
    ProductListComponent,
    UserListComponent
  ]
})
export class SharedModule { }
