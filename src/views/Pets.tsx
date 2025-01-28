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
import background from '../assets/images/background_pink.png';
import SearchBar from '../components/sections/SearchBar';
import LodgingList from '../components/ui/Lists/LodgingList';
import PetList from '../components/ui/Lists/PetList';
import { Flyout } from 'react-native-windows';
import PetForm from '../components/ui/forms/PetForm';
import ClientForm from '../components/ui/forms/ClientForm';

type PetsProps = PropsWithChildren<{
  title: string;
}>;

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: '100%',
      alignContent: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    carouselSection: {
      width: '75%',
      height: '60%',
      marginHorizontal: 50,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    imageBackgorund: {
      justifyContent: 'flex-start',
      height: '100%',
    },
    row: {
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingLeft: 0,
      alignItems: 'center',
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
    textStyle: {
      color: 'black',
    },
  });

function Pets({title}: PetsProps): React.JSX.Element {
  const styles = createStyles();
  const [showFlyout, setShowFlyout] = useState(false);
  const [showFlyout2, setShowFlyout2] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Flyout
          isOpen={showFlyout}
          onDismiss={() => setShowFlyout(false)}
          showMode="transient"
          isLightDismissEnabled={true}
          isOverlayEnabled={true}
          placement="bottom">
          <View style={[styles.flyer]}>
            <Text style={styles.textStyle}>Modificar información</Text>
            <PetForm onSend={() => setShowFlyout(false)} isNew={true} />
          </View>
        </Flyout>
        <Flyout
          isOpen={showFlyout2}
          onDismiss={() => setShowFlyout2(false)}
          showMode="transient"
          isLightDismissEnabled={true}
          isOverlayEnabled={true}
          placement="bottom">
          <View style={[styles.flyer]}>
            <Text style={styles.textStyle}>Modificar información</Text>
            <ClientForm onSend={() => setShowFlyout2(false)} isNew={true} />
          </View>
        </Flyout>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.imageBackgorund}>
          <Navbar title="" />
          <View style={styles.row}>
            <Button color="#d1507e" title="Nueva Mascota" onPress={() => {setShowFlyout(true)}} />
            <Button color="#2ca1e9" title="Nuevo Cliente" onPress={() => {setShowFlyout2(true)}} />
          </View>

          <View style={styles.carouselSection}>
            <PetList title={''} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

export default Pets;
