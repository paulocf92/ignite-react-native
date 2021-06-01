import React from 'react';

import {
  Container,
  ImageIndices,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles';

interface Props {
  imagesUrl: string[];
}

export function ImageSlider({ imagesUrl }: Props) {
  return (
    <Container>
      <ImageIndices>
        <ImageIndex active />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndices>

      <CarImageWrapper>
        <CarImage
          source={{
            uri: imagesUrl[0],
          }}
          resizeMode='contain'
        />
      </CarImageWrapper>
    </Container>
  );
}
