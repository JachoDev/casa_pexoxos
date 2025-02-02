import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  View,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import Navbar from '../components/sections/Navbar';
import background from '../assets/images/Red_Background.png';
import InventoryList from '../components/ui/Lists/InventoryList';
import RNPrint from 'react-native-print';
import {Flyout} from 'react-native-windows';
import InventoryForm from '../components/ui/forms/InventoryForm';
import {getUrl, testRef} from '../services/firebase/storage/storageService';
import NewPasswordForm from '../components/ui/forms/NewPasswordForm';
import {userLogged} from '../services/firebase/firestore/firestoreService';
import {useNavigation} from '@react-navigation/native';
//import { multiply } from '../../modules/react-native-file/src';

type UserProps = PropsWithChildren<{
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
      alignContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    inventoryListView: {
      width: 500,
      height: 400,
      marginTop: 15,
      backgroundColor: '#',
      alignSelf: 'center',
    },
    inventoryAddButton: {
      marginTop: 40,
      width: 250,
      alignSelf: 'center',
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
    image: {
      width: 150,
      height: 150,
    },
    rowContainer: {
      flexDirection: 'row',
    },
    profileContainer: {
      width: 350,
      height: 400,
      alignSelf: 'center',
      justifyContent: 'center',
      alignContent: 'center',

      marginHorizontal: 80,
      marginVertical: 100,
    },
  });

function User({title}: UserProps): React.JSX.Element {
  const styles = createStyles();
  const [showFlyout, setShowFlyout] = useState(false);
  const navigation = useNavigation();

  const onLogOut = () => {
    Alert.alert(
      'Cerrar Serión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Sí',
          onPress: () => {
            try {
              userLogged.pop();
              navigation.navigate('LogIn');
            } catch (e) {
              console.log(e);
            }
            console.log('Yes pressed');
          },
        },
        {
          text: 'No',
          onPress: () => {
            console.log('No pressed');
          },
        },
      ],
    );
  };

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
            <InventoryForm onSend={() => setShowFlyout(false)} isNew={true} />
          </View>
        </Flyout>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.imageBackgorund}>
          <Navbar title="" />
          <View style={styles.rowContainer}>
            <View style={styles.profileContainer}>
              <NewPasswordForm />
              <View style={styles.inventoryAddButton}>
                <Button
                  title="Cerrar Sesión"
                  onPress={() => {onLogOut()}}
                  color={'#b53a43'}
                />
              </View>
            </View>
            <View>
              <View style={styles.inventoryAddButton}>
                <Button
                  title="Agregar producto"
                  onPress={() => {
                    setShowFlyout(true);
                  }}
                  color={'#e94b57'}
                />
              </View>
              <View style={styles.inventoryListView}>
                <InventoryList title="" />
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

export default User;
