"use client"

import { useState, useEffect } from "react"
import { doc, onSnapshot, type DocumentData } from "firebase/firestore"
import { db } from "@/lib/firebase/firebase"

type UseFirestoreDocumentProps = {
  collectionName: string
  documentId: string
  enabled?: boolean
}

export function useFirestoreDocument<T = DocumentData>({
  collectionName,
  documentId,
  enabled = true,
}: UseFirestoreDocumentProps) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!enabled || !documentId) {
      setLoading(false)
      return () => {}
    }

    setLoading(true)
    setError(null)

    try {
      // Get document reference
      const docRef = doc(db, collectionName, documentId)

      // Subscribe to document
      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            setData({ id: docSnap.id, ...docSnap.data() } as T)
          } else {
            setData(null)
          }
          setLoading(false)
        },
        (err) => {
          console.error(`Error fetching ${collectionName}/${documentId}:`, err)
          setError(err as Error)
          setLoading(false)
        },
      )

      // Cleanup subscription
      return () => unsubscribe()
    } catch (err) {
      console.error(`Error setting up ${collectionName}/${documentId} listener:`, err)
      setError(err as Error)
      setLoading(false)
      return () => {}
    }
  }, [collectionName, documentId, enabled])

  return { data, loading, error }
}
