import { createContext } from "react"
import { ProductT, ReceiptT } from "./types.ts"

export const ProductsContext = createContext({
  products: [] as ProductT[],
  setProducts: (() => {}) as (products: ProductT[]) => void,
  receipts: [] as ReceiptT[],
  setReceipts: (() => {}) as (receipts: ReceiptT[]) => void,
  language: "",
  setLanguage: (() => {}) as (language: string) => void,
})
