import { DeleteOutlined } from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Avatar, Card, CardContent, CardHeader, Container, IconButton, Typography } from '@mui/material'
import { blue, green, pink, yellow } from '@mui/material/colors';

const NotesCard = ( {notes, handleDelete, handleEdit} ) => {
  const bgColor = {
    backgroundColor: () => {
      if (notes.category == 'Work') {
        return yellow[700]
      }
      if (notes.category == 'Money') {
        return green[500]
      }
      if (notes.category == 'Todos') {
        return pink[500]
      }
      return blue[500]
    },
  }
  

  return ( 
    <div>
      <Card elevation={2}>
        <CardHeader
          avatar={
            <Avatar sx={{...bgColor}}>
            {notes.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <>
              <IconButton onClick={() => handleEdit(notes.id, notes.title, notes.details, notes.category)}>
                <EditOutlinedIcon/>
              </IconButton>
              <IconButton onClick={() => handleDelete(notes.id)}>
                <DeleteOutlined/>
              </IconButton>
            </>
          }
          title={notes.title}
          subheader={notes.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {notes.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
   );
}
 
export default NotesCard;