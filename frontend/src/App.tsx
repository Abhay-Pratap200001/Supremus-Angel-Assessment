import { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Leaf } from 'lucide-react'
import Navbar from './components/Navbar'
import CreateEntry from './components/CreateEntry'
import SavedEntries from './components/SavedEntries'
import { getEntries } from './api/formData.api'
import { FormEntry } from './types'

// main app - handles loading entries from db and rendering the two sections
function App() {

  const [entries, setEntries] = useState<FormEntry[]>([])
  const [loading, setLoading] = useState(true)

  // fetch all saved entries when the page loads
  useEffect(() => {
    fetchEntries()
  }, [])

  async function fetchEntries() {
    try {
      const data = await getEntries()
      setEntries(data)
    } catch (err) {
      console.error('could not load entries:', err)
      toast.error('Could not load saved entries')
    } finally {
      setLoading(false)
    }
  }

  // called by CreateEntry when a new entry is saved - adds it to the top of the list
  function handleNewEntry(newEntry: FormEntry) {
    setEntries(prev => [newEntry, ...prev])
  }

  return (
    <div className="min-h-screen">

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3500,
          style: { borderRadius: '10px', fontSize: '13px' },
          success: {
            style: { background: '#052e16', color: '#bbf7d0', border: '1px solid #166534' },
          },
          error: {
            style: { background: '#1c0505', color: '#fecaca', border: '1px solid #991b1b' },
          },
        }}
      />

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-6">

        {/* form + preview - all handled inside CreateEntry */}
        <div className="mb-6">
          <CreateEntry onSave={handleNewEntry} />
        </div>

        {/* saved entries from the database */}
        <div className="bg-white rounded-2xl shadow-md border border-white/50 p-5">
          <div className="flex items-center gap-2.5 mb-5">
            <Leaf className="w-4 h-4 text-green-600" />
            <h2 className="font-semibold text-gray-800 text-base">Saved Entries</h2>
            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {entries.length}
            </span>
          </div>
          <SavedEntries entries={entries} loading={loading} />
        </div>

      </main>
    </div>
  )
}

export default App
