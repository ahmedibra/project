import { Component, OnInit } from '@angular/core';
import { Order } from '../model/ordre';
import { ProductService } from '../services/product.service';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.scss']
})
export class CommandeListComponent implements OnInit {

  constructor(private productservice: ProductService,private authService: AuthService) { }
  ordres:Order[]= [];
  p: number = 1; // Page number
  itemsPerPage: number = 20; // Items per page
  user={} as User;
  email=this.authService.getEmail();
  getUser(){
    this.authService.getUser(this.email)
    .subscribe({
      next: data => {
        
        this.user=data;
        
        //console.log( this.user);
      }});
      }

  ngOnInit(): void {
    this.getUser();
    this.productservice.getAllOrdre()
    .subscribe(
       data => {
        
        this.ordres=data;
        console.log(this.ordres);
       
        });
        //console.log( this.user);
      }
  }


