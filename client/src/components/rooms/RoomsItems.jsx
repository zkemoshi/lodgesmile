import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import AttendantContext from '../../context/attendant/attendantContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@material-ui/styles';

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

const RoomsItems = ({ attendant }) => {
  const classes = useStyle();
  const attendantContext = useContext(AttendantContext);

  const { deleteAttendant, setCurrent } = attendantContext;
  const { _id, name, username, password } = attendant;

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid>
            <Typography>
              <span className={classes.username}>Username:</span>
              {username}
            </Typography>
            <Typography>
              <span className={classes.password}>Password:</span> {password}
            </Typography>
          </Grid>
          <Grid>
            <Typography variant='body2'>
              <EditIcon
                color='success'
                button
                className={classes.cursor}
                onClick={() => setCurrent(attendant)}
              />
              <DeleteIcon
                color='error'
                button
                className={classes.cursor}
                onClick={() => deleteAttendant(_id)}
              />
            </Typography>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default RoomsItems;
