import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";
import { Product } from "../models/product";
@Injectable({
    providedIn: 'root'
  })
export class CartService{
    private cart: Map<number,number>=new Map();//Dùng Map để lưu trữ giỏ hàng với key là id sản phẩm , value là số lượng sản phẩm

    constructor(private productService:ProductService){
        //Lấy giỏ hàng từ localStorage khi mới khởi tạo service
        const storedCart=localStorage.getItem('cart');
        if(storedCart){
            this.cart=new Map(JSON.parse(storedCart));
        }
    }

    addToCart(productId:number,quantity:number=1):void{
        debugger
        if(!productId){
            console.error('Không thể thêm sản phẩm với productId là undefind');
            return;
        }
        if(this.cart.has(productId)){
            //Nếu sản phẩm có trong giỏ hàng thì tăng số lượng lên
            this.cart.set(productId, this.cart.get(productId)! + quantity);
        }else{
            //Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào với số lượng "quantity"
            this.cart.set(productId,quantity);
        }
        //Sau khi thay đổi giỏ hàng lưu vào localStorage
        this.saveCartToLocalStorage();
    }

    getCart():Map<number,number>{
        return this.cart;
    }

    private saveCartToLocalStorage():void{
        debugger
        localStorage.setItem('cart',JSON.stringify(Array.from(this.cart.entries())));
    }

    // Hàm xóa dữ liệu giỏ hàng và cập nhật Local Storage
  clearCart(): void {
    this.cart.clear(); // Xóa toàn bộ dữ liệu trong giỏ hàng
    this.saveCartToLocalStorage(); // Lưu giỏ hàng mới vào Local Storage (trống)
  }
  // Thêm phương thức để lấy tổng số lượng sản phẩm trong giỏ hàng
  getTotalQuantity(): number {
    let totalQuantity = 0;
    this.cart.forEach(quantity => {
      totalQuantity += quantity;
    });
    return totalQuantity;
  }

  setCart(cart : Map<number, number>) {
    this.cart = cart ?? new Map<number, number>();
    this.saveCartToLocalStorage();
  }

}