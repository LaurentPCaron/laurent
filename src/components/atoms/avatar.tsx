import React from 'react';

const PHAvatar = require('../../images/placeHolders/PHAvatar.png');

const Avatar = (props: IAvatar) => {
  const { src = PHAvatar, alt = 'PlaceHolderImage' } = props;

  return (
    <img
      className="ui small circular image"
      src={src}
      alt={alt}
      style={{
        borderRadius: '50%',
        padding: 0,
        maxHeight: '10em',
        maxWidth: '10em',
      }}
    />
  );
};

interface IAvatar {
  src?: string;
  alt?: string;
}

export default Avatar;
