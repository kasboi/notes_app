import { Card, CardContent, CardHeader, Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NotesCard from '../components/NotesCard'
import Masonry from '@mui/lab/Masonry'
import { useHistory } from 'react-router-dom'
import useFetch from '../customHooks/useFetch'
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'


export default function Notes({ setTitle, setDetails, setCategory, token }) {

  const db = getFirestore()
  
  const {data: notes, isPending, error, setData: setNotes} = useFetch(token)
  const history = useHistory()

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, `users/${token}/someNotes`, id))

    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }

  const handleEdit = async (id, title, details, category) => {
    setTitle(title)
    setDetails(details)
    setCategory(category)
    history.push('/create')

    await deleteDoc(doc(db, `users/${token}/someNotes`, id))
  }


  return (
    <Container>
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      {notes && <Masonry columns={{ xs: 1, md: 3 }} spacing={1}>
        {notes.map(notes => (
          <div key={notes.id}>
            <NotesCard notes={notes} handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>
        ))}
      </Masonry>}
    </Container>
  )
}