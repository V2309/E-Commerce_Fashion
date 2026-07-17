import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  checkoutItem: any = null;
  submittedOrder: any = null;

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar, 
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    const cartId = this.getCartId();
    if (cartId) {
      console.log(`Fetching cart items for cart ID: ${cartId}`);
      this.http.get(`http://localhost:3000/api/cartitems/carts/${cartId}`).subscribe(
        (response: any) => {
          console.log('API response:', response);
          if (response.data && response.data.length > 0) {
            this.cartItems = response.data;
            this.fetchProductDetails();
            console.log('Cart items fetched:', this.cartItems);
          } else {
            console.log('No cart items found');
          }
        },
        (error) => {
          console.error('Error fetching cart items', error);
        }
      );
    }
  }

  fetchProductDetails() {
    this.cartItems.forEach((item, index) => {
      this.http.get(`http://localhost:3000/api/products/${item.product_id}`).subscribe(
        (productResponse: any) => {
          this.cartItems[index].product = productResponse.data;
        },
        (error) => {
          console.error('Error fetching product details', error);
        }
      );
    });
  }

  getCartId(): string {
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not available');
      return '';
    }

    let cartId = localStorage.getItem('cart_id');
    if (cartId) {
      console.log(`Using existing cart ID: ${cartId}`);
    } else {
      const userId = this.getUserId();
      const sessionId = this.getSessionId();
      const payload = { user_id: userId, session_id: sessionId };
      console.log('Creating cart with payload:', payload);
      this.http.post('http://localhost:3000/api/carts', payload).subscribe(
        (response: any) => {
          console.log('Response from server:', response);
          cartId = response.data.id?.toString();
          if (cartId) {
            localStorage.setItem('cart_id', cartId);
            console.log(`New cart ID created: ${cartId}`);
            this.loadCartItems();
          }
        },
        (error) => {
          console.error('Error creating cart', error);
        }
      );
    }
    console.log(`Cart ID from localStorage: ${cartId}`);
    return cartId ?? '';
  }

  updateCart(item: any) {
    if (item.quantity < 0) {
      alert('Quantity cannot be negative');
      item.quantity = 1; // Reset to a default value
      return;
    }
 

    if (item.quantity === 0) {
      this.deleteCartItem(item);
      return;
    }

    const payload = {
      product_id: item.product_id,
      quantity: item.quantity,
      cart_id: item.cart_id
    };

    this.http.put(`http://localhost:3000/api/cartitems/${item.id}`, payload).subscribe(
      (response: any) => {
        console.log('Cart item updated:', response);
        this.loadCartItems();
      },
      (error) => {
        console.error('Error updating cart item:', error);
      }
    );
  }

  getUserId(): string | null {
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not available');
      return null;
    }

    const user = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      const userId = userObj.id?.toString() || null;
      console.log('User ID:', userId);
      return userId;
    }
    console.log('User ID: null');
    return null;
  }

  getSessionId(): string {
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not available');
      return '';
    }

    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem('session_id', sessionId);
      console.log('Generated new session ID:', sessionId);
    } else {
      console.log('Using existing session ID:', sessionId);
    }
    return sessionId;
  }

  generateSessionId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  addProductToCart(productId: number, quantity: number) {
    const cartId = this.getCartId();
    if (!cartId) {
      console.error('Cart ID not found');
      return;
    }

    const payload = {
      product_id: productId,
      quantity: quantity,
      cart_id: cartId
    };

    this.http.post('http://localhost:3000/api/cartitems', payload).subscribe(
      (response: any) => {
        console.log('Product added to cart:', response);
        this.loadCartItems();
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }
  showCheckoutForm() {
    const totalAmount = this.cartItems.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);
  
    this.checkoutItem = {
      cart_id: this.cartItems.map(item => item.cart_id).join(','), // Lấy danh sách `cart_id` nếu cần
      total: totalAmount,
      notes: '',
      phone: '',
      address: ''
    };
  }
    checkout() {
    const paymentMethod = (document.querySelector('input[name="payment"]:checked') as HTMLInputElement)?.value;
    if (paymentMethod === 'zalopay') {
      this.payWithZaloPay();
    } else {
      this.http.post('http://localhost:3000/api/carts/checkout', this.checkoutItem).subscribe(
        (response: any) => {
          console.log('Checkout successful:', response);
          this.submittedOrder = {
            ...this.checkoutItem,
            total: this.calculateTotal()
          };
          this.checkoutItem = null;
          localStorage.removeItem('cart_id');
          this.createNewCart();
          this.snackBar.open('Checkout successful!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.error('Error during checkout', error);
        }
      );
    }
  }

  payWithZaloPay() {
    const payload = {
      items: this.cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price
      })),
      description: 'Thanh toán cho sản phẩm',
      amount: this.calculateTotal()
    };

    this.http.post('http://localhost:3000/api/paymentzalopay', payload).subscribe(
      (response: any) => {
        if (response.return_code === 1 && response.sub_return_code === 1) {
          window.open(response.order_url, '_blank');
        } else {
          console.error('Giao dịch thất bại', response);
        }
      },
      (error) => {
        console.error('Error during ZaloPay payment', error);
      }
    );
  }
  
  // checkout() {
   
  
  //     this.http.post('http://localhost:3000/api/carts/checkout', this.checkoutItem).subscribe(
  //       (response: any) => {
  //         console.log('Checkout successful:', response);
  //         this.submittedOrder = {
  //           ...this.checkoutItem,
  //           total: this.calculateTotal()
  //         };
  //         this.checkoutItem = null;
  //         localStorage.removeItem('cart_id');
  //         this.createNewCart();
  //         this.snackBar.open('Checkout successful!', 'Close', {
  //           duration: 3000,
  //            horizontalPosition: 'right',
  //         verticalPosition: 'top'
  //         });
  //         this.router.navigate(['/']);
  //       },
  //       (error: any) => {
  //         console.error('Error during checkout', error);
  //       }
  //     );
    
  // }


  calculateTotal() {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  createNewCart() {
    const userId = this.getUserId();
    const sessionId = this.getSessionId();
    const payload = userId ? { user_id: userId, session_id: sessionId } : { session_id: sessionId };
    console.log('Creating new cart with payload:', payload);
    this.http.post('http://localhost:3000/api/carts', payload).subscribe(
      (response: any) => {
        console.log('Response from server:', response);
        const newCartId = response.data.id?.toString();
        if (newCartId) {
          localStorage.setItem('cart_id', newCartId);
          console.log(`New cart ID created: ${newCartId}`);
          this.loadCartItems();
        }
      },
      (error) => {
        console.error('Error creating new cart', error);
      }
    );
  }
  deleteCartItem(item: any) {
    const cartId = this.getCartId();
    if (!cartId) {
      console.error('Cart ID not found');
      return;
    }
  
    this.http.delete(`http://localhost:3000/api/cartitems/${item.id}`).subscribe(
      (response: any) => {
        console.log('Item deleted from cart:', response);
        // Manually remove the item from the cartItems array
        this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
        // Optionally, reload the cart items from the server
        this.loadCartItems();
      },
      (error) => {
        console.error('Error deleting item from cart:', error);
      }
    );
  
  }
}
// export class CartComponent implements OnInit {
//   cartItems: any[] = [];
//   checkoutItem: any = null;
//   submittedOrder: any = null;

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.loadCartItems();
//   }

