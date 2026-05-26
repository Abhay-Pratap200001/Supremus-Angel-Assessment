import { Leaf } from 'lucide-react'
import { Field } from '../types'

interface Props {
  title: string
  fields: Field[]
}

// live preview panel - shows everything user typed in the form, in real time
// re-renders on every keystroke since state lives in parent App component
function DataPreview({ title, fields }: Props) {

  // only include fields that have something typed in them
  const filledFields = fields.filter(field => field.label || field.value)

  // decide whether to show preview content or the empty state
  const hasData = title.trim() || filledFields.length > 0

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-white/50 h-full">

      {/* preview header with leaf icon and live badge */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Leaf className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800 text-base leading-tight">Live Preview</h2>
            <p className="text-gray-400 text-xs mt-0.5">Updates as you type</p>
          </div>
        </div>

        {/* pulsing live badge */}
        <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-700 text-xs font-bold">LIVE</span>
        </div>
      </div>

      <div className="p-5">

        {/* empty state - plant illustration with message */}
        {!hasData ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-300">

            {/* plant / seedling SVG illustration */}
            <svg
              viewBox="0 0 120 130"
              className="w-24 h-24 mb-4"
              fill="none"
            >
              {/* background circle - misty look */}
              <circle cx="60" cy="75" r="42" fill="#f0f7f0" />
              {/* main stem */}
              <line x1="60" y1="108" x2="60" y2="55" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" />
              {/* left leaf */}
              <path d="M60 80 Q36 65 42 45 Q55 62 60 80" fill="#4ade80" opacity="0.7" />
              {/* right leaf */}
              <path d="M60 68 Q84 53 78 33 Q65 50 60 68" fill="#4ade80" opacity="0.7" />
              {/* top bud */}
              <ellipse cx="60" cy="52" rx="6" ry="8" fill="#22c55e" opacity="0.8" />
              {/* small tree silhouette background */}
              <polygon points="25,108 38,80 51,108" fill="#d1fae5" opacity="0.5" />
              <polygon points="70,108 83,75 96,108" fill="#d1fae5" opacity="0.5" />
            </svg>

            <p className="text-sm text-gray-400">Start typing in the form to see a preview here</p>
          </div>
        ) : (
          // show the actual preview content - fades in when data is there
          <div className="animate-fade-in">

            {/* title shows up as a big heading */}
            {title && (
              <h3 className="text-[#1a2e1a] font-bold text-xl mb-4 pb-3 border-b border-green-100">
                {title}
              </h3>
            )}

            {/* each filled field as a hover-able row */}
            {filledFields.map((field, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 py-2.5 px-3 rounded-lg mb-2 bg-gray-50 border border-gray-100 hover:bg-green-50 hover:border-green-100 transition-colors cursor-default"
                title={`${field.label}: ${field.value}`}
              >
                <span className="text-gray-400 text-xs font-semibold w-24 shrink-0 truncate">
                  {field.label || <em>No label</em>}
                </span>
                <span className="w-px h-4 bg-gray-200 shrink-0" />
                <span className="text-gray-700 text-sm font-medium flex-1">
                  {field.value || <em className="text-gray-300">—</em>}
                </span>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  )
}

export default DataPreview
