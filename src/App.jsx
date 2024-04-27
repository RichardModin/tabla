import React, { useRef, useState } from 'react';
import './App.css';
import {
  AppBar, Container, Grid, Typography,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { v4 as uuidv4 } from 'uuid';
import BolButton from './components/BolButton';
import SyllableCell from './components/SyllableCell';
import allBols from './bols';
import checkIfLocalStorageExists from './helpers';
import TopMenu from './components/TopMenu';
import BeatInterval from './beat-interval';

function App() {
  const [timeSignature, setTimeSignature] = useState(16);
  const [bpm, setBpm] = useState(60);
  const [syllables, setSyllables] = useState([]);
  const [uuid, setUuid] = useState(uuidv4());
  const [editingIndex, setEditingIndex] = useState(-1);
  const [playIndex, setPlayIndex] = useState(-1);
  const [songs, setSongs] = useState(checkIfLocalStorageExists());
  const [title, setTitle] = useState(songs.title || '');
  const [isPlaying, setIsPlaying] = useState(false);
  const beat = useRef(new BeatInterval(bpm));

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const footerColumnStyle = {
    marginTop: 15,
    marginBottom: 15,
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container className="App">
        <TopMenu
          isPlaying={isPlaying}
          songs={songs}
          timeSignature={timeSignature}
          setTimeSignature={(value) => {
            setTimeSignature(value);
          }}
          bpm={bpm}
          setBpm={(value) => {
            setBpm(value);
            beat.current.setBpm(value);
          }}
          title={title}
          setTitle={(value) => {
            setTitle(value);
          }}
          newCallback={() => {
            setUuid(uuidv4());
            setSyllables([]);
            setTitle('');
          }}
          saveCallback={() => {
            const newSongs = { ...songs };
            newSongs[uuid] = {
              syllables, timeSignature, title, bpm,
            };
            localStorage.setItem('tabla-songs', JSON.stringify(newSongs));
            setSongs(newSongs);
          }}
          handleLoadCallback={(event) => {
            const {
              uuid: newUuid,
              syllables: newSyllables,
              timeSignature: newTimeSignature,
              title: newTitle,
            } = event;
            setUuid(newUuid);
            setSyllables(newSyllables);
            setTimeSignature(newTimeSignature);
            setTitle(newTitle);
          }}
          onDeleteCallback={(deleteUuid) => {
            const newSongs = { ...songs };
            delete newSongs[deleteUuid];
            localStorage.setItem('tabla-songs', JSON.stringify(newSongs));
            setSongs(newSongs);
          }}
          playCallBack={() => {
            setIsPlaying(true);
            beat.current.play((event) => {
              setPlayIndex(event % syllables.length);
            });
          }}
          pauseCallback={() => {
            setIsPlaying(false);
            beat.current.pause();
          }}
          stopCallback={() => {
            setPlayIndex(-1);
            setIsPlaying(false);
            beat.current.stop();
          }}
        />
        <Grid container spacing={2} columns={timeSignature} style={{ marginTop: 100 }}>
          {syllables.map((syllable, index) => {
            const key = `syllable-${index}`;
            return (
              <SyllableCell
                syllable={syllable}
                key={key}
                isEditing={editingIndex === index}
                isPlaying={playIndex === index}
                onDelete={() => {
                  const newSyllables = syllables.filter((_, i) => i !== index);
                  setSyllables(newSyllables);
                }}
                onEdit={() => {
                  if (editingIndex === index) {
                    setEditingIndex(-1);
                  } else {
                    setEditingIndex(index);
                  }
                }}
              />
            );
          })}
        </Grid>
        <AppBar position="fixed" color="transparent" sx={{ top: 'auto', bottom: 0 }}>
          <Grid container spacing={2} columns={11}>
            <Grid item xs={12} sm={1} />
            {Object.keys(allBols).map((hand) => {
              const key = `bol-${hand}`;
              return (
                <Grid item xs={12} sm={3} key={key} style={footerColumnStyle}>
                  <Typography variant="h6">
                    {allBols[hand].title}
                  </Typography>
                  {Object.keys(allBols[hand].bols).map((bols) => {
                    const { title: bolTitle } = allBols[hand].bols[bols];
                    const bolKey = `${hand}-${bols}`;
                    return (
                      <BolButton
                        title={bolTitle}
                        key={bolKey}
                        onClick={() => {
                          if (editingIndex !== -1) {
                            const newSyllables = syllables.map((syllable, i) => {
                              if (i === editingIndex) {
                                return bolTitle;
                              }
                              return syllable;
                            });
                            setSyllables(newSyllables);
                            setEditingIndex(-1);
                          } else {
                            setSyllables([...syllables, bolTitle]);
                          }
                        }}
                      />
                    );
                  })}
                </Grid>
              );
            })}
            <Grid item xs={12} sm={1} style={footerColumnStyle}>
              <Typography variant="h6">Util</Typography>
              <BolButton
                title="Rest"
                onClick={() => {
                  setSyllables([...syllables, '_']);
                }}
              />
            </Grid>
          </Grid>
        </AppBar>
      </Container>
    </ThemeProvider>
  );
}

export default App;