//   loadCartItems() {
//     const cartId = this.getCartId();
//     if (cartId) {
//       console.log(`Fetching cart items for cart ID: ${cartId}`);
//       this.http.get(`http://localhost:3000/api/cartitems/carts/${cartId}`).subscribe(
//         (response: any) => {
//           console.log('API response:', response);
//           if (response.data && response.data.length > 0) {
//             this.cartItems = response.data;
//             this.fetchProductDetails();
//             console.log('Cart items fetched:', this.cartItems);
//           } else {
//             console.log('No cart items found');
//           }
//         },
//         (error) => {
//           console.error('Error fetching cart items', error);
//         }
//       );
//     }
//   }

//   fetchProductDetails() {
//     this.cartItems.forEach((item, index) => {
//       this.http.get(`http://localhost:3000/api/products/${item.product_id}`).subscribe(
//         (productResponse: any) => {
//           this.cartItems[index].product = productResponse.data;
//         },
//         (error) => {
//           console.error('Error fetching product details', error);
//         }
//       );
//     });
//   }

//   getCartId(): string {
//     let cartId = localStorage.getItem('cart_id');
//     if (cartId) {
//       console.log(`Using existing cart ID: ${cartId}`);
//     } else {
//       const userId = this.getUserId();
//       const sessionId = this.getSessionId();
//       const payload = { user_id: userId, session_id: sessionId };
//       console.log('Creating cart with payload:', payload);
//       this.http.post('http://localhost:3000/api/carts', payload).subscribe(
//         (response: any) => {
//           console.log('Response from server:', response);
//           cartId = response.data.id?.toString();
//           if (cartId) {
//             localStorage.setItem('cart_id', cartId);
//             console.log(`New cart ID created: ${cartId}`);
//             this.loadCartItems();
//           }
//         },
//         (error) => {
//           console.error('Error creating cart', error);
//         }
//       );
//     }
//     console.log(`Cart ID from localStorage: ${cartId}`);
//     return cartId ?? '';
//   }

