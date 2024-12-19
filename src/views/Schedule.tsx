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

type ScheduleProps = PropsWithChildren<{
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
    scrollView: {
      paddingRight: 20,
    },
    icon: {
      fontFamily: 'Segoe MDL2 Assets',
      fontSize: 16,
    },
    heroGradient: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    heroBackgroundImage: {
      position: 'absolute',
      resizeMode: 'cover',
      width: '100%',
      height: '99%',
    },
    pageHeader: {},
    pageTitleContainer: {
      height: 204,
      justifyContent: 'center',
    },
    homeSection: {
      flexDirection: 'row',
    },
    pageTitle: {
      // https://github.com/microsoft/WinUI-Gallery/blob/c3cf8db5607c71f5df51fd4eb45d0ce6e932d338/WinUIGallery/HomePage.xaml#L82
      // TitleLargeTextBlockStyle
      fontSize: 40,
      fontWeight: '600', // SemiBold
      paddingLeft: 36,
      color: '#000000'
    },
    imageLogo: {
			width: 350,
			height: 300,
      marginHorizontal: 20,
      marginLeft: 100,
		},
    imageAnimals: {
      width: 300,
			height: 150,
    },
    carouselSection: {
			width: 800,
			height: 300,
      marginHorizontal: 50,
      alignItems: 'center',
      justifyContent: 'center',
		},
    homeView: {
      flexDirection: 'row',
      marginTop: 10,
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    scheduleSection: {
      width: 280,
      height: 500,
      alignSelf: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#6e6e6939',
      borderRadius: 10,
      paddingTop: 30,
    },
    scheduleSectionTitle: {
      paddingTop: 30,
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
    },
    scheduleSectionText: {
      paddingTop: 30,
      color: 'black',
      fontSize: 16,
      justifyContent: 'center',
      textAlign: 'center',
    },
    scheduleDropdown: {
      marginTop: 30,
      height: 30,
      width: 175,
      borderRadius: 5,
      borderColor: 'gray',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropdownText: {
      alignSelf: 'center',
      justifyContent: 'center',
      color: 'gray',
      fontSize: 10,
    },
    scheduleButton: {
      paddingTop: 30,
      width: 150,
    },
    pexoxosStyle: {
      width: 250,
      height: 50,
      marginTop: 20,
    },
    flyer: {
      width: 1000,
      height: 500,
      backgroundColor: '#ffffffa0',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-around',
      alignContent: 'center',
      alignSelf: 'center',
      verticalAlign: 'middle',
    },
    flex1: {
      flex: 1,
    },
    textStyle: {
      color: 'black',
    },
    ss: {
      backgroundColor: 'black',
      color: 'black',
    }
  });

function Schedule({children, title}: ScheduleProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [showFlyout, setShowFlyout] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Flyout isOpen={showFlyout} onDismiss={() => setShowFlyout(false)} showMode='transient-with-dismiss-on-pointer-move-away' isLightDismissEnabled={true} isOverlayEnabled={true} placement='bottom' >

              <View
                style={[styles.flyer]}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </View>

        </Flyout>
        <ImageBackground source={background} resizeMode='cover' style={styles.imageBackgorund} >
          <Navbar title=''/>
          <View style={styles.homeView}>
            <View style={styles.scheduleSection}>
              <Image source={logo} style={styles.imageAnimals} resizeMode='contain'/>
              <Text style={styles.scheduleSectionTitle}>Confirmar hora de cita</Text>
              <Text style={styles.scheduleSectionText}>Seleccione la hora de llegada del pexoxo</Text>
              <View style={styles.scheduleButton}>
                <Button  color='#03bdbf' title='Agendar Cita' onPress={() => setShowFlyout(true)}/>
              </View>
            </View>
            <View style={styles.scheduleSection}>
              <Image source={logo} style={styles.imageAnimals} resizeMode='contain'/>
              <Text style={styles.scheduleSectionTitle}>Confirmar hora de cita</Text>
              <Text style={styles.scheduleSectionText}>Seleccione la hora de llegada del pexoxo</Text>
              <View style={styles.scheduleButton}>
                <Button  color='#03bdbf' title='Agendar Cita' onPress={() => setShowFlyout(true)}/>
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
		</>
  );
}

export default Schedule;
