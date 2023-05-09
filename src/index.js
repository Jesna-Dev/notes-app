import './index.css'

import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App'
import NoteDetails from './NoteDetails'
import NoteList from './NotesList'
import React from 'react'
import ReactDOM from 'react-dom/client'

const router = createBrowserRouter([
  {
    path: '/',
    element: <NoteList />
  },
  {
    path: '/notes/:id',
    element: <NoteDetails />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <RouterProvider router={router}>
    <App />
    <Route path="/" element={<NoteList />} />
  </RouterProvider>
)
