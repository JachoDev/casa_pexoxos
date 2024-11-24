import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import cat from '../../../assets/images/gatoicon.png';
import dog from '../../../assets/images/perroicon.png';
import bird from '../../../assets/images/tusyicon.png';
import CatButton from './CatButton';
import DogButton from './DogButton';
import BirdButton from './BirdButton';

const createStyles = (isHovered: boolean, _isPressing: boolean) =>
  StyleSheet.create({
    container: {
      marginTop: 20,
      alignSelf: 'stretch',
      width: 400,
      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
    },
    petBackground: {
      borderRadius: 10,
    },
    petRow:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    catButton: {
      backgroundColor: '#f19a56',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      width: 80,
      height: 100,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
    },
    birdButton: {
      backgroundColor: '#f19a56',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      width: 80,
      height: 100,
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
    },
    dogButton: {
      backgroundColor: '#cbc5c5',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      width: 100,
      height: 120,
      position: 'static',
    },
    petImage: {
      width: isHovered ? 260 : 250,
      height: isHovered ? 60 : 50,
    },
    catImage: {
      alignSelf: 'center',
      width: isHovered ? 260 : 250,
      height: isHovered ? 60 : 50,
      marginRight: 100,
    },
    birdImage: {
      alignSelf: 'center',
      width: 250,
      height: 50,
      marginLeft: 100,
    },
    petText: {
      color: 'black',
      fontSize: 12,
    },
    iconImage: {
      width: isHovered ? 255 : 250,
      height: isHovered ? 55 : 50,
    },
    iconTitle: {
      color: 'black',
      alignSelf: 'center',
      fontSize: 11,
    },
  });

type NavbarProps = PropsWithChildren<{
  title: string;
}>;

function PetButton(props: NavbarProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const styles = createStyles(isHovered, isPressing);

  const onPress = ()=> {};

  return (
    <>
			<View style={styles.container}>
        <View style={styles.petBackground}>
          <View style={styles.petRow}>
            <CatButton title='Gatos' filter='' image={cat}/>
            <DogButton title='Perros' filter='' image={dog}/>
            <BirdButton title='Razas Pequeñas' filter='' image={bird}/>
          </View>
        </View>
			</View>
		</>
  );
}

export default PetButton;
