// src/services/digestService.js
import { supabase } from './supabase'

export const digestService = {
  /**
   * Check if Supabase is configured
   */
  isConfigured() {
    return supabase !== null
  },

  /**
   * Get the latest published digest
   * @returns {Promise<Object>} Latest digest with full content
   */
  async getLatest() {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase
      .from('daily_digests')
      .select('*')
      .order('publish_date', { ascending: false })
      .limit(1)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Get digest by specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise<Object>} Digest for that date
   */
  async getByDate(date) {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase
      .from('daily_digests')
      .select('*')
      .eq('publish_date', date)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Get archive list (for list view)
   * @param {number} limit - Max number of results
   * @returns {Promise<Array>} List of digest summaries
   */
  async getArchive(limit = 30) {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase
      .from('daily_digests')
      .select('id, publish_date, title, video_count, keywords, content_json')
      .order('publish_date', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  }
}
