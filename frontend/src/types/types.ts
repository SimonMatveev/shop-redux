export enum ENUM_CATEGORY {
  RPG = 'RPG',
  ACTION = 'ACTION',
  IMMERSIVE_SIM = 'IMMERSIVE-SIM',
  VN = 'VN',
  SOULS_LIKE = 'SOULS-LIKE',
  THIRD_PERSON = '3RD-PERSON',
  FIRST_PERSION = '1ST-PERSON',
  SHOOTER = 'SHOOTER',
  RACING = 'RACING',
  SIMULATOR = 'SIMULATOR',
  SURVIVAL = 'SURVIVAL',
  HORROR = 'HORROR',
}

export enum ENUM_PLATFORMS {
  PC = 'PC',
  PS4 = 'PS4',
  PS5 = 'PS5',
  XBOX_ONE = 'XBOX-ONE',
  XBOX_X = 'XBOX-X',
  SWITCH = 'Switch',
}

export enum ENUM_LOCAL_STORAGE {
  TOGGLE = 'filterToggle',
  FILTER_STATE = 'filterState',
}

export enum ENUM_FILTER_NAMES {
  CATEGORY = 'category',
  PLATFORMS = 'platforms',
}

export interface IItem {
  _id: string;
  name: string;
  description: string;
  studio: string;
  price: number;
  priceWithSale: number;
  category: ENUM_CATEGORY[];
  rating: number;
  ratingAmount: number;
  inStockAmount: number;
  releaseDate: string;
  platforms: ENUM_PLATFORMS[];
  series?: string;
  images: string[];
}

export interface IItemInsert extends Omit<IItem, 'rating' | '_id'> {}

export interface IItemData {
  data: IItem[];
  dbLength: number;
}

export interface ISingleItemData {
  data: IItem;
}

export interface ICartItem {
  itemInCart: IItem;
  orders: {
    amount: number;
    platform: ENUM_PLATFORMS;
  }[];
}

export interface ICart {
  totalPrice: number;
  totalPriceWithSale: number;
  items: ICartItem[];
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  cart: ICart;
  ratings: IRating[];
}

export interface IUserData {
  data: IUser;
}

export interface IUserNoPopulate extends Omit<IUser, 'cart'> {
  cart: {
    items: {
      itemInCart: string;
      amount: number;
    }[];
    totalPrice: number;
    totalPriceWithSale: number;
  };
}

export interface ISignin extends Pick<IUser, 'email'> {
  password: string;
}

export interface IPatchMe {
  name?: string;
  email?: string;
  password?: string;
}

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
  };
}

export interface IClearResponse {
  data: {
    message: string;
  };
}

export interface IInitialStateForUser {
  isLoading: Record<
    | 'getUser'
    | 'patchUser'
    | 'signinUser'
    | 'signupUser'
    | 'signoutUser'
    | 'decrementCart'
    | 'incrementCart'
    | 'clearCart',
    boolean
  >;
  error: Record<
    | 'getUser'
    | 'patchUser'
    | 'signinUser'
    | 'signupUser'
    | 'signoutUser'
    | 'decrementCart'
    | 'incrementCart'
    | 'clearCart',
    string | null
  >;
  user: IUser | null;
}

export interface IFilters {
  category: ENUM_CATEGORY[];
  platforms: ENUM_PLATFORMS[];
  sortItem: string;
  sortOrder: string;
  limit: string;
  page: string;
  [key: string]: string | any[];
  resetable: ENUM_FILTER_NAMES[];
}

export interface IListItem {
  id: number;
  name: string;
}

export interface IRatingsResponse {
  rating: number;
  amount: number;
}

export interface IRating {
  value: number;
  id: string;
}

export interface IResetRatingReqest {
  id: string;
}
