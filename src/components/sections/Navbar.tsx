import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme, useIsFocused, useNavigation} from '@react-navigation/native';
import calendar from '../../assets/images/icons/calendar.png'
import lodging from '../../assets/images/icons/lodging.png'
import payday from '../../assets/images/icons/payday.png'
import petGrooming from '../../assets/images/icons/pet-grooming.png'
import user from '../../assets/images/icons/user.png'
import logo from '../../assets/images/image_banner.png'
import NavButton from '../ui/buttons/NavButton';

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: '80%',
      height: '10%',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: '#00000029',
      borderRadius: 10,
    },
    shadowContainer: {
      width: '100%',
      height: '90%',
      backgroundColor: '#ffffffea',
      borderRadius: 15,
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'space-between',
      justifyContent: 'space-between',
      paddingHorizontal: 50,
    },
    gradient: {
      width: '100%',
      flex: 1,
    },
    gradientRow: {
      width: '99.8%',
      height: '100%',
      flexDirection: 'row',
      borderRadius: 23,
      alignSelf: 'center',
    },
    gradientCenter: {
      width: '100%',
      flex: 10,
    },
    gradientSide: {
      flex: 1,
    },
    iconImage:{
      width: 'auto',
      height: 'auto',
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
        <View style={styles.gradientRow}>
          <View style={styles.gradientCenter}>
            <LinearGradient
              style={styles.gradient}
              colors={['#26262602', '#26262699']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1.5}}
            />
            <LinearGradient 
              style={styles.gradient}
              colors={['#26262699', '#26262602']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1.9}}
          />
          </View>
        </View>
        <View style={styles.shadowContainer}>
          <NavButton title='Pexoxos' route='Pets' image={logo} />
          <NavButton title='Servicios' route='Home' image={petGrooming}/>
          <NavButton title='Agendar' route='Schedule' image={calendar}/>
          <NavButton title='Hospedaje' route='Lodging' image={lodging}/>
          <NavButton title='Cuentas' route='Sales' image={payday}/>
          <NavButton title='Usuario' route='User' image={user}/>
        </View>
			</View>
		</>
  );
}

export default Navbar;
