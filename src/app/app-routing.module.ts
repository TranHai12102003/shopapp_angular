import { Router, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { OrderComponent } from "./components/order/order.component";
import { OrderDetailComponent } from "./components/admin/order-detail/order-detail.admin.component";
import { NgModule } from "@angular/core";
import { AuthGuardFn } from "./components/guards/auth.guard";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AdminGuardFn } from "./components/guards/admin.guard";
import { OrderAdminComponent } from "./components/admin/order/order.admin.component";
import { UpdateCategoryAdminComponent } from "./components/admin/category/update/update.category.admin.component";
import { InsertCategoryAdminComponent } from "./components/admin/category/insert/insert.category.admin.component";
import { InsertProductComponent } from "./components/admin/product/insert/insert.product.admin.component";
import { UpdateProductComponent } from "./components/admin/product/update/update.product.admin.component";
import { InsertProductImg } from "./components/admin/product/insertImg/insertImg.product.admin.component";
import { InsertSliderComponent } from "./components/admin/slider/insert/insert.slider.admin.component";
import { UpdateSliderComponent } from "./components/admin/slider/update/update.slider.admin.component";

const routes:Routes=[
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'admin',component:AdminComponent,canActivate:[AdminGuardFn]},
    {path:'admin/orders',component:OrderAdminComponent,canActivate:[AdminGuardFn]},
    {path:'register',component:RegisterComponent},
    {path:'products/:id',component:ProductDetailComponent},
    {path:'orders',component:OrderComponent},
    {path:'user-profile',component:UserProfileComponent,canActivate:[AuthGuardFn]},
    {path:'admin/orders/:id',component:OrderDetailComponent,canActivate:[AuthGuardFn]},
    {path:'admin/category/update/:id',component:UpdateCategoryAdminComponent,canActivate:[AdminGuardFn]},
    {path:'admin/category/insert',component:InsertCategoryAdminComponent,canActivate:[AdminGuardFn]},
    {path:'admin/product/insert',component:InsertProductComponent,canActivate:[AdminGuardFn]},
    {path:'admin/slider/insert',component:InsertSliderComponent,canActivate:[AdminGuardFn]},
    {path:'admin/slider/update/:id',component:UpdateSliderComponent,canActivate:[AdminGuardFn]},
    {path:'admin/product/update/:id',component:UpdateProductComponent,canActivate:[AdminGuardFn]},
    {path:'admin/product/insert-product-img/:id',component:InsertProductImg,canActivate:[AdminGuardFn]}

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}