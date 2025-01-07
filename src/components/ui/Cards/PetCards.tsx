import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  Pressable,
} from 'react-native';

const createStyles = (isHovered: boolean, _isPressing: boolean) =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: isHovered ? 150 : 120,
      height: isHovered ? 160 : 125,
      alignContent: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#eeeeee',
      borderRadius: 10,
      marginVertical: 30,
      marginHorizontal: 35,
      paddingTop: 5,
      flexDirection: 'row',
      opacity: _isPressing ? .2 : 1
    },
    image: {
      width: isHovered ? 130 : 100,
      height: isHovered ? 130 : 100,
    },
    pageTitle: {
      // https://github.com/microsoft/WinUI-Gallery/blob/c3cf8db5607c71f5df51fd4eb45d0ce6e932d338/WinUIGallery/HomePage.xaml#L82
      // TitleLargeTextBlockStyle
      fontSize: isHovered ? 16 : 12,
      fontWeight: '600', // SemiBold
      color: '#000000',
      paddingLeft: 5,
    },
  });

type PetCardProps = PropsWithChildren<{
  name: string;
  image: string;
}>;

function PetCard(props: PetCardProps): React.JSX.Element {
  const {colors} = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const styles = createStyles(isHovered, isPressing);

  return (
    <>
      <Pressable
        onPress={() => {}}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        onPressIn={() => setIsPressing(true)}
        onPressOut={() => setIsPressing(false)}
      >
        <View style={styles.container}>
          <View >
            <Image style={styles.image} source={require('../../../assets/images/dog.png')} resizeMode='stretch'/>
            <Text style={styles.pageTitle}>
              {props.name}
            </Text>
          </View>
        </View>
      </Pressable>
		</>
  );
}

export default PetCard;
