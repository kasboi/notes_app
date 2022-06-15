import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import { Drawer, Typography, List, ListItem, ListItemButton, ListItemText, ListItemIcon, AppBar, Toolbar, Avatar} from "@mui/material";
import {makeStyles} from "@mui/styles"
import React from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import { purple } from "@mui/material/colors";

const drawerWidth = 240
const useStyles = makeStyles((theme) => {
  return {
    drawer: {
      width: drawerWidth
    },
    page: {
      background: '#F9F9D5',
      width: '100%',
      padding: theme.spacing(3)
    },
    drawerPaper: {
      width: drawerWidth
    },
    root: {
      display: "flex"
    },
    active: {
      background: '#f4f4f4'
    },
    header: {
      margin: theme.spacing(2)
    },
    toolbar: theme.mixins.toolbar,
  }
})
const items = [
  {
    text: 'My Notes',
    icon: <SubjectOutlined color='secondary'/>,
    path: '/'
  },
  {
    text: 'Create Note',
    icon: <AddCircleOutlineOutlined color='secondary'/>,
    path: '/create'
  }
]

const Layout = ({ children }) => {
  const history = useHistory()
  const classes = useStyles()
  const location = useLocation()

  const appBar = {
    backgroundColor: purple[200],
    width: `calc(100% - ${drawerWidth}px)`
  }

  return (
    <div className={classes.root}>
    {/* App Bar */}
    <AppBar
    // color="common"
    sx={{...appBar}}
    elevation={0}
    >
      <Toolbar>
        <Typography sx={{
          flexGrow: 1
        }}>
        {format(new Date(), "'Today is the' do 'of' MMMM Y")}
        </Typography>
        <Typography>Mario</Typography>
        <Avatar
        sx={{
          marginLeft: 2
        }}
        src="mario-av.png"
        />
      </Toolbar>
    </AppBar>

    {/* Side Bar */}
      <Drawer
      className={classes.drawer}
      variant='permanent'
      anchor="left"
      classes={{paper: classes.drawerPaper}}
      >
        <div className={ classes.header }>
          <Typography variant="h5">Note Pad</Typography>
        </div>
        <List>
          {items.map(item => (
            <ListItem
              disablePadding
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemButton>
                <ListItemIcon>{ item.icon }</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>
      <div className={ classes.toolbar }></div>
        { children }
      </div>
    </div>
  );
}
 
export default Layout;