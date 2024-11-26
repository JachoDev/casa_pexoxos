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

const createStyles = (isHovered: boolean, _isPressing: boolean, isSelected: boolean) =>
  StyleSheet.create({
    iconImage: {
      width: isHovered ? 55 : 50,
      height: isHovered ? 55 : 50,
      opacity: _isPressing ? 0.2 : 1,
      alignSelf: 'center',
    },
    iconTitle: {
      color: 'black',
      alignSelf: 'center',
      fontSize: 11,
    },
    petImage: {
      width: isSelected ? 280 : isHovered ? 225 : 220,
      height: isHovered ? 65 : 60,
      marginLeft: 10,
    },
    dogButton: {
      backgroundColor: isSelected ? '#cbc5c5' : '#f19a56',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      width: isSelected ? 100 : 80,
      height: isSelected ? 120 : 100,
      position: 'static',
    },
  });

type DogButtonProps = PropsWithChildren<{
  title: string;
  filter: string;
  image: ImageSourcePropType;
  isSelected: boolean;
  onPress: Function;
}>;


function DogButton(props: DogButtonProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [isSelected, setIsSelected] = useState(props.isSelected)
  const styles = createStyles(isHovered, isPressing, isSelected);
  const navigation = useNavigation();

  const onPress = () => {props.onPress};

  return (
    <>
      <View style={styles.dogButton}>
        <Pressable 
          onPress={onPress}
          onHoverIn={() => setIsHovered(true)}
          onHoverOut={() => setIsHovered(false)}
          onPressIn={() => setIsPressing(true)}
          onPressOut={() => setIsPressing(false)}
        >
          <Image style={styles.petImage} source={props.image} resizeMode='cover'/>
          <Text style={styles.iconTitle}> {props.title} </Text>
        </Pressable>
      </View>
		</>
  );
}

export default DogButton;
