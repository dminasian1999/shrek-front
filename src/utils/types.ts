export interface NavItemT {
  title: string
  route: string
  // subItems?: NavItemT[];
}

export interface CollectionT {
  id: string
  name: string
  description?: string
  image: string
}

export interface ProductT {
  id?: string
  name: string
  imageUrl: string
  quantity: number
  sell: number
  buy: number
  category: string
  dateCreated?: Date
}

export interface ProductRowT {
  id: string
  name: string
  quantity: number
  buy: number
  sell: number
  profit: number
  amount: number
  imageFile: File | null
  imageUrl: string
}

export interface CommentT {
  postId: string
  author: string
  message: number
  dateCreated: string
}

export interface ReceiptT {
  id: string
  name: string
  imageUrl: string
  quantity: number
  sell: number
  buy: number
  income: number
  seller: string
  category: string
  dateCreated: Date
}

export interface Adjustment {
  num: number
  add: boolean
  user: string
  date: Date
}

export interface InfoCardT {
  logo: string
  title: string
  subtitle: string
  btn: {
    title: string
    route: string
  }
}

export enum UpdateMode {
  default = "",
  editUser = "editUser",
  changePassword = "changePassword",
}
export interface cartItem {
  productID: string

quantity: number
}

export interface UserProfile {
  login: string
  firstName: string
  lastName: string
  roles: string[]
  address?: AddressT
  cart?: any
  wishList?: string[]
  orders?: Order[]
}

export interface UserRegister {
  login: string
  firstName: string
  lastName: string
  password: string
}

export interface UserEditData {
  firstName: string
  lastName: string
}

export interface UserUpdatePassword {
  newPassword: string
  oldPassword: string
}

export interface AddressT {
  fullName: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

export interface Order {
  orderId: string
  userId: string
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled"
  orderItems: [OrderItem]
  totalAmount: 0
  shippingAddress: AddressT
  paymentMethod: "card" | "paypal" | "bank" | "cash"
  paymentStatus: "unpaid" | "paid" | "failed"
  createdAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: 0
  priceAtPurchase: 0
}

export interface Cart {
  id: string
  userId: string
  items: [CartItem]
}

export interface CartItem {
  id: string // UUID
  cartId: string // UUID
  productId: string // UUID
  quantity: 0
}

export interface ShipmentTracking {
  id: string // UUID
  orderId: string // UUID
  courier: string // String
  trackingNumber: string // String
  status: "processing" | "shipped" | "in_transit" | "delivered"
  estimatedDelivery: Date // Date
}
