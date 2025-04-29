import {
  Accordion, AccordionDetails, AccordionSummary, Grid, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { ExpandMore } from '@mui/icons-material';
import allBols from '../bols';
import BolButton from './BolButton';

function Footer(props) {
  const {
    editingIndex, syllables, setSyllables, setEditingIndex,
  } = props;
  return (
    <Accordion
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        maxHeight: '50%',
        width: '100%',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />} />
      <AccordionDetails>
        <Grid container spacing={0}>
          {Object.keys(allBols).map((hand) => {
            const key = `bol-${hand}`;
            return (
              <Grid item xs={3} sm={4} key={key} textAlign="center">
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
                      hand={hand}
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
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

Footer.propTypes = {
  editingIndex: PropTypes.number.isRequired,
  syllables: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSyllables: PropTypes.func.isRequired,
  setEditingIndex: PropTypes.func.isRequired,
};

export default Footer;
