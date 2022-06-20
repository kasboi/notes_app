import { useState, useEffect } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, green, lightGreen } from "@mui/material/colors";
import Layout from "./components/Layout";
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";
import useToken from "./customHooks/useToken";
import app from "./Firebase/auth";

const theme = createTheme({
  palette: {
    secondary: purple,
    tertiary: green[50]
  },
  typography: {
    fontFamily: "Quicksand",
  },
});

function App() {
  const {token, setToken} = useToken()

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [category, setCategory] = useState("Todos")

  let { path, url } = useRouteMatch()

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={() => {
          return token ? (
            children
          ) : (
            <Redirect to="/signin" />
          );
        }}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Layout token={ token } setToken={setToken} >
        <Switch>
          <PrivateRoute exact path="/">
            <Notes setTitle={setTitle} setDetails={setDetails} setCategory={setCategory}
              token={token}
            />
          </PrivateRoute>
          <Route path="/create" render={() => {
            return token ?
            (<Create title={title} setTitle={setTitle} details={details} setDetails={setDetails} 
              category={category} setCategory={setCategory} token={token} />)
              : (<Redirect to="/signin" />)
          }}>
          </Route>
          <Route path="/signin">
            <SignIn setToken={setToken}/>
          </Route>
          <Route path="/signup">
            <SignUp setToken={setToken}/>
          </Route>
        </Switch>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
