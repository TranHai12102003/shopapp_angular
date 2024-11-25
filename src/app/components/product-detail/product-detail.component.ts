import { Attribute, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { ProductAttribute } from 'src/app/models/product.attribute';
import { ProductImage } from 'src/app/models/product.image';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  productId: number=0;
  currentImageIndex: number=0;
  quantity: number=1;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
      private router: Router,
  ){}

  ngOnInit() {
    //Lấy productId từ URL
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
      debugger
      // this.cartService.clearCart();
      // const idParam=6; //fake tạm 1  giá trị
      if(idParam !== null){
        this.productId = +idParam;
      }
      if(!isNaN(this.productId)){
        this.productService.getDetailProduct(this.productId).subscribe({
            next:(response:any)=>{
              //lấy danh sách ảnh sản phẩm và thay đổi URL
              console.log('API response:',response);
              debugger
              if(response.product_images && response.product_images.length >0){
                    response.product_images.forEach((product_image:ProductImage)=>{
                        // console.log('Original image_url:', product_image.image_url);
                        product_image.image_url=`${environment.apiBaseUrl}/products/images/${product_image.image_url}`;
                    });
              }
              debugger
              this.product=response;
              //Bắt đầu với ảnh đầu tiên
              this.showImage(0);
            },
            complete:()=>{
              debugger
            },
            error:(error:any)=>{
              console.error('Error fetching deatail:',error);
            }
        });
      }
      else{
        console.error('Invalid productId',idParam);
      }
  }
  showImage(index:number): void{
    debugger
    if(this.product && this.product.product_images && this.product.product_images.length>0){
        //đảm bảo rằng index nằm trong khoảng hợp lệ
        debugger
        if(index >= this.product.product_images.length){
          index=0;
        }
        else if(index < 0){
          index = 0;
        }else if(index >= this.product.product_images.length){
          index=this.product.product_images.length-1;
        }
        //gán giá trị index hiện tại và cập nhật ảnh hiển thị
        this.currentImageIndex=index;
    }
  }
  thumbnailClick(index:number){
    debugger
    //gọi khi 1 thumbnail được bấm
    this.currentImageIndex=index;
  }
  nextImage():void{
    debugger
    this.showImage(this.currentImageIndex+1);
  }
  previousImage():void{
    debugger
    this.showImage(this.currentImageIndex-1);
  }

  addToCart():void{
    debugger
    if(this.product && this.product.id){
      this.cartService.addToCart(this.product.id,this.quantity);
    }else{
      //Xử lú khi product là null
      console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null');
    }
  }

  buyNow():void{}

  decreaseQuantity():void{
    if(this.quantity>1){
      this.quantity--;
    }
  }
  increaseQuantity():void{
    this.quantity++;
  }
}
