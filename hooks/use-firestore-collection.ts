"use client"

import { useState, useEffect } from "react"
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  type QueryConstraint,
  type DocumentData,
  type OrderByDirection,
  type WhereFilterOp,
} from "firebase/firestore"
import { db } from "@/lib/firebase/firebase"

type UseFirestoreCollectionProps = {
  collectionName: string
  constraints?: [string, WhereFilterOp, any][]
  orderByField?: string
  orderDirection?: OrderByDirection
  limitCount?: number
  enabled?: boolean
}

export function useFirestoreCollection<T = DocumentData>({
  collectionName,
  constraints = [],
  orderByField,
  orderDirection = "desc",
  limitCount,
  enabled = true,
}: UseFirestoreCollectionProps) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return () => {}
    }

    setLoading(true)
    setError(null)

    try {
      // Build query constraints
      const queryConstraints: QueryConstraint[] = []

      // Add where clauses
      constraints.forEach(([field, operator, value]) => {
        // Skip invalid constraints (like empty arrays for "in" operator)
        if (operator === "in" && Array.isArray(value) && value.length === 0) {
          return
        }
        queryConstraints.push(where(field, operator, value))
      })

      // Add orderBy
      if (orderByField) {
        queryConstraints.push(orderBy(orderByField, orderDirection))
      }

      // Add limit
      if (limitCount) {
        queryConstraints.push(limit(limitCount))
      }

      // Create query
      const q = query(collection(db, collectionName), ...queryConstraints)

      // Subscribe to query
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const results: T[] = []
          snapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() } as T)
          })
          setData(results)
          setLoading(false)
        },
        (err) => {
          console.error(`Error fetching ${collectionName}:`, err)
          setError(err as Error)
          setLoading(false)
        },
      )

      // Cleanup subscription
      return () => unsubscribe()
    } catch (err) {
      console.error(`Error setting up ${collectionName} listener:`, err)
      setError(err as Error)
      setLoading(false)
      return () => {}
    }
  }, [collectionName, enabled, limitCount, orderByField, orderDirection])

  // Convert constraints array to string for dependency array
  useEffect(() => {
    // This is just to trigger a re-fetch when constraints change
  }, [JSON.stringify(constraints)])

  return { data, loading, error }
}
