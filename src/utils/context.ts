import {createContext} from "react";
import { ProductT, QueryT, ReceiptT } from "./types.ts"


export const ProductsContext = createContext({
    selectedId :'',
    setSelectedId: (_id:string) => {},
    receipts:[] as ReceiptT[],
    setReceipts: ([] : ReceiptT[]) => {},
    // query:{} as QueryT,
    // setQuery:(_q:QueryT)=>{}

})
