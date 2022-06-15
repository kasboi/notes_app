import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Typography, Container, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useHistory } from "react-router";

const style = {
  marginTop: 2,
  marginBottom: 2,
  display: 'block'
}

export default function Create() {

const [title, setTitle] = useState('')
const [details, setDetails] = useState('')
const [titleError, setTitleError] = useState(false)
const [detailsError, setDetailsError] = useState(false)
const [category, setCategory] = useState("Todos")

const history = useHistory()


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
    fetch('http://localhost:8000/notes', {
      method: 'POST',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({ title, details, category})
    }).then(() => history.push('/'))
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
        create a New Note
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
