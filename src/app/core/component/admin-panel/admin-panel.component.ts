import { UserService } from './../../../shared/service/user.service';
import { ShelfService } from './../../../shared/service/shelf.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../service/login.service';
import { Product } from '../../../shared/dto/product';
import { ProductService } from '../../../shared/service/product.service';
import { Shelf } from '../../../shared/dto/shelf';
import { User } from '../../../shared/dto/user';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {

  url = "";
  products: Product[] = [];
  shelves: Shelf[] = [];
  users: User[] = [];
  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private productService: ProductService,
    private shelfService: ShelfService,
    private userService: UserService 
  ) { }
  ngOnInit(): void {
    this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          this.url = event.url;
        }
      }
    });
    this.productService.getAllProduct().subscribe({
      next: (products => {
        console.log(products);
        this.products = products;
      })
    });
    this.shelfService.getAllShelves().subscribe({
      next: (shelves => {
        console.log(shelves);
        this.shelves = shelves;
      })
    });
    this.userService.getAllUsers().subscribe({
      next: (users => {
        console.log(users);
        this.users = users;
      })
    })
  }
//   calculateProgress(): number {
//     if (this.products.length > 0) {
//         // Tüm ürünlerin sayısını 200'e göre oranlayarak ilerleme yüzdesini hesaplar
//         return (this.products.length / 60) * 100;
//     } else {
//         // Eğer ürün yoksa ilerleme çubuğu boş olmalı
//         return 0;
//     }
// }

  logout() {
    this.loginService.logout();
    this.toastr.success("Logout Successfuly!");
    this.router.navigate(['/login']);
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }

  getTotalProductQuantity(): number {
    return this.products.reduce((total, product) => total + product.quantity, 0);
  }

  getTotalShelfCapacity(): number {
    return this.shelves.reduce((total, shelf) => total +  shelf.capacity, 0);
  }

  // getOccupancyRate(): string {
  //   return  ((this.getTotalProductQuantity() / this.getTotalShelfCapacity()) * 100).toFixed(2);
  // }

  getOccupancyRate(): number {
    const rate = (this.getTotalProductQuantity() / this.getTotalShelfCapacity()) * 100;
    return parseFloat(rate.toFixed(2));
  }

  getTotalUsers() {
   return this.users.length;
  }

}
