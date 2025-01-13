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
import CutSaleForm from '../forms/CutSaleForm';
import { Flyout } from 'react-native-windows';
import { petList } from '../../../services/firebase/firestore/firestoreService';

const createStyles = (isHovered: boolean, _isPressing: boolean) =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: isHovered ? 440 : 220,
      height: isHovered ? 170 : 85,
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: '#eeeeee',
      borderRadius: 10,
      paddingTop: 8,
      marginVertical: 25,
      marginHorizontal: 30,
      flexDirection: 'row',
      borderWidth: 2,
      borderColor: '#2e2e2e',
      opacity: _isPressing ? .2 : 1
    },
    imageView: {
      flex: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageCircle: {
      width: isHovered ? 100 : 50,
      height: isHovered ? 100 : 50,
      borderRadius: 30,
    },
    image: {
      width: isHovered ? 110 : 55,
      height: isHovered ? 110 : 55,
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
      fontSize: isHovered ? 18 : 9,
      fontWeight: isHovered ? 'bold' : '100',
    },
    flyer: {
      width: 700,
      height: 800,
      backgroundColor: '#ffffffe0',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-around',
      alignContent: 'center',
      alignSelf: 'center',
      verticalAlign: 'middle',
    },
    textTag: {
      color: 'black',
      fontSize: isHovered ? 18 : 9,
      marginRight: 3,
      fontWeight: isHovered ? 'bold' : '100',
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
    textFlyer: {
      color: 'black',
    },
  });

type ServiceProps = PropsWithChildren<{
  name: string;
  serviceId: string;
  petId: string;
  service: string;
  date: string;
  time: string;
  recomendations: string;
  petImage: string;
  color: string;
}>;

function ServiceCard({ name, service, date, time, color, petImage, recomendations, petId, serviceId }: ServiceProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [showFlyout, setShowFlyout] = useState(false);
  const styles = createStyles(isHovered, isPressing);
  const clientId = petList.find((e) => e.id == petId).clientId

  return (
    <>
      <Flyout isOpen={showFlyout} onDismiss={() => setShowFlyout(false)} showMode='transient' isLightDismissEnabled={true} isOverlayEnabled={true} placement='bottom' >
        <View
          style={[styles.flyer]}>
          <Text style={styles.textFlyer}>Cobrar servicio</Text>
          <CutSaleForm title={''} clientId={clientId} services={service} pets={name} onSend={() => setShowFlyout(false)} serviceId={serviceId}/>
        </View>
      </Flyout>
      <Pressable
        onPress={() => {setShowFlyout(true)}}
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
      </Pressable>
		</>
  );
}

export default ServiceCard;
