import { Card, CardContent, CardHeader, Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NotesCard from '../components/NotesCard'
import Masonry from '@mui/lab/Masonry'

export default function Notes() {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/notes')
    .then(res => res.json())
    .then(data => setNotes(data))
  }, [])

  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/notes/'+id, {
      method: 'DELETE'
    })
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }

  return (
    <Container>
    <Masonry columns={{ xs: 1, md: 3 }} spacing={1}>
      {notes.map(notes => (
        <div key={notes.id}>
          <NotesCard notes={notes} handleDelete={handleDelete} />
        </div>
      ))}
    </Masonry>
    </Container>
  )
}