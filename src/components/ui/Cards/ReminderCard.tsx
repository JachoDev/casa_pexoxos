import {useTheme} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  GestureResponderEvent,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
} from 'react-native';
import {Flyout} from 'react-native-windows';
import InventoryForm from '../forms/InventoryForm';
import {
  clientsList,
  deleteInventoryItem,
  petList,
  updateInventory,
} from '../../../services/firebase/firestore/firestoreService';

const createStyles = (isHovered: boolean, _isPressing: boolean) =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: isHovered ? 270 : 265,
      height: isHovered ? 55 : 50,
      alignContent: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#d0dee2',
      borderRadius: 2,
      marginHorizontal: 5,
      marginVertical: 5,
      borderWidth: 2,
      opacity: _isPressing ? 0.2 : 1,
      borderColor: '#2e2e2e',
    },
    rowTile: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 100,
      height: 100,
    },
    pageTitle: {
      // https://github.com/microsoft/WinUI-Gallery/blob/c3cf8db5607c71f5df51fd4eb45d0ce6e932d338/WinUIGallery/HomePage.xaml#L82
      // TitleLargeTextBlockStyle
      width: 'auto',
      fontSize: 18,
      fontWeight: '700', // SemiBold
      color: '#363e4c',
      paddingHorizontal: 5,
      alignSelf: 'center',
      backgroundColor: '#ffffff69',
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

type ReminderCardProps = PropsWithChildren<{
  id: string;
  petId: string;
  checkIn: string;
  grooming: string;
  onReset?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function ReminderCard(props: ReminderCardProps): React.JSX.Element {
  const pet = petList.find(e => e.id == props.petId);
  const client = clientsList.find(e => e.id == pet?.clientId);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const styles = createStyles(isHovered, isPressing);
  const [showFlyout, setShowFlyout] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const onLongPress = () => {
    Alert.alert(
      'Eliminar',
      '¿Estás seguro de que deseas eliminar este elemento?',
      [
        {
          text: 'Sí',
          onPress: () => {
            try {
              deleteInventoryItem(props.id);
              updateInventory();
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
      <Pressable
        onPress={() => {
          setShowFlyout(true);
        }}
        onLongPress={onLongPress}
        onHoverIn={() => {setIsHovered(true)}}
        onHoverOut={() => {setIsHovered(false); scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});}}
        onPressIn={() => setIsPressing(true)}
        onPressOut={() => setIsPressing(false)}>
        <View style={styles.container}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Text style={styles.pageTitle}>{client.name + ' ' + client.lastname}</Text>
            <Text style={styles.pageTitle}>{client.phone}</Text>
            <Text style={styles.pageTitle}>{pet.name}</Text>
            <Text style={styles.pageTitle}>{pet.specie}</Text>
            <Text style={styles.pageTitle}>{props.grooming}</Text>
            <Text style={styles.pageTitle}>{props.checkIn.toDate().toLocaleDateString()}</Text>

          </ScrollView>
        </View>
      </Pressable>
    </>
  );
}

export default ReminderCard;
