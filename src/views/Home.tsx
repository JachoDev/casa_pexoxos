import React, {useState} from 'react';
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
import {useTheme} from '@react-navigation/native';
import SearchBar from '../components/sections/SearchBar';
import PetButton from '../components/ui/buttons/PetButton';
import logo from '../assets/images/image_banner.png';
import pexoxos from '../assets/images/pexoxos.png';
import animals from '../assets/images/animals.png';
import background from '../assets/images/orange_background.png';
import ServiceList from '../components/ui/Lists/ServiceList';
import {Flyout} from 'react-native-windows';
import {
  clientsList,
  salesList,
} from '../services/firebase/firestore/firestoreService';
import ReminderList from '../components/ui/Lists/ReminderList';

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
      width: '72%',
      height: '100%',
      marginHorizontal: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    homeView: {
      width: '100%',
      height: '50%',
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginTop: 90,
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    textStyl: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'condensed',
    },
    notificationBox: {
      width: '20%',
      height: '120%',
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
    title: {
      width: '100%',
      height: '10%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2e2e2e',
    },
  });

function Home({children, title}: HomeProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [showFlyout, setShowFlyout] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Flyout
          isOpen={showFlyout}
          onDismiss={() => setShowFlyout(false)}
          horizontalOffset={600}
          verticalOffset={600}>
          <Pressable
            style={[styles.flyer]}
            onPress={() => setShowFlyout(false)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </Flyout>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.imageBackgorund}>
          <Navbar title="" />
          <View style={styles.homeView}>
            <View style={styles.carouselSection}>
              <ServiceList title={''} />
            </View>
            <View style={styles.notificationBox}>
              <View style={styles.title}>
                <Text style={styles.textStyl}>Recordatorios</Text>
              </View>
              <ReminderList title={''} />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

export default Home;
