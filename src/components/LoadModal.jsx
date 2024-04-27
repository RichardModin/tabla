import React from 'react';
import {
  Box, Button, Grid, IconButton, Modal, Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import PropTypes from 'prop-types';

function LoadModal({
  open, handleClose, handleLoad, songs, onDelete,
}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: 1,
    border: 1,
    borderColor: 'text.primary',
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h6" component="h2">
              Load
            </Typography>
          </Grid>
          {songs && Object.keys(songs).map((key) => {
            const {
              syllables, timeSignature, title,
            } = songs[key];
            return (
              <React.Fragment key={key}>
                <Grid item xs={11}>
                  <Button
                    key={key}
                    onClick={() => {
                      handleLoad({
                        uuid: key, syllables, timeSignature, title,
                      });
                      handleClose();
                    }}
                    color="inherit"
                    fullWidth
                  >
                    {title !== '' ? title : key}
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                      onDelete({ uuid: key });
                    }}
                    style={{ marginTop: 5 }}
                  >
                    <Delete fontSize="inherit" />
                  </IconButton>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </Box>
    </Modal>
  );
}

LoadModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleLoad: PropTypes.func.isRequired,
  songs: PropTypes.shape({
    syllables: PropTypes.arrayOf(PropTypes.string),
    timeSignature: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LoadModal;
