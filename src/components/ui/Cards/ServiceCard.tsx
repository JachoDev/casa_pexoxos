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
      width: 220,
      height: 85,
      alignContent: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#ffffff6f',
      borderRadius: 10,
      paddingTop: 8,
      marginVertical: 40,
      marginHorizontal: 25,
      flexDirection: 'row',
    },
    imageView: {
      flex: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageCircle: {
      width: 50,
      height: 50,
      borderRadius: 30,
    },
    image: {
      width: 55,
      height: 55,
    },
    textView: {
      flex: 12,
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
      fontSize: 9,
      marginRight: 3,
    },
    arrowView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pageTitle: {
      // https://github.com/microsoft/WinUI-Gallery/blob/c3cf8db5607c71f5df51fd4eb45d0ce6e932d338/WinUIGallery/HomePage.xaml#L82
      // TitleLargeTextBlockStyle
      fontSize: 14,
      fontWeight: '600', // SemiBold
      paddingLeft: 36,
      color: '#000000'
    },
  });

type ServiceProps = PropsWithChildren<{
  name: string;
  service: string;
  date: string;
  time: string;
  recomendations: string;
  petImage: string;
  color: string;
}>;

function ServiceCard({ name, service, date, time, color, petImage, recomendations }: ServiceProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const ima = petImage;

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
              {name}
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.textTag}>
              Servicio:
            </Text>
            <Text style={styles.textStyle}>
              {service}
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.textTag}>
              Sugerencias:
            </Text>
            <Text style={styles.textStyle}>
              {recomendations}
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.textTag}>
              Fecha:
            </Text>
            <Text style={styles.textStyle}>
              {date}
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.textTag}>
              Hora:
            </Text>
            <Text style={styles.textStyle}>
              {time}
            </Text>
          </View>
        </View>
        <View style={[styles.arrowView, {backgroundColor: color}]}>
        
        </View>
			</View>
		</>
  );
}

export default ServiceCard;
