import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import Navbar from '../components/sections/Navbar';
import background from '../assets/images/background_pink.png';
import SearchBar from '../components/sections/SearchBar';
import LodgingList from '../components/ui/Lists/LodgingList';
import PetList from '../components/ui/Lists/PetList';

type PetsProps = PropsWithChildren<{
  title: string;
}>;

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'auto',
      width: '100%',
      alignContent: 'stretch',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: 'white',
    },
    carouselSection: {
      width: 1100,
      height: 450,
      marginHorizontal: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageBackgorund: {
      justifyContent: 'center',
      height: '100%',
    },
  });

function Pets({title}: PetsProps): React.JSX.Element {
  const styles = createStyles();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.imageBackgorund}>
          <Navbar title="" />
          <View style={styles.carouselSection}>
            <PetList title={''} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

export default Pets;