//   updateCart(item: any) {
//     console.log('Updating cart item:', item);
//   }

//   getUserId(): string | null {
//     const user = localStorage.getItem('user');
//     if (user) {
//       const userObj = JSON.parse(user);
//       const userId = userObj.id?.toString() || null;
//       console.log('User ID:', userId);
//       return userId;
//     }
//     console.log('User ID: null');
//     return null;
//   }

//   getSessionId(): string {
//     let sessionId = localStorage.getItem('session_id');
//     if (!sessionId) {
//       sessionId = this.generateSessionId();
//       localStorage.setItem('session_id', sessionId);
//       console.log('Generated new session ID:', sessionId);
//     } else {
//       console.log('Using existing session ID:', sessionId);
//     }
//     return sessionId;
//   }

//   generateSessionId(): string {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//       const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
//       return v.toString(16);
//     });
//   }

//   addProductToCart(productId: number, quantity: number) {
//     const cartId = this.getCartId();
//     if (!cartId) {
//       console.error('Cart ID not found');
//       return;
//     }

//     const payload = {
//       product_id: productId,
//       quantity: quantity,
//       cart_id: cartId
//     };

//     this.http.post('http://localhost:3000/api/cartitems', payload).subscribe(
//       (response: any) => {
//         console.log('Product added to cart:', response);
//         this.loadCartItems();
//       },
//       (error) => {
//         console.error('Error adding product to cart:', error);
//       }
//     );
//   }

//   showCheckoutForm(item: any) {
//     this.checkoutItem = {
//       cart_id: item.cart_id,
//       total: item.total || 0,
//       note: '',
//       phone: '',
//       address: ''
//     };
//   }

//   checkout() {
//     const paymentMethod = (document.querySelector('input[name="payment"]:checked') as HTMLInputElement)?.value;
//     if (paymentMethod === 'zalopay') {
//       this.payWithZaloPay();
//     } else {
//       this.http.post('http://localhost:3000/api/carts/checkout', this.checkoutItem).subscribe(
//         (response: any) => {
//           console.log('Checkout successful:', response);
//           this.submittedOrder = {
//             ...this.checkoutItem,
//             total: this.calculateTotal()
//           };
//           this.checkoutItem = null;
//           localStorage.removeItem('cart_id');
//           this.createNewCart();
//         },
//         (error: any) => {
//           console.error('Error during checkout', error);
//         }
//       );
//     }
//   }

//   payWithZaloPay() {
//     const payload = {
//       items: this.cartItems.map(item => ({
//         id: item.product.id,
//         name: item.product.name,
//         price: item.product.price
//       })),
//       description: 'Thanh toán cho sản phẩm',
//       amount: this.calculateTotal()
//     };

//     this.http.post('http://localhost:3000/api/paymentzalopay', payload).subscribe(
//       (response: any) => {
//         if (response.return_code === 1 && response.sub_return_code === 1) {
//           window.open(response.order_url, '_blank');
//         } else {
//           console.error('Giao dịch thất bại', response);
//         }
//       },
//       (error) => {
//         console.error('Error during ZaloPay payment', error);
//       }
//     );
//   }

//   calculateTotal() {
//     return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
//   }

//   createNewCart() {
//     const userId = this.getUserId();
//     const sessionId = this.getSessionId();
//     const payload = userId ? { user_id: userId, session_id: sessionId } : { session_id: sessionId };
//     console.log('Creating new cart with payload:', payload);
//     this.http.post('http://localhost:3000/api/carts', payload).subscribe(
//       (response: any) => {
//         console.log('Response from server:', response);
//         const newCartId = response.data.id?.toString();
//         if (newCartId) {
//           localStorage.setItem('cart_id', newCartId);
//           console.log(`New cart ID created: ${newCartId}`);
//           this.loadCartItems();
//         }
//       },
//       (error) => {
//         console.error('Error creating new cart', error);
//       }
//     );
//   }
// }