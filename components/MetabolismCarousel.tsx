import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const MetabolismCarousel = ({ metabolisms, metabolism, setMetabolism, sliderWidth, itemWidth }) => {
  const renderMetabolismItem = ({ item }) => (
    <TouchableOpacity onPress={() => setMetabolism(item.type)}>
      <View style={[styles.carouselItem, metabolism === item.type && styles.carouselItemSelected]}>
        <Image source={item.image} style={styles.carouselImage} />
        <Text style={styles.carouselText}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Carousel
      data={metabolisms}
      renderItem={renderMetabolismItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      inactiveSlideOpacity={0.7}
      inactiveSlideScale={0.9}
      activeSlideAlignment="center"
      containerCustomStyle={styles.carouselContainer}
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginVertical: 15,
  },
  carouselItem: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#333',
    alignItems: 'center',
    padding: 16,
  },
  carouselItemSelected: {
    borderWidth: 2,
    borderColor: '#4b91e2',
  },
  carouselImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  carouselText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 18,
  },
});

export default MetabolismCarousel;
