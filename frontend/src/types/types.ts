export interface IItem {
  _id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  priceWithSale?: number;
  category: string[];
  rating: number;
  inStockAmount: number;
  images: string[];
}

export interface IItemData {
  data: IItem[]
}

export interface ICart {
  totalPrice: number;
  totalPriceWithSale: number;
  items: {
    itemInCart: IItem;
    amount: number;
  }[]
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  cart: ICart;
}

export interface IUserData {
  data: IUser
}

export interface IUserNoPopulate extends Omit<IUser, 'cart'> {
  cart: {
    itemInCart: string,
    amount: number
  }[]
}

export interface ISignin extends Pick<IUser, 'email'> {
  password: string;
}

export interface IPatchMe extends Pick<IUser, 'name' | 'email'> { }

export interface ISignup extends ISignin {
  name: string;
}

export enum EInputType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface IAuthInput {
  name: string;
  nameText: string;
  type: EInputType;
  options?: object;
}

export interface IError {
  status: number;
  data: {
    message: string;
  }
}