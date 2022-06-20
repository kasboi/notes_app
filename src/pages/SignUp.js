import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from '../Firebase/auth';
import { useHistory } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Snackbar } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Notes App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp({ setToken }) {

  const [loading, setLoading] = React.useState(false)
  const [fname, setFname] = React.useState({text: '', error: false})
  const [lname, setLname] = React.useState({text: '', error: false})
  const [email, setEmail] = React.useState({text: '', error: false})
  const [password, setPassword] = React.useState({text: '', error: false})

  const [snack, setSnack] = React.useState({
    state: false,
    errorMsg: ''
  })

  const handleClose = () => {
    setSnack(false);
  };

  const history = useHistory()

  const auth = getAuth()
  const db = getFirestore()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(fname.text == '') {
      setFname({...fname, error: true})
    }
    if(lname.text == '') {
      setLname({...lname, error: true})
    }
    if(email.text == '') {
      setEmail({...email, error: true})
    }
    if(password.text == '') {
      setPassword({...password, error: true})
    }
    if (fname.text && lname.text && email.text && password.text){
      setLoading(true)
      try {
        //... Sign user up
        const userCredential = await createUserWithEmailAndPassword(auth, email.text, password.text)
        //... collect user details afterwards
        const user = userCredential.user
        // create user details in database
        const collectionReference = doc(db, "users", user.uid)
        await setDoc(collectionReference, {
          first_name: fname.text,
          last_name: lname.text,
          email: email.text,
        })
        //..set token
        setToken(user.uid)
        // ..redirect to home page
        history.push('/')
      } catch (error) {
        setLoading(false)
        setSnack({...snack, state: true, errorMsg: error.message})
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={fname.error}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={fname.text}
                  onChange={(e) => setFname({...fname, text: e.target.value})}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={lname.error}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lname.text}
                  onChange={(e) => setLname({...lname, text: e.target.value})}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={email.error}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email.text}
                  onChange={(e) => setEmail({...email, text: e.target.value})}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={password.error}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password.text}
                  onChange={(e) => setPassword({...password, text: e.target.value})}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <LoadingButton
              loading={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={() => history.push('/signin')}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Snackbar
      anchorOrigin={{vertical:"top", horizontal:"center"}}
      open={snack.state}
      onClose={handleClose}  
    >
      <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
        <AlertTitle>Error</AlertTitle>
        {snack.errorMsg}
      </Alert>
    </Snackbar>
    </ThemeProvider>
  );
}