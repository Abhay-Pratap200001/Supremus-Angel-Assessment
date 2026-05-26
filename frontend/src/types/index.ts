// types used in this app

// one field row - has unique id, a label and a value
export interface Field {
  id: string
  label: string
  value: string
}

// what we send to the backend when saving
export interface FormPayload {
  title: string
  fields: { label: string; value: string }[]
}

// one saved entry that comes back from the database
export interface FormEntry {
  _id: string
  title: string
  fields: { label: string; value: string }[]
  createdAt: string
}
