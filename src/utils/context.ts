import {createContext} from "react";
import {ProductT, ReceiptT} from "./types.ts";


export const ProductsContext = createContext({
    products:[] as ProductT[],
    setProducts: ([]: ProductT[]) => {},
    receipts:[] as ReceiptT[],
    setReceipts: ([] : ReceiptT[]) => {},
    language:'',
    setLanguage: (_language:string) => {},
})
