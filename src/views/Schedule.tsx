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
} from 'react-native';
import Navbar from '../components/sections/Navbar';
import { useTheme } from '@react-navigation/native';
import SearchBar from '../components/sections/SearchBar';
import PetButton from '../components/ui/buttons/PetButton';
import logo from '../assets/images/icons/hair-cut.png';
import logo2 from '../assets/images/icons/lodging.png';
import pexoxos from '../assets/images/pexoxos.png';
import animals from '../assets/images/animals.png';
import background from '../assets/images/orange_background.png';
import ServiceList from '../components/ui/Lists/ServiceList';
import { Flyout } from 'react-native-windows';
import DateForm from '../components/ui/forms/DateForm';
import LodgingForm from '../components/ui/forms/LodgingForm';

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
    imageAnimals: {
      width: 300,
      height: 150,
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
    scheduleButton: {
      paddingTop: 30,
      width: 150,
    },
    flyer: {
      width: 700,
      height: 650,
      backgroundColor: '#ffffffe0',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-around',
      alignContent: 'center',
      alignSelf: 'center',
      verticalAlign: 'middle',
    },
    flyer2: {
      width: 700,
      height: 680,
      backgroundColor: '#ffffffe0',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-around',
      alignContent: 'center',
      alignSelf: 'center',
      verticalAlign: 'middle',
    },
    textStyle: {
      color: 'black',
    },
  });

function Schedule({children, title}: ScheduleProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [showFlyout, setShowFlyout] = useState(false);
  const [showFlyout2, setShowFlyout2] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Flyout isOpen={showFlyout} onDismiss={() => setShowFlyout(false)} showMode='transient' isLightDismissEnabled={true} isOverlayEnabled={true} placement='bottom' >
              <View
                style={[styles.flyer]}>
                <Text style={styles.textStyle}>Agendar cita</Text>
                <DateForm title={''} onSend={() => setShowFlyout(false)}/>
              </View>
        </Flyout>
        <Flyout isOpen={showFlyout2} onDismiss={() => setShowFlyout2(false)} showMode='transient' isLightDismissEnabled={true} isOverlayEnabled={true} placement='bottom' >
              <View
                style={[styles.flyer2]}>
                <Text style={styles.textStyle}>Agendar hospedaje</Text>
                <LodgingForm title={''} onSend={() => setShowFlyout2(false)}/>
              </View>
        </Flyout>
        <ImageBackground source={background} resizeMode='cover' style={styles.imageBackgorund} >
          <Navbar title=''/>
          <View style={styles.homeView}>
            <View style={styles.scheduleSection}>
              <Image source={logo} style={styles.imageAnimals} resizeMode='contain'/>
              <Text style={styles.scheduleSectionTitle}>Baños y Cortes</Text>
              <Text style={styles.scheduleSectionText}>Seleccione la hora de llegada del pexoxo</Text>
              <View style={styles.scheduleButton}>
                <Button  color='#03bdbf' title='Agendar Cita' onPress={() => setShowFlyout(true)}/>
              </View>
            </View>
            <View style={styles.scheduleSection}>
              <Image source={logo2} style={styles.imageAnimals} resizeMode='contain'/>
              <Text style={styles.scheduleSectionTitle}>Hospedaje y Estancias</Text>
              <Text style={styles.scheduleSectionText}>Seleccione la hora de llegada del pexoxo</Text>
              <View style={styles.scheduleButton}>
                <Button  color='#3ab549' title='Agendar Hospedaje' onPress={() => setShowFlyout2(true)}/>
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
		</>
  );
}

export default Schedule;
