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

const createStyles = (isDogHovered: boolean, isDogPressing: boolean, isDogSelected: boolean, isCatHovered: boolean, isCatPressing: boolean, isCatSelected: boolean, isBirdHovered: boolean, isBirdPressing: boolean, isBirdSelected: boolean) =>
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
    petText: {
      color: 'black',
      fontSize: 12,
    },
    iconTitle: {
      color: 'black',
      alignSelf: 'center',
      fontSize: 11,
    },
    catImage: {
      width: isCatSelected ? 320 : isCatHovered ? 250 : 240,
      height: isCatHovered ? 60 : 50,
      marginRight: isCatSelected ? 130 : 100,
      opacity: isCatPressing ? 0.2 : 1,
    },
    dogImage: {
      width: isDogSelected ? 280 : isDogHovered ? 225 : 220,
      height: isDogHovered ? 65 : 60,
      opacity: isDogPressing ? 0.2 : 1,
      marginLeft: 10,
      position: 'relative',
    },
    birdImage: {
      width: isBirdSelected ? 330 : isBirdHovered ? 260 : 250,
      height: isBirdHovered ? 60 : 50,
      marginLeft: isBirdSelected ? 150 : 100,
      opacity: isBirdPressing ? 0.2 : 1,
    },
    dogButton: {
      backgroundColor: isDogSelected ? '#cbc5c5' : '#f19a56',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: isDogSelected ? 10 : 0,
      width: isDogSelected ? 100 : 80,
      height: isDogSelected ? 120 : 100,
    },
    catButton: {
      backgroundColor: isCatSelected ? '#cbc5c5' : '#f19a56',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: isCatSelected ? 10 : 0,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      width: isCatSelected ? 100 : 80,
      height: isCatSelected ? 120 : 100,
    },
    birdButton: {
      backgroundColor: isBirdSelected ? '#cbc5c5' : '#f19a56',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: isBirdSelected ? 10 : 0,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      width: isBirdSelected ? 100 : 80,
      height: isBirdSelected ? 120 : 100,
    },
  });

type PetButtonsProps = PropsWithChildren<{
  title: string;
}>;

function PetButton(props: PetButtonsProps): React.JSX.Element {
  const [isDogHovered, setIsDogHovered] = useState(false);
  const [isDogPressing, setIsDogPressing] = useState(false);
  const [isDogSelected, setIsDogSelected] = useState(true);
  const [isCatHovered, setIsCatHovered] = useState(false);
  const [isCatPressing, setIsCatPressing] = useState(false);
  const [isCatSelected, setIsCatSelected] = useState(false);
  const [isBirdHovered, setIsBirdHovered] = useState(false);
  const [isBirdPressing, setIsBirdPressing] = useState(false);
  const [isBirdSelected, setIsBirdSelected] = useState(false);
  const styles = createStyles( isDogHovered, isDogPressing, isDogSelected, isCatHovered, isCatPressing, isCatSelected, isBirdHovered, isBirdPressing, isBirdSelected);
  const onDogPress = () => {
    setIsDogSelected(true);
    setIsCatSelected(false);
    setIsBirdSelected(false);
    //Select dog filter
  };
  const onCatPress = () => {
    if (isCatSelected == false) {
      setIsDogSelected(false);
      setIsCatSelected(true);
      setIsBirdSelected(false);
    }
    
    //Select cat filter
  };
  const onBirdPress = () => {
    setIsDogSelected(false);
    setIsCatSelected(false);
    setIsBirdSelected(true);
    //Select bird filter
  };

  return (
    <>
			<View style={styles.container}>
        <View style={styles.petBackground}>
          <View style={styles.petRow}>
            <View style={styles.catButton}>
              <Pressable 
                onPress={onCatPress}
                onHoverIn={() => setIsCatHovered(true)}
                onHoverOut={() => setIsCatHovered(false)}
                onPressIn={() => setIsCatPressing(true)}
                onPressOut={() => setIsCatPressing(false)}
              >
                <Image style={styles.catImage} source={cat} resizeMode='cover'/>
                <Text style={styles.iconTitle}> Gatos </Text>
              </Pressable>
            </View>
            <View style={styles.dogButton}>
              <Pressable 
                onPress={onDogPress}
                onHoverIn={() => setIsDogHovered(true)}
                onHoverOut={() => setIsDogHovered(false)}
                onPressIn={() => setIsDogPressing(true)}
                onPressOut={() => setIsDogPressing(false)}
              >
                <Image style={styles.dogImage} source={dog} resizeMode='cover'/>
                <Text style={styles.iconTitle}> Perros </Text>
              </Pressable>
            </View>
            <View style={styles.birdButton}>
              <Pressable
                onPress={onBirdPress}
                onHoverIn={() => setIsBirdHovered(true)}
                onHoverOut={() => setIsBirdHovered(false)}
                onPressIn={() => setIsBirdPressing(true)}
                onPressOut={() => setIsBirdPressing(false)}
              >
                <Image style={styles.birdImage} source={bird} resizeMode='cover'/>
                <Text style={styles.iconTitle}> Razas Pequeñas </Text>
              </Pressable>
            </View>
          </View>
        </View>
			</View>
		</>
  );
}

export default PetButton;
