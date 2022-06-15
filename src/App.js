import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, green, lightGreen } from "@mui/material/colors";
import Layout from "./components/Layout";

const theme = createTheme({
  palette: {
    secondary: purple,
    tertiary: green[50]
  },
  typography: {
    fontFamily: "Quicksand",
  },
});

const fruit1 = "Hacked"
const fruit2 = "Lorem bla bla"
const fruit3 = "I don't even know"

function doThisThing(){
  fetch('http://localhost:8000/notes/17', {
    method: 'POST',
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({ fruit1, fruit2, fruit3 })
  })
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Notes />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
