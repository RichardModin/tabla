const checkIfLocalStorageExists = () => {
  const songs = localStorage.getItem('tabla-songs');
  if (!songs) {
    localStorage.setItem('tabla-songs', JSON.stringify({}));
  }
  return songs ? JSON.parse(songs) : {};
};

export default checkIfLocalStorageExists;
