import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';


@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: String = "Product List Page Title";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    _listFilter: string;
    filteredProducts: IProduct[];
    errorMessage: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    constructor(private _productService: ProductService) {

    }

    ngOnInit(): void {
        this.products = this.filteredProducts = this._productService.getProducts1();
        
    }

    // ngOnInit(): void {
    //     this._productService.getProducts()
    //         .subscribe(products => {
    //               this.products = products;
    //               this.filteredProducts = this.products;                  
    //             },
    //         error => this.errorMessage = <any>error);
        
    // }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product rating: ' + message;
    }

    products: IProduct[];

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}