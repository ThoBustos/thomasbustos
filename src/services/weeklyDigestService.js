// src/services/weeklyDigestService.js
import { supabase } from './supabase'

export const weeklyDigestService = {
  /**
   * Check if Supabase is configured
   */
  isConfigured() {
    return supabase !== null
  },

  /**
   * Get the latest published weekly digest
   * @returns {Promise<Object>} Latest weekly digest with full content
   */
  async getLatest() {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase
      .from('weekly_digests')
      .select('*')
      .order('week_start_date', { ascending: false })
      .limit(1)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Get weekly digest by specific week start date
   * @param {string} weekStartDate - Date in YYYY-MM-DD format
   * @returns {Promise<Object>} Weekly digest for that week
   */
  async getByWeekStart(weekStartDate) {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase
      .from('weekly_digests')
      .select('*')
      .eq('week_start_date', weekStartDate)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Get weekly archive list (for list view)
   * @param {number} limit - Max number of results (default 12 for weekly)
   * @returns {Promise<Array>} List of weekly digest summaries
   */
  async getArchive(limit = 12) {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase
      .from('weekly_digests')
      .select('id, week_start_date, week_end_date, title, description, keywords, total_videos, days_with_content, channels_included, content_json')
      .order('week_start_date', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  }
}
