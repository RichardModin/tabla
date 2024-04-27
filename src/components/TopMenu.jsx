import React, { useState } from 'react';
import {
  AppBar, Button, ButtonGroup, Grid, IconButton, TextField, useTheme,
} from '@mui/material';
import { PauseCircle, PlayCircle, StopCircle } from '@mui/icons-material';
import PropTypes from 'prop-types';
import LoadModal from './LoadModal';

function TopMenu(props) {
  const {
    isPlaying,
    songs,
    timeSignature,
    setTimeSignature,
    bpm,
    setBpm,
    title,
    setTitle,
    newCallback,
    saveCallback,
    onDeleteCallback,
    handleLoadCallback,
    playCallBack,
    pauseCallback,
    stopCallback,
  } = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const style = isPlaying ? { color: theme.palette.warning.main } : {};

  const fileButtons = (
    <Grid item xs={12} sm={2} textAlign="left">
      <ButtonGroup>
        <Button onClick={newCallback}>
          New
        </Button>
        <Button onClick={saveCallback}>
          Save
        </Button>
        <Button onClick={() => {
          setOpen(true);
        }}
        >
          Load
        </Button>
      </ButtonGroup>
    </Grid>
  );

  const songButtons = (
    <>
      <Grid item xs={12} sm={1}>
        <TextField
          id="timeSignature"
          label="Time Signature"
          type="number"
          value={timeSignature}
          onChange={(event) => {
            setTimeSignature(Number(event.target.value));
          }}
          variant="standard"
          fullWidth
          focused
        />
      </Grid>
      <Grid item xs={12} sm={1}>
        <TextField
          id="bpm"
          label="BPM"
          type="number"
          value={bpm}
          onChange={(event) => {
            setBpm(Number(event.target.value));
          }}
          variant="standard"
          fullWidth
          focused
        />
      </Grid>
      <Grid item xs={12} sm={1} style={{ paddingLeft: 7, margin: '0 auto' }}>
        <IconButton onClick={playCallBack}>
          <PlayCircle style={style} />
        </IconButton>
        <IconButton onClick={pauseCallback}>
          <PauseCircle />
        </IconButton>
        <IconButton onClick={stopCallback}>
          <StopCircle />
        </IconButton>
      </Grid>
    </>
  );

  const titleField = (
    <Grid item xs={12} sm={7}>
      <TextField
        id="title"
        label="Title"
        type="text"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        variant="standard"
        fullWidth
        focused
      />
    </Grid>
  );

  return (
    <AppBar position="fixed" color="transparent" sx={{ top: 0, bottom: 'auto' }}>
      <Grid
        container
        spacing={2}
        style={{
          marginTop: 5,
          marginLeft: 5,
          marginRight: 5,
        }}
      >
        {titleField}
        {songButtons}
        {fileButtons}
      </Grid>
      <LoadModal
        open={open}
        songs={songs}
        handleClose={() => { setOpen(false); }}
        handleLoad={(event) => {
          handleLoadCallback(event);
        }}
        onDelete={({ uuid: deleteUuid }) => {
          onDeleteCallback(deleteUuid);
        }}
      />
    </AppBar>
  );
}

TopMenu.propTypes = {
  songs: PropTypes.shape({
    syllables: PropTypes.arrayOf(PropTypes.string),
    timeSignature: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  timeSignature: PropTypes.number.isRequired,
  setTimeSignature: PropTypes.func.isRequired,
  bpm: PropTypes.number.isRequired,
  setBpm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  newCallback: PropTypes.func.isRequired,
  saveCallback: PropTypes.func.isRequired,
  onDeleteCallback: PropTypes.func.isRequired,
  handleLoadCallback: PropTypes.func.isRequired,
  playCallBack: PropTypes.func.isRequired,
  pauseCallback: PropTypes.func.isRequired,
  stopCallback: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default TopMenu;
