// src/hooks/useOrders.ts
import { useState, useEffect } from "react"
import { useAppSelector } from "../../app/hooks.ts"
import { OrderT } from "../../utils/types.ts"

export const useOrders = () => {
  const user = useAppSelector((state) => state.user.profile)
  const [orders, setOrders] = useState<OrderT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user.login) {
      setLoading(false)
      return
    }

    const fetchOrders = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`http://localhost:8080/ordersByUser/${user.login}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch orders. Status: ${response.status}`)
        }
        const data: OrderT[] = await response.json()
        // Sort orders by date, newest first
        data.sort((a, b) => new Date(b.dateCreated!).getTime() - new Date(a.dateCreated!).getTime())
        setOrders(data)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user.login])

  return { orders, loading, error }
}
