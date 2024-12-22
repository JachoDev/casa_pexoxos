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
import Svg, { Path, SvgXml } from 'react-native-svg';
import arrow from '../../../assets/images/arrow.svg';
import Icon from 'react-native-vector-icons/FontAwesome';

const createStyles = (isHovered: boolean, _isPressing: boolean) =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: isHovered ? 460 : 230,
      height: isHovered ? 190 : 95,
      alignContent: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#eeeeee',
      borderRadius: 10,
      marginVertical: 25,
      marginHorizontal: 15,
      flexDirection: 'row',
      opacity: _isPressing ? .2 : 1
    },
    imageView: {
      flex: 7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageCircle: {
      width: isHovered ? 160 : 80,
      height: isHovered ? 160 : 80,
      borderRadius: 10,
    },
    image: {
      width: isHovered ? 160 : 80,
      height: isHovered ? 160 : 80,
    },
    textView: {
      flex: 9,
      alignContent: 'center',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    textRow: {
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    textStyle: {
      color: 'black',
      fontSize: isHovered ? 18 : 9,
      fontWeight: isHovered ? 'bold' : '100',
    },
    textTag: {
      color: 'black',
      fontSize: isHovered ? 19 : 10,
      fontWeight: isHovered ? 'bold' : '100',
      marginRight: 4,
    },
    arrowView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pageTitle: {
      // https://github.com/microsoft/WinUI-Gallery/blob/c3cf8db5607c71f5df51fd4eb45d0ce6e932d338/WinUIGallery/HomePage.xaml#L82
      // TitleLargeTextBlockStyle
      fontSize: 20,
      fontWeight: '600', // SemiBold
      paddingLeft: 36,
      color: '#000000'
    },
  });

type LodgingCardProps = PropsWithChildren<{
  name: string;
  inDate: string;
  outDate: string;
  time: string;
  petImage: string;
  color: string;
}>;

function LodgingCard(props: LodgingCardProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const {colors} = useTheme();
  const styles = createStyles(isHovered, isPressing);
  const ima = props.petImage;

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
          <View style={styles.imageView}>
            <View style={styles.imageCircle}>
              <Image style={styles.image} source={require('../../../assets/images/dog.png')} resizeMode='stretch'/>
            </View>
          </View>
          <View style={styles.textView}>
            <View style={styles.textRow}>
              <Text style={styles.textTag}>
                Mascota:
              </Text>
              <Text style={styles.textStyle}>
                {props.name}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textTag}>
                Entrada:
              </Text>
              <Text style={styles.textStyle}>
                {props.inDate}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textTag}>
                Salida:
              </Text>
              <Text style={styles.textStyle}>
                {props.outDate}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textTag}>
                Entrega:
              </Text>
              <Text style={styles.textStyle}>
                {props.time}
              </Text>
            </View>
          </View>
          <View style={[styles.arrowView, {backgroundColor: props.color}]}>
          </View>
        </View>
      </Pressable>
			
		</>
  );
}

export default LodgingCard;
