// src/hooks/useWeeklyDigests.js
import { useState, useEffect, useCallback } from 'react'
import { weeklyDigestService } from '../services/weeklyDigestService'

/**
 * Hook for fetching the weekly digest archive list
 * Returns empty array if Supabase fails (no mock fallback for weekly)
 */
export function useWeeklyDigests() {
  const [weeklyDigests, setWeeklyDigests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchWeeklyDigests = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      if (!weeklyDigestService.isConfigured()) {
        throw new Error('Supabase not configured')
      }
      const data = await weeklyDigestService.getArchive()
      setWeeklyDigests(data)
    } catch (err) {
      console.warn('Failed to fetch weekly digests:', err.message)
      setWeeklyDigests([])
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWeeklyDigests()
  }, [fetchWeeklyDigests])

  return { weeklyDigests, loading, error, refetch: fetchWeeklyDigests }
}

/**
 * Hook for fetching a single weekly digest by week start date
 * @param {string|null} weekStartDate - Date in YYYY-MM-DD format, or null for latest
 */
export function useWeeklyDigest(weekStartDate = null) {
  const [weeklyDigest, setWeeklyDigest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeeklyDigest = async () => {
      setLoading(true)
      setError(null)

      try {
        if (!weeklyDigestService.isConfigured()) {
          throw new Error('Supabase not configured')
        }

        const data = weekStartDate
          ? await weeklyDigestService.getByWeekStart(weekStartDate)
          : await weeklyDigestService.getLatest()
        setWeeklyDigest(data)
      } catch (err) {
        console.error('Failed to fetch weekly digest:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeeklyDigest()
  }, [weekStartDate])

  return { weeklyDigest, loading, error }
}
