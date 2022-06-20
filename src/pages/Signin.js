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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import app from '../Firebase/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Password } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
const auth = getAuth()

export default function SignIn({ setToken }) {

  const [loading, setLoading] = React.useState(false)

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(email.text == '') {
      setEmail({...email, error: true})
    }
    if(password.text == '') {
      setPassword({...password, error: true})
    }
    if (email.text && password.text){
      setLoading(true)
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.text, password.text)
        // Signed in
        const user = userCredential.user;
        // ...
        setToken(user.uid)
        //.. redirect to homepage
        history.push('/')
      }
      catch(error) {
        setLoading(false)
        setSnack({...snack, state: true, errorMsg: error.message})
      }
    }
  };

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={email.error}
              value={email.text}
              onChange={(e) => setEmail({...email, text: e.target.value})}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={password.error}
              value={password.text}
              onChange={(e) => setPassword({...password, text: e.target.value})}
              autoComplete="current-password"
            />
            <LoadingButton
              loading={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => history.push('/signup')}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
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