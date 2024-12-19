import { useTheme } from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
} from 'react-native';
import Svg, { Path, SvgXml } from 'react-native-svg';
import arrow from '../../../assets/images/arrow.svg';
import Icon from 'react-native-vector-icons/FontAwesome';

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: 230,
      height: 95,
      alignContent: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#eeeeee',
      borderRadius: 10,
      marginVertical: 25,
      marginHorizontal: 15,
      flexDirection: 'row',
    },
    imageView: {
      flex: 7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageCircle: {
      width: 80,
      height: 80,
      borderRadius: 10,
    },
    image: {
      width: 80,
      height: 80,
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
      fontSize: 9,
    },
    textTag: {
      color: 'black',
      fontSize: 10,
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
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const ima = props.petImage;

  return (
    <>
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
		</>
  );
}

export default LodgingCard;
