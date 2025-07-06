import {createContext} from "react";
import {ProductT, ReceiptT} from "./types.ts";


export const ProductsContext = createContext({
    selectedId :'',
    setSelectedId: (_id:string) => {},
    products:[] as ProductT[],
    setProducts: ([]: ProductT[]) => {},
    receipts:[] as ReceiptT[],
    setReceipts: ([] : ReceiptT[]) => {}

})
