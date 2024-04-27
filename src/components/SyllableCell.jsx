import React, { useState } from 'react';
import {
  ButtonGroup, Grid, IconButton, Typography, useTheme,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import PropTypes from 'prop-types';

function SyllableCell({
  syllable, onDelete, onEdit, isEditing, isPlaying,
}) {
  const [hover, setHover] = useState(false);
  const theme = useTheme();

  const style = {
    padding: 0,
    border: '1px dotted black',
    paddingTop: 15,
    paddingBottom: 15,
    position: 'relative',
  };

  if (isEditing) {
    style.color = theme.palette.success.main;
  }

  if (isPlaying) {
    style.color = theme.palette.warning.main;
    style.borderColor = theme.palette.warning.main;
  } else {
    style.borderColor = 'black';
  }

  return (
    <Grid
      item
      xs={1}
      style={style}
      onMouseOver={() => { setHover(true); }}
      onMouseOut={() => { setHover(false); }}
      textAlign="center"
    >
      {hover && (
      <ButtonGroup
        variant="contained"
        aria-label="Edit Controls"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        <IconButton aria-label="delete" size="small" onClick={onDelete}>
          <Delete fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="edit" size="small" onClick={onEdit}>
          <Edit fontSize="inherit" />
        </IconButton>
      </ButtonGroup>
      )}
      <Typography variant="h4">
        {syllable}
      </Typography>
    </Grid>
  );
}

SyllableCell.propTypes = {
  syllable: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default SyllableCell;
