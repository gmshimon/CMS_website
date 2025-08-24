const decodeMethod = item => {
    return item == 'physical-paper'
      ? 'Paper Presentation Physical'
      : item === 'online-paper'
      ? 'Paper Presentation Online'
      : item === 'physical-poster'
      ? 'Poster Presentation Physical'
      : item === 'online-poster'
      ? 'Poster Presentation Online'
      : null
};

export default decodeMethod;