import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/admin/order-detail/order-detail.admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CartComponent } from './cart/cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { SliderComponent } from './components/slider/slider.component';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { OrderAdminComponent } from './components/admin/order/order.admin.component';
import { ProductAdminComponent } from './components/admin/product/product.admin.component';
import { CategoryAdminComponent } from './components/admin/category/category.admin.component';
import { SliderAdminComponent } from './components/admin/slider/slider.admin.component';
import { UpdateCategoryAdminComponent } from './components/admin/category/update/update.category.admin.component';
import { InsertCategoryAdminComponent } from './components/admin/category/insert/insert.category.admin.component';
import { InsertProductComponent } from './components/admin/product/insert/insert.product.admin.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UpdateProductComponent } from './components/admin/product/update/update.product.admin.component';
import { InsertProductImg } from './components/admin/product/insertImg/insertImg.product.admin.component';
import { InsertSliderComponent } from './components/admin/slider/insert/insert.slider.admin.component';
import { UpdateSliderComponent } from './components/admin/slider/update/update.slider.admin.component';
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    OrderComponent,
    OrderDetailComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailComponent,
    CartComponent,
    AppComponent,
    SliderComponent,
    LocationSelectorComponent,
    UserProfileComponent,
    AdminComponent,
    OrderAdminComponent,
    ProductAdminComponent,
    CategoryAdminComponent,
    SliderAdminComponent,
    UpdateCategoryAdminComponent,
    InsertCategoryAdminComponent,
    InsertProductComponent,
    UpdateProductComponent,
    InsertProductImg,
    InsertSliderComponent,
    UpdateSliderComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    CKEditorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [
    // HomeComponent,
    // HeaderComponent
    // OrderComponent,
    // OrderDetailComponent,
    // LoginComponent
    // ProductDetailComponent
    // RegisterComponent
    // CartComponent
    // FooterComponent
    AppComponent
    // AdminComponent
    // UserProfileComponent
    // LocationSelectorComponent
    // SliderComponent
  ]
})
export class AppModule { }
