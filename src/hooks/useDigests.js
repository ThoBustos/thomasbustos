// src/hooks/useDigests.js
import { useState, useEffect, useCallback } from 'react'
import { digestService } from '../services/digestService'
import { NEWSLETTER_ISSUES } from '../data/newsletterIssues'

/**
 * Hook for fetching the archive list
 * Falls back to mock data if Supabase fails
 */
export function useDigests() {
  const [digests, setDigests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usingFallback, setUsingFallback] = useState(false)

  const fetchDigests = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      if (!digestService.isConfigured()) {
        throw new Error('Supabase not configured')
      }
      const data = await digestService.getArchive()
      setDigests(data)
      setUsingFallback(false)
    } catch (err) {
      console.warn('Failed to fetch digests, using fallback:', err.message)
      setDigests(NEWSLETTER_ISSUES)
      setUsingFallback(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDigests()
  }, [fetchDigests])

  return { digests, loading, error, usingFallback, refetch: fetchDigests }
}

/**
 * Hook for fetching a single digest by date
 * @param {string|null} date - Date in YYYY-MM-DD format, or null for latest
 */
export function useDigest(date = null) {
  const [digest, setDigest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDigest = async () => {
      setLoading(true)
      setError(null)

      try {
        if (!digestService.isConfigured()) {
          throw new Error('Supabase not configured')
        }

        const data = date
          ? await digestService.getByDate(date)
          : await digestService.getLatest()
        setDigest(data)
      } catch (err) {
        console.error('Failed to fetch digest:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDigest()
  }, [date])

  return { digest, loading, error }
}
