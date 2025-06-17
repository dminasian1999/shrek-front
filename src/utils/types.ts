// --------------
// --------------
export interface NavItemT {
    title: string,
    route: string
    // subItems?: NavItemT[];
}

export interface CollectionT {
    id: string;
    name: string;
    description?: string;
    image: string;
}
export  interface ProductT {
    id?: string
    name: string
    imageUrl: string
    quantity: number
    sell: number
    buy: number
    category:string
    dateCreated?:Date
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
    author: string;
    message: number;
    dateCreated: string;
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
    category:string
    dateCreated: Date
}

export interface Adjustment {
    num: number
    add: boolean
    user: string
    date: Date
}


export interface InfoCardT {
    logo: string;
    title: string;
    subtitle: string;
    btn: {
        title: string,
        route: string;
    };
}

export enum UpdateMode {
    default = "",
    editUser = "editUser",
    changePassword = "changePassword"
}

export interface UserProfile {
    login: string,
    firstName: string,
    lastName: string,
    roles: string[]
}


export interface UserRegister {
    login: string,
    firstName: string,
    lastName: string,
    password: string
}

export interface UserEditData {
    firstName: string,
    lastName: string,
}

export interface UserUpdatePassword {
    newPassword: string,
    oldPassword: string
}
