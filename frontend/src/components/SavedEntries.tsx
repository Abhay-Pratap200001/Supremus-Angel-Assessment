import { Loader2, CalendarDays, Layers } from 'lucide-react'
import { FormEntry } from '../types'

interface Props {
  entries: FormEntry[]
  loading: boolean
}

// accent colors that rotate across cards so each one feels distinct
const cardAccents = [
  { border: 'border-l-emerald-500',  badge: 'bg-emerald-50 text-emerald-700',  dot: 'bg-emerald-400' },
  { border: 'border-l-violet-500',   badge: 'bg-violet-50  text-violet-700',   dot: 'bg-violet-400'  },
  { border: 'border-l-amber-500',    badge: 'bg-amber-50   text-amber-700',    dot: 'bg-amber-400'   },
  { border: 'border-l-sky-500',      badge: 'bg-sky-50     text-sky-700',      dot: 'bg-sky-400'     },
  { border: 'border-l-rose-500',     badge: 'bg-rose-50    text-rose-700',     dot: 'bg-rose-400'    },
  { border: 'border-l-teal-500',     badge: 'bg-teal-50    text-teal-700',     dot: 'bg-teal-400'    },
]

// shows all entries loaded from mongodb in a card grid
// loading prop controls whether to show the spinner or the cards
function SavedEntries({ entries, loading }: Props) {

  // spinner while data is loading from the database
  if (loading) {
    return (
      <div className="flex items-center justify-center py-14 text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        <span className="text-sm">Loading entries...</span>
      </div>
    )
  }

  // empty state when no entries exist yet
  if (entries.length === 0) {
    return (
      <div className="text-center py-14 text-gray-400">
        <Layers className="w-9 h-9 mx-auto mb-3 opacity-25" />
        <p className="text-sm font-medium">No entries saved yet</p>
        <p className="text-xs mt-1 text-gray-300">Fill the form above and click Save to Database</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {entries.map((entry, idx) => {
        // pick an accent color that cycles through the list
        const accent = cardAccents[idx % cardAccents.length]

        return (
          <div
            key={entry._id}
            className={`
              bg-white rounded-xl border border-gray-100 border-l-4 ${accent.border}
              shadow-sm hover:shadow-lg hover:-translate-y-1
              transition-all duration-200 overflow-hidden
            `}
          >
            {/* card header strip */}
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-start justify-between gap-2 mb-2">

                {/* title */}
                <h3 className="font-bold text-gray-800 text-sm leading-snug truncate flex-1">
                  {entry.title}
                </h3>

                {/* field count badge with accent color */}
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${accent.badge}`}>
                  {entry.fields.length} {entry.fields.length === 1 ? 'field' : 'fields'}
                </span>
              </div>

              {/* saved date */}
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <CalendarDays className="w-3 h-3 shrink-0" />
                <span>
                  {new Date(entry.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* divider */}
            <div className="h-px bg-gray-100 mx-4" />

            {/* field rows */}
            <div className="px-4 py-3 space-y-2">
              {entry.fields.map((field, fieldIdx) => (
                <div
                  key={fieldIdx}
                  className="flex items-center gap-2 group"
                >
                  {/* colored dot indicator */}
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${accent.dot}`} />

                  {/* label */}
                  <span className="text-xs font-semibold text-gray-500 w-24 shrink-0 truncate">
                    {field.label}
                  </span>

                  {/* separator */}
                  <span className="text-gray-200 text-xs">—</span>

                  {/* value */}
                  <span className="text-xs text-gray-700 font-medium flex-1 truncate">
                    {field.value}
                  </span>
                </div>
              ))}
            </div>

          </div>
        )
      })}
    </div>
  )
}

export default SavedEntries
