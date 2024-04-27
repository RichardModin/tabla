import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

function BolButton({ title, hand, onClick }) {
  const style = {
    margin: '5px',
  };

  let color;
  switch (hand) {
    case 'rightHand':
      color = 'success';
      break;
    case 'leftHand':
      color = 'primary';
      break;
    case 'bothHands':
      color = 'secondary';
      break;
    default:
      color = 'inherit';
      break;
  }

  return (
    <Button
      variant="outlined"
      size="large"
      color={color}
      style={style}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}

BolButton.propTypes = {
  title: PropTypes.string.isRequired,
  hand: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BolButton;
