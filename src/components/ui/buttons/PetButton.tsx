import { useTheme } from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  Image,
} from 'react-native';
import cat from '../../../assets/images/gatoicon.png';
import dog from '../../../assets/images/perroicon.png';
import bird from '../../../assets/images/tusyicon.png';

const createStyles = () =>
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
      alignSelf: 'center',
      width: 250,
      height: 50,
    },
    catImage: {
      alignSelf: 'center',
      width: 250,
      height: 50,
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
    }
  });

type NavbarProps = PropsWithChildren<{
  title: string;
}>;

function PetButton({children, title}: NavbarProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <>
			<View style={styles.container}>
        <View style={styles.petBackground}>
          <View style={styles.petRow}>
            <View style={styles.catButton}>
              <Image style={styles.catImage} source={cat}/>
              <Text style={styles.petText}>Gatos</Text>
            </View>
            <View style={styles.dogButton}>
              <Image style={styles.petImage} source={dog}/>
              <Text style={styles.petText}>Perros</Text>
            </View>
            <View style={styles.birdButton}>
              <Image style={styles.birdImage} source={bird}/>
              <Text style={styles.petText}>Razas Pequeñas</Text>
            </View>
          </View>
        </View>
			</View>
		</>
  );
}

export default PetButton;
