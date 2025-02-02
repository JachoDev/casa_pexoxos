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
import {Flyout} from 'react-native-windows';
import PetForm from '../forms/PetForm';
import {
  clientsList,
  deletePet,
  petList,
  updatePetList,
} from '../../../services/firebase/firestore/firestoreService';

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
      marginHorizontal: 50,
      paddingTop: 5,
      flexDirection: 'row',
      opacity: _isPressing ? 0.2 : 1,
      borderWidth: 2,
      borderColor: '#2e2e2e',
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
    flyer: {
      width: 700,
      height: 650,
      backgroundColor: '#ffffffe0',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-around',
      alignContent: 'center',
      alignSelf: 'center',
      verticalAlign: 'middle',
    },
    textStyle: {
      color: 'black',
    },
  });

type PetCardProps = PropsWithChildren<{
  petId: string;
  name: string;
  image?: string;
  onReset?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function PetCard(props: PetCardProps): React.JSX.Element {
  const pet = petList.find(e => e.id == props.petId);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const styles = createStyles(isHovered, isPressing);
  const [showFlyout, setShowFlyout] = useState(false);
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
              deletePet(props.petId);
              updatePetList();
              props.onReset?.({} as GestureResponderEvent);
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
          <Text style={styles.textStyle}>Modificar información</Text>
          <PetForm onSend={onSend} id={props.petId} />
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
          <View>
            <Image
              style={styles.image}
              source={
                (props.image ) ? {uri: props.image} :
                (specie === 'Perro'
                  ? require('../../../assets/images/icons/dog.png')
                  : specie === 'Gato'
                  ? require('../../../assets/images/icons/cat.png')
                  : require('../../../assets/images/icons/bird.png'))
              }
              resizeMode="stretch"
            />
            <Text style={styles.pageTitle}>{props.name}</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}

export default PetCard;
