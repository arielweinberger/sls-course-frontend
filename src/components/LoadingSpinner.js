import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(({ props }) => ({
  spinnerContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    zIndex: 999,
  },
}));

const LoadingSpinner = ({ display }) => {
  const classes = useStyles();

  const displayValue = !!display ? 'flex' : 'none';
  console.log('dValue', displayValue, '/ display', display);

  return (
    <div className={classes.spinnerContainer} style={{ display: displayValue }}>
      <CircularProgress color='secondary' />
    </div>
  );
};

export default LoadingSpinner;