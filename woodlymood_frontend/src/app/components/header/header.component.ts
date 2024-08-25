import {Component, OnInit,EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router,NavigationEnd ,ActivatedRoute} from "@angular/router";
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/model/Category';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  query:string="";

  @Output() searchQuery = new EventEmitter<string>();
  constructor(private router: Router,private productService: ProductService,private route: ActivatedRoute
    ) {

  }

  categories: Category[]= [];

  ngOnInit() {
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Reload the component here
        this.getCategories();
      }
    });
    this.getCategories();


    
  }

  goToSignIn() {
    this.router.navigateByUrl('/sign-in');
  }

  goToLanding() {
    this.router.navigateByUrl('/');
  }

  goToperso() {
    this.router.navigate(['perso']);
    
  }

  goToBlog() {
    this.router.navigateByUrl('/blog');
   
  }
  getCategories(): void {
    this.productService.getCategories()
      .subscribe(
        res => this.categories = res,
        err => console.log(err)
      )
  }

  trackByFn(index: number, category: any): any {
    return category.id; // or any unique property of the item
  }

 
  reloadPage(id:string) {
    // Build the URL for navigation
    const url = this.router.createUrlTree(['/page', id]).toString();
    // Navigate to the URL, then reload the page
    this.router.navigateByUrl(url).then(() => {
      window.location.reload();
    });
  }

  onSearch() {
    const query = this.query;
    const url = this.router.createUrlTree(['/home', query]).toString();
    this.router.navigateByUrl(url).then(() => {
      window.location.reload();
    });
  }
}
