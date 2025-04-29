import React, { useRef, useState } from 'react';
import './App.css';
import { Container, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { v4 as uuidv4 } from 'uuid';
import SyllableCell from './components/SyllableCell';
import checkIfLocalStorageExists from './helpers';
import TopMenu from './components/TopMenu';
import BeatInterval from './beat-interval';
import Footer from './components/Footer';

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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container className="App" maxWidth="100%" style={{ overFlowY: 'auto' }}>
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
        <Grid container spacing={0} columns={timeSignature} style={{ marginTop: 25 }}>
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
      </Container>
      <Footer
        editingIndex={editingIndex}
        syllables={syllables}
        setSyllables={setSyllables}
        setEditingIndex={setEditingIndex}
      />
    </ThemeProvider>
  );
}

export default App;
