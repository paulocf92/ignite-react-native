import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

import { PhotoData } from '../../dtos/CarDTO';
import { Bullet } from '../Bullet';

import { Container, ImageIndices, CarImageWrapper, CarImage } from './styles';

interface Props {
  imagesUrl: PhotoData[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndices>
        {imagesUrl.map((item, index) => (
          <Bullet key={item.id} active={index === imageIndex} />
        ))}
      </ImageIndices>

      <FlatList
        data={imagesUrl}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage
              source={{
                uri: item.photo,
              }}
              resizeMode='contain'
            />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
