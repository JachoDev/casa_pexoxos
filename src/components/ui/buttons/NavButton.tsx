import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Pressable,
  ImageSourcePropType,
} from 'react-native';
import {useTheme, useIsFocused, useNavigation} from '@react-navigation/native';
import calendar from '../../assets/images/icons/calendar.png'
import lodging from '../../assets/images/icons/lodging.png'
import payday from '../../assets/images/icons/payday.png'
import petGrooming from '../../assets/images/icons/pet-grooming.png'
import user from '../../assets/images/icons/user.png'
import Navbar from '../../sections/Navbar';

const createStyles = (isHovered: boolean, _isPressing: boolean) =>
  StyleSheet.create({
    iconImage:{
      width: isHovered ? 55 : 50,
      height: isHovered ? 55 : 50,
      opacity: _isPressing ? 0.2 : 1,
    },
  });

type NavButtonProps = PropsWithChildren<{
  route: string;
  image: ImageSourcePropType;
}>;


function NavButton(props: NavButtonProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const styles = createStyles(isHovered, isPressing);
  const navigation = useNavigation();

  return (
    <>
      <Pressable 
        onPress={() => navigation.navigate(props.route)}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        onPressIn={() => setIsPressing(true)}
        onPressOut={() => setIsPressing(false)}

      >
        <Image style={styles.iconImage} source={props.image}/>
      </Pressable>
		</>
  );
}

export default NavButton;
