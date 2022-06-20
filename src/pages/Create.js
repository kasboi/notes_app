import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Typography, Container, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useHistory } from "react-router";
import app from "../Firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const style = {
  marginTop: 2,
  marginBottom: 2,
  display: 'block'
}

export default function Create({ title, setTitle, category, setCategory, details, setDetails, token }) {

const [titleError, setTitleError] = useState(false)
const [detailsError, setDetailsError] = useState(false)

const history = useHistory()

const db = getFirestore()
const doSomething = async (title, details, category) => {
  const docRef = await addDoc(collection(db, `users/${token}/someNotes`), {
    title: title,
    details: details,
    category: category,
    timestamp: serverTimestamp()
  })
}

const handleClick = (e) => {
  e.preventDefault()

  setTitleError(false)
  setDetailsError(false)

  if (title == ''){
    setTitleError(true)
  }

  if (details == ''){
    setDetailsError(true)
  }

  if (title && details) {
    doSomething(title, details, category)
    history.push('/')

    setTitle('')
    setDetails('')
    setCategory('')
  }
  
}
  return (
    <Container>
      <Typography
        color="textSecondary" 
        component="h2" 
        variant="h6" 
        gutterBottom
      >
        create a new note
      </Typography>
      <form 
        noValidate 
        //autocomplete="off"
        onSubmit={handleClick}
        >
      <TextField
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          ...style
        }}
        autoComplete="off"
        variant="outlined"
        label="Name"
        value={ title ? title : ''}
        fullWidth
        required
        error={titleError}
        />
      <TextField
        onChange={(e) => setDetails(e.target.value)}
        sx={{
          ...style
          }}
        variant="outlined"
        label="Details"
        value={ details ? details : ''} 
        fullWidth
        multiline
        rows="4"
        required
        error={detailsError}
      />
      <FormControl sx={{
        ...style
      }}>
        <FormLabel>Note Category</FormLabel>
        <RadioGroup value={ category } onChange={(e) => setCategory(e.target.value)}>
          <FormControlLabel control={<Radio/>} label="Todos" value="Todos" />
          <FormControlLabel control={<Radio/>} label="Money" value="Money" />
          <FormControlLabel control={<Radio/>} label="Reminder" value="Reminder" />
          <FormControlLabel control={<Radio/>} label="Work" value="Work" />
        </RadioGroup>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        endIcon={<KeyboardArrowRightIcon />}
      >
        submit
      </Button>
      </form>
    </Container>
  );
}
