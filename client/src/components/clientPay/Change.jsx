import * as React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DateRangeIcon from '@mui/icons-material/DateRange';

export default function Change({ getCount }) {
  const [count, setCount] = React.useState(1);

  React.useEffect(() => {
    getCount(count);
  });
  return (
    <Box
      sx={{
        color: 'action.active',
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          marginBottom: 2,
        },
        '& .MuiBadge-root': {
          marginRight: 4,
        },
      }}
    >
      <div>
        <Badge color='secondary' badgeContent={`${count}`}>
          <DateRangeIcon />
        </Badge>
        <ButtonGroup>
          <Button
            aria-label='reduce'
            onClick={() => {
              if (count !== 1 && count <= 12) {
                setCount(count - 1);
              }
            }}
          >
            <RemoveIcon fontSize='small' />
          </Button>
          <Button
            aria-label='increase'
            onClick={() => {
              if (count < 12) {
                setCount(count + 1);
              }
            }}
          >
            <AddIcon fontSize='small' />
          </Button>
        </ButtonGroup>
      </div>
    </Box>
  );
}
