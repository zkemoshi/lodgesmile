import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  ListItemAvatar,
  Typography,
  Avatar,
} from '@mui/material';
import React, { useContext } from 'react';
import roomContext from '../../context/room/roomContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@material-ui/styles';
import { deepOrange, deepPurple } from '@mui/material/colors';

const useStyle = makeStyles({
  username: {
    color: '#3f51b5',
  },
  password: {
    color: '#3f51b5',
  },
  cursor: {
    cursor: 'pointer',
  },
});

const RoomsItems = ({ room }) => {
  const classes = useStyle();

  const { deleteRoom, setCurrent } = useContext(roomContext);
  const { _id, name, number } = room;

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>{number}</Avatar>
              <ListItemAvatar>{name}</ListItemAvatar>
            </Stack>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid>
            {/* <Typography>
              <span className={classes.username}>Price: TZS </span>
              {numeral(price).format('0,0')}
            </Typography> */}
          </Grid>
          <Grid>
            <Typography variant='body2'>
              <EditIcon
                color='success'
                button
                className={classes.cursor}
                onClick={() => setCurrent(room)}
              />
              <DeleteIcon
                color='error'
                button
                className={classes.cursor}
                onClick={() => deleteRoom(_id)}
              />
            </Typography>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default RoomsItems;
