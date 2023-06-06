import PropTypes from 'prop-types';
import React from 'react';
import YouTube from 'react-youtube';

function PlayerYoutube({ linkVideo }) {
  const getVideoId = (link) => {
    // Extrai o ID do vídeo do link
    const videoId = link.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    const ampersandPositionIndex = -1;
    if (ampersandPosition !== ampersandPositionIndex) {
      return videoId.substring(0, ampersandPosition);
    }
    return videoId;
  };

  const videoId = getVideoId(linkVideo);
  const opts = {
    height: '144',
    width: '240',
  };

  return (
    <YouTube videoId={ videoId } opts={ opts } />
  );
}

PlayerYoutube.propTypes = {
  linkVideo: PropTypes.string.isRequired,
};

export default PlayerYoutube;
