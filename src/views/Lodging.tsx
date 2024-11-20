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
import { useTheme } from '@react-navigation/native';
import SearchBar from '../components/sections/SearchBar';
import PetButton from '../components/ui/buttons/PetButton';
import logo from '../assets/images/image_banner.png';
import pexoxos from '../assets/images/pexoxos.png';
import animals from '../assets/images/animals.png';
import background from '../assets/images/background.png';
import ServiceList from '../components/ui/Lists/ServiceList';

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
  });

function Lodging({ title }: LodgingProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} resizeMode='cover' style={styles.imageBackgorund}>
          <Navbar title='' />
          <View style={styles.homeView}>
            <View>
              <View style={styles.homeSection}>
                <View>
                  <View>
                    <Image source={pexoxos} style={styles.pexoxosStyle}/>
                    <PetButton title={''} />
                  </View>
                </View>
              </View>
              <View style={styles.carouselSection}>
                <ServiceList title={''} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
		</>
  );
}

export default Lodging;
