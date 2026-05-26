import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Sprout, Plus, RotateCcw, Loader2, GripVertical, MoreHorizontal, X, Tag, Hash } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import DataPreview from './DataPreview'
import { saveEntry } from '../api/formData.api'
import { Field, FormEntry } from '../types'

interface Props {
  // called after a successful save so parent can update the entries list
  onSave: (newEntry: FormEntry) => void
}

// this component handles creating new entries
// contains the form state, handlers and jsx all in one place
// preview is also shown here since it depends on the form state
function CreateEntry({ onSave }: Props) {

  // form state
  const [title, setTitle] = useState('')
  const [fields, setFields] = useState<Field[]>([
    { id: uuidv4(), label: '', value: '' }
  ])


  // button states
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)



  // add a new empty field at the bottom
  function addField() {
    setFields(prev => [...prev, { id: uuidv4(), label: '', value: '' }])
  }



  // remove one field by its id
  function removeField(id: string) {
    setFields(prev => prev.filter(field => field.id !== id))
  }



  // update label or value when user types in a field input
  function changeField(id: string, key: 'label' | 'value', val: string) {
    setFields(prev =>
      prev.map(field => (field.id === id ? { ...field, [key]: val } : field))
    )
  }



  // reset everything back to one empty field
  function resetForm() {
    setTitle('')
    setFields([{ id: uuidv4(), label: '', value: '' }])
  }



  // validate form and send to backend
  async function handleSave(ev: React.FormEvent) {
    ev.preventDefault()

    // filter out fields with empty label or value
    const goodFields = fields.filter(field => field.label.trim() && field.value.trim())

    if (!title.trim() || goodFields.length === 0) {
      toast.error('Please add a title and at least one complete field')
      return
    }


    setSaving(true)
    try {
      const newEntry = await saveEntry({
        title: title.trim(),
        fields: goodFields.map(field => ({ label: field.label, value: field.value })),
      })
      toast.success('Entry saved successfully!')

      // tell parent about the new entry so it can add it to the list
      onSave(newEntry)

      setSaved(true)
      resetForm()
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error('save failed:', err)
      toast.error('Could not save. Is the server running?')
    }
    setSaving(false)
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

      {/* ── FORM ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-white/50">

        {/* dark green header */}
        <div className="bg-[#1a2e1a] px-5 py-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sprout className="w-4 h-4 text-green-400" />
          </div>
          
          <div>
            <h2 className="text-white font-semibold text-base leading-tight">Form Builder</h2>
            <p className="text-green-300/60 text-xs mt-0.5">Add fields and watch the preview update</p>
          </div>
        </div>

        <div className="p-5">
          <form onSubmit={handleSave}>

            {/* title input with sprout icon */}
            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
                Title
              </label>

              <div className="relative">
                <Sprout className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                <input
                  type="text"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 placeholder:text-gray-300 transition"
                  placeholder="e.g. Employee Info"
                  value={title}
                  onChange={ev => setTitle(ev.target.value)}
                  required
                />
              </div>
            </div>

            {/* fields header with count and add button */}
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Fields
                <span className="ml-1.5 bg-gray-100 text-gray-500 text-xs px-1.5 py-0.5 rounded-full font-bold">
                  {fields.length}
                </span>
              </label>

              <button
                type="button"
                onClick={addField}
                className="flex items-center gap-1 text-xs text-green-700 border border-green-300 bg-green-50 px-3 py-1.5 rounded-lg hover:bg-green-100 transition font-medium">
                <Plus className="w-3.5 h-3.5" />
                Add Field
              </button>
            </div>

            {/* field rows - all inline, no separate component */}
            <div className="fields-list max-h-72 overflow-y-auto mb-5">
              {fields.map((field, i) => (
                <div
                  key={field.id}
                  className="bg-white border border-gray-100 rounded-xl p-3.5 mb-3 hover:border-green-200 hover:shadow-sm transition-all animate-slide-down">
                  {/* field header - grip, number, remove/dots */}
                  <div className="flex items-center gap-2 mb-3">
                    <GripVertical className="w-4 h-4 text-gray-300 cursor-grab flex-shrink-0" />
                    <span className="text-xs text-gray-500 font-medium flex-1">Field {i + 1}</span>

                    {fields.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeField(field.id)}
                        title="Remove this field"
                        className="w-6 h-6 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <MoreHorizontal className="w-4 h-4 text-gray-300" />
                    )}
                  </div>

                  {/* label and value inputs */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Label</label>
                      <div className="relative">
                        <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-300" />
                        <input
                          type="text"
                          className="w-full pl-7 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-gray-50 placeholder:text-gray-300 transition"
                          placeholder="e.g. Name"
                          value={field.label}
                          onChange={ev => changeField(field.id, 'label', ev.target.value)}/>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Value</label>
                      <div className="relative">
                        <Hash className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-300" />
                        <input
                          type="text"
                          className="w-full pl-7 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-gray-50 placeholder:text-gray-300 transition"
                          placeholder="e.g. John"
                          value={field.value}
                          onChange={ev => changeField(field.id, 'value', ev.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* save and reset buttons */}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-[#1a2e1a] text-white py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#243d24] transition disabled:opacity-60 disabled:cursor-not-allowed">
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sprout className="w-4 h-4 text-green-400" />
                )}
                {saving ? 'Saving...' : saved ? 'Saved!' : 'Save to Database'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 border border-gray-200 text-gray-500 rounded-xl text-sm flex items-center gap-1.5 hover:bg-gray-50 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

          </form>
        </div>
      </div>
      {/* ── END FORM ─────────────────────────────────────────── */}

      {/* live preview sits next to the form - needs form state so it lives here */}
      <DataPreview title={title} fields={fields} />

    </div>
  )
}

export default CreateEntry
