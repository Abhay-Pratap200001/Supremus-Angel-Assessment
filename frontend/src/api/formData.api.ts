import axios from 'axios'
import { FormPayload, FormEntry } from '../types'

// base url for the backend api
const API_URL = '/api/entries'

// get all saved entries from db - use this on page load
export async function getEntries(): Promise<FormEntry[]> {
  const res = await axios.get(API_URL)
  return res.data.data ?? []
}

// save a new entry to the database - use this when user clicks save button
export async function saveEntry(data: FormPayload): Promise<FormEntry> {
  const res = await axios.post(API_URL, data)
  return res.data.data
}
