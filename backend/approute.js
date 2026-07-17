import express from 'express';
const router = express.Router();
import * as  ProductController from './controllers/ProductController.js';
import * as CategoryController from './controllers/CategoryController.js';
import * as OrderController from './controllers/OrderController.js';
import * as OrderDetailController from './controllers/OrderDetailController.js';
import * as UserController from './controllers/UserController.js';
import * as ImageController from './controllers/ImageController.js';
import * as CartController from './controllers/CartController.js';
import * as CartItemController from './controllers/CartItemController.js';
import * as PaymentController from './controllers/PaymentController.js';
import  asyncHandler from './middlewares/asyncHandler.js';
import validate from './middlewares/validate.js';
import insertProductRequest from './dtos/requests/product/insertProductRequest.js';
import updateProductRequest from './dtos/requests/product/updateProductRequest.js';
import insertOrderRequest from './dtos/requests/order/insertOrderRequest.js';
import InsertProductImageRequest from './dtos/requests/product_images/InsertProductImageRequest.js';
import InsertUserRequest from './dtos/requests/user/InsertUserRequest.js';
import  uploadImageMiddleware from './middlewares/imageUpload.js';
import   validateImageExists from './middlewares/validateImageExists.js';
import * as ProductImageController from './controllers/ProductImageController.js';
import InsertCartRequest from './dtos/requests/cart/InsertCartRequest.js';
import InsertCartItemRequest from './dtos/requests/cart_item/InsertCartItemRequest.js';
import LoginUserRequest from './dtos/requests/user/LoginUserRequest.js';
import { UserRole } from './constants/index.js';
import { requireRoles } from './middlewares/jwtMiddleware.js';
// export default router;
export  function approute(app) {
    // route products
    router.get('/products', asyncHandler( ProductController.getProducts));

    router.post('/products',requireRoles([UserRole.ADMIN]),
        validateImageExists,
        validate(insertProductRequest),
         asyncHandler(ProductController.insertProduct));

    router.put('/products/:id',
        requireRoles([UserRole.ADMIN]),
        validateImageExists,
        validate(updateProductRequest),
        asyncHandler(ProductController.updateProduct));

    router.delete('/products/:id', 
        requireRoles([UserRole.ADMIN]),
        asyncHandler(ProductController.deleteProduct));

    router.get('/products/:id', asyncHandler( ProductController.getProductById));

    router.get('/products/category/:categoryId', asyncHandler(ProductController.getProductsByCategory));

    // route product images
    router.get('/product-images', asyncHandler(ProductImageController.getProductImages));
    router.get('/product-images/:id', asyncHandler(ProductImageController.getProductImageById));
    router.post('/product-images',
        validate(InsertProductImageRequest),
        asyncHandler(ProductImageController.insertProductImage));
    router.delete('/product-images/:id', asyncHandler(ProductImageController.deleteProductImage));


    // route categories
    router.get('/allcategories', asyncHandler(CategoryController.getAllCategories));
    router.get('/categories',asyncHandler( CategoryController.getCategories));
   
    router.post('/categories',
        requireRoles([UserRole.ADMIN]),
        validateImageExists,
        asyncHandler (CategoryController.insertCategory));
    router.put('/categories/:id',
        requireRoles([UserRole.ADMIN]),
        validateImageExists,
        asyncHandler( CategoryController.updateCategory));
    router.delete('/categories/:id',asyncHandler( CategoryController.deleteCategory));
    router.get('/categories/:id',asyncHandler( CategoryController.getCategoryById));


    // route orders
    router.get('/orders',asyncHandler( OrderController.getOrders));
    router.post('/orders',
        validate(insertOrderRequest),
        asyncHandler( OrderController.insertOrder));
    router.put('/orders/:id',asyncHandler( OrderController.updateOrder));
    router.delete('/orders/:id', asyncHandler(OrderController.deleteOrder));
    router.get('/orders/:id', asyncHandler(OrderController.getOrderById));
    
    // GET:  ỦRl Lấy danh sách chi tiết đơn hàng
    router.get('/orderdetails',asyncHandler (OrderDetailController.getOrderDetails));
    // POST:  ỦRl Tạo chi tiết đơn hàng
    router.post('/orderdetails',asyncHandler (OrderDetailController.insertOrderDetail));
    // PUT:  ỦRl Cập nhật chi tiết đơn hàng
    router.put('/orderdetails/:id', asyncHandler(OrderDetailController.updateOrderDetail));
    // DELETE:  ỦRl Xóa chi tiết đơn hàng
    router.delete('/orderdetails/:id',asyncHandler( OrderDetailController.deleteOrderDetail));
    // GET:  ỦRl Lấy chi tiết đơn hàng theo ID
    router.get('/orderdetails/:id',asyncHandler( OrderDetailController.getOrderDetailById));

       // router cart
       router.get('/carts', asyncHandler(CartController.getCarts));
       router.get('/carts/:id', asyncHandler(CartController.getCartById));
       // route.post('/carts', requireRoles([UserRole.ADMIN, UserRole.USER]), validate(InsertCartsRequest), asyncHandler(CartController.insertCart));
       router.post('/carts', validate(InsertCartRequest), asyncHandler(CartController.insertCart));
       router.post('/carts/checkout', asyncHandler(CartController.checkoutCart));
       router.put('/carts/:id', asyncHandler(CartController.updateCart));
       router.delete('/carts/:id',  asyncHandler(CartController.deleteCart));
   
     // router cart item
     router.get('/cartitems', asyncHandler(CartItemController.getCartItems));
     router.get('/cartitems/carts/:cart_id', asyncHandler(CartItemController.getCartItemById));
     router.post('/cartitems', 
        validate(InsertCartItemRequest),
        asyncHandler(CartItemController.insertCartItem));
     //router.put('/cartitems/:id', asyncHandler(CartItemController.updateCartItem));
     router.delete('/cartitems/:id', asyncHandler(CartItemController.deleteCartItem));
    // User route
     router.post('/users/register', 
        validate(InsertUserRequest),
        asyncHandler(UserController.registerUser));

    router.post('/users/login', 
        validate(LoginUserRequest),    
        asyncHandler(UserController.loginUser));
    // Sử dụng middleware upload
        // router.post('/images/upload',
        //     uploadImageMiddleware.array('images', 1),// upload 1 file
        //     asyncHandler(ImageController.uploadImages)
        // )
        router.post('/images/upload', uploadImageMiddleware.single('image'), ImageController.uploadImages);
        router.get('/images/:filename', asyncHandler(ImageController.viewImages));
        router.delete('/images/:fileName', asyncHandler(ImageController.deleteImage));

 
        router.post('/paymentzalopay', PaymentController.createPayment);
    // Sử dụng router
    app.use('/api/', router);
}