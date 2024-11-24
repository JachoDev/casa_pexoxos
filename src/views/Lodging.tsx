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
import background from '../assets/images/background.png';

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
      justifyContent: 'center',
      height: '100%',
    },
  });

function Lodging({ title }: LodgingProps): React.JSX.Element {
  const styles = createStyles();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} resizeMode='cover' style={styles.imageBackgorund}>
          <Navbar title='' />
          
        </ImageBackground>
      </SafeAreaView>
		</>
  );
}

export default Lodging;
