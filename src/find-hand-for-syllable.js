import allBols from './bols';

function findHandForSyllable(syllable) {
  const hand = Object.entries(allBols)
    .find(([, bols]) => Object.values(bols.bols)
      .some((bol) => bol.title === syllable));

  if (!hand) {
    throw new Error(`No hand found for syllable: ${syllable}`);
  }

  return hand[0];
}

export default findHandForSyllable;
