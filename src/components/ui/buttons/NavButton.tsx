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

const createStyles = (isHovered: boolean, _isPressing: boolean) =>
  StyleSheet.create({
    iconImage: {
      width: isHovered ? 55 : 45,
      height: isHovered ? 55 : 45,
      opacity: _isPressing ? 0.2 : 1,
      alignSelf: 'center',
    },
    iconTitle: {
      color: '#2e2e2e',
      alignSelf: 'center',
      fontSize: 12,
      fontWeight: 'bold'
    },
  });

type NavButtonProps = PropsWithChildren<{
  title: string;
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
        <Image style={styles.iconImage} source={props.image} resizeMode='contain'/>
        <Text style={styles.iconTitle}> {props.title} </Text>
      </Pressable>
		</>
  );
}

export default NavButton;
