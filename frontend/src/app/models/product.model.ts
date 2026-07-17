
export class Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  description: string;
  buyTurn: number;
  quantity: number;
  category_id: number;
  createdAt: Date;
  updatedAt: Date;
  

  constructor(
    id: number,
    name: string,
    image: string,
    price: number,
    oldPrice: number,
    description: string,
    buyTurn: number,
    quantity: number,
    category_id: number,
    createdAt: Date,
    updatedAt: Date,
   
  
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.oldPrice = oldPrice;
    this.description = description;
    this.buyTurn = buyTurn;
    this.quantity = quantity;
    this.category_id = category_id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
   
  }
}