import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  products = [
    {
      name: 'Classic T-Shirt',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      rating: 4,
      sizes: ['S', 'M', 'L', 'XL'],
      selectedSize: '',
      quantity: 1
    },
    {
      name: 'Denim Jeans',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1626&q=80',
      rating: 5,
      sizes: ['28', '30', '32', '34'],
      selectedSize: '',
      quantity: 1
    }
  ];

  paymentDetails = {
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    billingAddress: ''
  };

  subtotal = 0;
  tax = 0;
  shipping = 5.99;
  total = 0;
  isLoading = false;

  ngOnInit() {
    this.updateCart();
  }

  updateCart() {
    this.subtotal = this.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    this.tax = this.subtotal * 0.1;
    this.total = this.subtotal + this.tax + this.shipping;
  }

  rateProduct(index: number, rating: number) {
    this.products[index].rating = rating;
  }

  removeItem(index: number) {
    this.products.splice(index, 1);
    this.updateCart();
  }

  increaseQuantity(index: number) {
    this.products[index].quantity++;
    this.updateCart();
  }

  decreaseQuantity(index: number) {
    if (this.products[index].quantity > 0) {
      this.products[index].quantity--;
      this.updateCart();
    }
  }

  submitOrder() {
    if (this.products.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    this.isLoading = true;
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      alert('Order placed successfully!');
      this.products = [];
      this.updateCart();
      this.paymentDetails = {
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        billingAddress: ''
      };
    }, 2000);
  }
}
