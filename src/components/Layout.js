import { AddCircleOutlineOutlined, ChevronLeft, MenuSharp, SubjectOutlined } from "@mui/icons-material";
import { Drawer, Typography, List, ListItem, ListItemButton, ListItemText, ListItemIcon, AppBar, Toolbar, Avatar, IconButton, Divider} from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {makeStyles} from "@mui/styles"
import React from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import { purple } from "@mui/material/colors";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";


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

const Layout = ({ children, token, setToken }) => {
  const history = useHistory()
  const classes = useStyles()
  const location = useLocation()

  const [name, setName] = useState('user404')
  const db = getFirestore()
  useEffect(() => {
    let docData
    const fetchSmth = async () => {
      try {
        const docSnap = await getDoc(doc(db, "users", token))
        docData = docSnap.data()
      }catch (error) {
        console.log(error.message);
      }
      if (token) setName(docData.first_name)
    }
    if(token) fetchSmth()
  }, [token])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    handleClose()
    setToken(null)
    setName('user404')
    history.push('/signin')
    localStorage.removeItem('token')
  }

  const [appOpen, setAppOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setAppOpen(true);
  };

  const handleDrawerClose = () => {
    setAppOpen(false);
  };

  return (
    <div className={classes.root}>
    {/* App Bar */}
    <AppBar
    // color="common"
    sx={{
      backgroundColor: purple[200],
      width: `100%`
    }}
    elevation={0}
    position="fixed"
    open={appOpen}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(appOpen && { display: 'none' }) }}
        >
          <MenuSharp />
        </IconButton>
        <Typography sx={{
          flexGrow: 1
        }}>
        {format(new Date(), "do 'of' MMMM Y")}
        </Typography>
        <Typography>{name}</Typography>
        <Avatar
        sx={{
          marginLeft: 2
        }}
        src="mario-av.png"
        onClick={handleClick}
        />
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
      </Toolbar>
    </AppBar>

    {/* Side Bar */}
      <Drawer
      className={classes.drawer}
      variant={appOpen ? 'permanent': 'persistent'}
      anchor="left"
      classes={{paper: classes.drawerPaper}}
      sx={{
      display: appOpen ? 'block' : 'none',
      zIndex: 10000,
      position: 'fixed'
      }}
      >
        <div className={ classes.header }
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        >
          <Typography variant="h5" sx={{display: 'inline'}}>Note Pad</Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft/>
          </IconButton>
        </div>
        <Divider />
        <List>
          {items.map(item => (
            <ListItem
              disablePadding
              key={item.text}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemButton
                disabled={token ? false : true}
                onClick={() => history.push(item.path)}
              >
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