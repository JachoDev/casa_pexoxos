import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  Pressable,
  GestureResponderEvent,
  Alert,
} from 'react-native';
import Svg, {Path, SvgXml} from 'react-native-svg';
import arrow from '../../../assets/images/arrow.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {deleteLodging, petList, updateLodgingList} from '../../../services/firebase/firestore/firestoreService';
import CutSaleForm from '../forms/CutSaleForm';
import LodgingSaleForm from '../forms/lodgingSaleForm';
import {Flyout} from 'react-native-windows';

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
      marginHorizontal: 25,
      flexDirection: 'row',
      opacity: _isPressing ? 0.2 : 1,
      borderWidth: 2,
      borderColor: '#2e2e2e',
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
      color: '#000000',
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
    textFlyer: {
      color: 'black',
    },
  });

type LodgingCardProps = PropsWithChildren<{
  name: string;
  lodgingId: string;
  inDate: string;
  outDate: string;
  petId: string;
  time: string;
  petImage: string;
  color: string;
  size?: string;
  onReset?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function LodgingCard(props: LodgingCardProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [showFlyout, setShowFlyout] = useState(false);
  const styles = createStyles(isHovered, isPressing);
  const clientId = petList.find(e => e.id == props.petId).clientId;
  const pet = petList.find(e => e.id == props.petId);
  const specie = pet.specie;

  const onLongPress = () => {
    Alert.alert(
      'Eliminar',
      '¿Estás seguro de que deseas eliminar este elemento?',
      [
        {
          text: 'Sí',
          onPress: () => {
            try {
              deleteLodging(props.lodgingId);
              updateLodgingList().then(() => props.onReset?.({} as GestureResponderEvent));
              
            } catch (e) {
              console.log(e);
            }
            console.log('Yes pressed');
          },
        },
        {
          text: 'No',
          onPress: () => {
            console.log('No pressed');
          },
        },
      ],
    );
  };

  const onSend = () => {
    setShowFlyout(false);
    props.onReset?.({} as GestureResponderEvent);
  };

  return (
    <>
      <Flyout
        isOpen={showFlyout}
        onDismiss={() => setShowFlyout(false)}
        showMode="transient"
        isLightDismissEnabled={true}
        isOverlayEnabled={true}
        placement="bottom">
        <View style={[styles.flyer]}>
          <Text style={styles.textFlyer}>Cobrar servicio</Text>
          <LodgingSaleForm
            title={''}
            clientId={clientId}
            services={'Hospedaje ' + props.size}
            pets={props.name}
            onSend={onSend}
            serviceId={props.lodgingId}
          />
        </View>
      </Flyout>
      <Pressable
        onPress={() => {
          setShowFlyout(true);
        }}
        onLongPress={onLongPress}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        onPressIn={() => setIsPressing(true)}
        onPressOut={() => setIsPressing(false)}>
        <View style={styles.container}>
          <View style={styles.imageView}>
            <View style={styles.imageCircle}>
              <Image
                style={styles.image}
                source={
                  props.petImage
                    ? {uri: props.petImage}
                    : specie === 'Perro'
                    ? require('../../../assets/images/icons/dog.png')
                    : specie === 'Gato'
                    ? require('../../../assets/images/icons/cat.png')
                    : require('../../../assets/images/icons/bird.png')
                }
                resizeMode="stretch"
              />
            </View>
          </View>
          <View style={styles.textView}>
            <View style={styles.textRow}>
              <Text style={styles.textTag}>Mascota:</Text>
              <Text style={styles.textStyle}>{props.name}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textTag}>Entrada:</Text>
              <Text style={styles.textStyle}>{props.inDate}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textTag}>Salida:</Text>
              <Text style={styles.textStyle}>{props.outDate}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textTag}>Entrega:</Text>
              <Text style={styles.textStyle}>{props.time}</Text>
            </View>
          </View>
          <View
            style={[styles.arrowView, {backgroundColor: props.color}]}></View>
        </View>
      </Pressable>
    </>
  );
}

export default LodgingCard;
