import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

function BolButton({ title, onClick }) {
  const style = {
    margin: '5px',
  };
  return (
    <Button
      variant="outlined"
      size="large"
      color="primary"
      style={style}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}

BolButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BolButton;
