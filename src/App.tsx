import './App.css';
import Kurdle from './Kurdle/Kurdle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const helpButton = open ? 'simple-popover' : undefined;


  return (
    <ThemeProvider theme={darkTheme}>
      <Popover id={helpButton} open={open} anchorEl={anchorEl} onClose={handleClose}
        anchorOrigin={
          {
            vertical: 'bottom',
            horizontal: 'left',
          }}
      >
        <Typography sx={
          {
            p: 2,
            fontSize: '5vw'
          }}>
          To change the color of an item press space bar. Press enter or return to go to the next box.
        </Typography>
      </Popover>
      <button
        onClick={handleClick}
        className='question-icon'>
        <HelpOutlineIcon sx={{ 'fontSize': '11vw' }} />
      </button>
      <Kurdle></Kurdle>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
