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
import background from '../assets/images/Blue_Background.png';
import SearchBar from '../components/sections/SearchBar';
import PetButton from '../components/ui/buttons/PetButton';
import ServiceList from '../components/ui/Lists/ServiceList';
import LodgingList from '../components/ui/Lists/LodgingList';
import lodging from '../assets/images/lodging_title.png';

type LodgingProps = PropsWithChildren<{
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
    imageBackgorund: {
      justifyContent: 'flex-start',
      height: '100%',
    },
    homeSection: {
      flexDirection: 'row',
      alignContent: 'space-between',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
    },
    imageTitle: {
      width: 300,
      height: 100,
      marginBottom: 20,
      marginLeft: 100,
    },
    carouselSection: {
      width: '80%',
      height: '50%',
      marginHorizontal: 50,
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
    },
    homeView: {
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      alignContent: 'space-between',
      justifyContent: 'space-between',
    },
    buttonSection: {
      alignItems: 'center',
    },
  });

function Lodging({title}: LodgingProps): React.JSX.Element {
  const styles = createStyles();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.imageBackgorund}>
          <Navbar title="" />
          <View style={styles.homeView}>
            <View style={styles.homeSection}>
              <View style={styles.buttonSection}>
                <Image source={lodging} style={styles.imageTitle} />
              </View>
            </View>
          </View>
          <View style={styles.carouselSection}>
            <LodgingList title={''} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

export default Lodging;
