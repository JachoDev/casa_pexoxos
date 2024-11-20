import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {useTheme, useIsFocused, useNavigation} from '@react-navigation/native';
import calendar from '../../assets/images/icons/calendar.png'
import lodging from '../../assets/images/icons/lodging.png'
import payday from '../../assets/images/icons/payday.png'
import petGrooming from '../../assets/images/icons/pet-grooming.png'
import user from '../../assets/images/icons/user.png'

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: '70%',
      height: '10%',
      alignContent: 'center',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#00000029',
      borderRadius: 40,

    },
    shadowContainer: {
      width: '100%',
      height: '98%',
      backgroundColor: '#fffff0',
      borderRadius: 40,
      borderColor: '#cdcdcd29',
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'space-between',
      justifyContent: 'space-between',
      paddingHorizontal: 50,
    },
    iconImage:{
      width: 50,
      height: 50
    },
  });

type NavbarProps = PropsWithChildren<{
  title: string;
}>;


function Navbar({children, title}: NavbarProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();

  return (
    <>
			<View style={styles.container}>
        <View style={styles.shadowContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={styles.iconImage} source={petGrooming}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={styles.iconImage} source={calendar}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Lodging')}>
            <Image style={styles.iconImage} source={lodging}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={styles.iconImage} source={payday}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={styles.iconImage} source={user}/>
          </TouchableOpacity>
        </View>
			</View>
		</>
  );
}

export default Navbar;
