import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ImageBackground,
  Modal,
  Pressable,
} from 'react-native';
import Navbar from '../components/sections/Navbar';
import { useTheme } from '@react-navigation/native';
import SearchBar from '../components/sections/SearchBar';
import PetButton from '../components/ui/buttons/PetButton';
import logo from '../assets/images/image_banner.png';
import pexoxos from '../assets/images/pexoxos.png';
import animals from '../assets/images/animals.png';
import background from '../assets/images/orange_background.png';
import ServiceList from '../components/ui/Lists/ServiceList';
import { Flyout } from 'react-native-windows';
import { clientsList, salesList } from '../services/firebase/firestore/firestoreService';

type HomeProps = PropsWithChildren<{
  title: string;
}>;

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      width: '100%',
      height: '100%',
      alignContent: 'flex-start',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    imageBackgorund: {
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    homeSection: {
      width: '100%',
      height: 'auto',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      paddingHorizontal: 100,
      marginTop: 20,
    },
    carouselSection: {
      width: 'auto',
      height: '100%',
      marginHorizontal: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    homeView: {
      width: '100%',
      height: '50%',
      paddingHorizontal: 20,
      marginTop: 10,
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    textStyl: {
      color: 'white',
      fontSize: 18,
    },
    notificationBox: {
      width: '100%',
      height: 150,
      backgroundColor: '#0000007f',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    flyer: {
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
    },
    textStyle: {
      color: 'black',
      fontSize: 18,
    },
  });

function Home({children, title}: HomeProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [showFlyout, setShowFlyout] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Flyout isOpen={showFlyout} onDismiss={() => setShowFlyout(false)} horizontalOffset={600} verticalOffset={600} >
              <Pressable
                style={[styles.flyer]}
                onPress={() => setShowFlyout(false)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
        </Flyout>
        <ImageBackground source={background} resizeMode='cover' style={styles.imageBackgorund} >
          <Navbar title='' />
          <View style={styles.homeSection}>
            <View style={styles.notificationBox}>
              <Text style={styles.textStyl}> Notificaciones</Text>
            </View>
          </View>
          <View style={styles.homeView}>
              <View style={styles.carouselSection}>
                <ServiceList title={''} />
              </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
		</>
  );
}

export default Home;
