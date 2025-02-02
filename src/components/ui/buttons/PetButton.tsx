import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  Image,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import cat from '../../../assets/images/icons/cat.png';
import dog from '../../../assets/images/icons/dog.png';
import bird from '../../../assets/images/icons/bird.png';

const createStyles = (
  isDogHovered: boolean,
  isDogPressing: boolean,
  isDogSelected: boolean,
  isCatHovered: boolean,
  isCatPressing: boolean,
  isCatSelected: boolean,
  isBirdHovered: boolean,
  isBirdPressing: boolean,
  isBirdSelected: boolean,
) =>
  StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      width: 400,
      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
    },
    petBackground: {
      borderRadius: 10,
    },
    petRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    petText: {
      color: 'black',
      fontSize: 12,
    },
    iconTitle: {
      color: '#2e2e2e',
      alignSelf: 'center',
      fontSize: 12,
      fontWeight: 'bold',
    },
    catImage: {
      alignSelf: 'center',
      width: isCatSelected ? 60 : isCatHovered ? 50 : 40,
      height: isCatSelected ? 60 : isCatHovered ? 50 : 40,
      opacity: isCatPressing ? 0.2 : 1,
    },
    dogImage: {
      alignSelf: 'center',
      width: isDogSelected ? 60 : isDogHovered ? 50 : 40,
      height: isDogSelected ? 60 : isDogHovered ? 50 : 40,
      opacity: isDogPressing ? 0.2 : 1,
    },
    birdImage: {
      alignSelf: 'center',
      width: isBirdSelected ? 60 : isBirdHovered ? 50 : 40,
      height: isBirdSelected ? 60 : isBirdHovered ? 50 : 40,
      opacity: isBirdPressing ? 0.2 : 1,
    },
    dogButton: {
      backgroundColor: !isDogSelected ? '#cbc5c5' : '#dd4881',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: isDogSelected ? 10 : 0,
      width: isDogSelected ? 100 : 80,
      height: isDogSelected ? 120 : 100,
      borderBottomWidth: 2,
      borderTopWidth: 2,
      borderRightWidth: isCatSelected || isDogSelected ? 2 : 0,
      borderLeftWidth: isDogSelected || isBirdSelected ? 2 : 0,
      borderWidth: isDogSelected ? 2 : 0,
      borderColor: '#2e2e2e',
    },
    catButton: {
      backgroundColor: !isCatSelected ? '#cbc5c5' : '#295fb1',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: isCatSelected ? 10 : 0,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      width: isCatSelected ? 100 : 80,
      height: isCatSelected ? 120 : 100,
      borderRightWidth: isCatSelected ? 2 : 0,
      borderWidth: 2,
      borderColor: '#2e2e2e',
    },
    birdButton: {
      backgroundColor: !isBirdSelected ? '#cbc5c5' : '#e94b57',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      borderRadius: isBirdSelected ? 10 : 0,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      width: isBirdSelected ? 100 : 80,
      height: isBirdSelected ? 120 : 100,
      borderLeftWidth: isBirdSelected ? 2 : 0,
      borderWidth: 2,
      borderColor: '#2e2e2e',
    },
  });

type PetButtonsProps = PropsWithChildren<{
  title: string;
  onSelectDog?: null | ((event: GestureResponderEvent) => void) | undefined;
  onSelectCat?: null | ((event: GestureResponderEvent) => void) | undefined;
  onSelectBird?: null | ((event: GestureResponderEvent) => void) | undefined;
  onDeselectFilter?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function PetButton(props: PetButtonsProps): React.JSX.Element {
  const [isDogHovered, setIsDogHovered] = useState(false);
  const [isDogPressing, setIsDogPressing] = useState(false);
  const [isDogSelected, setIsDogSelected] = useState(false);
  const [isCatHovered, setIsCatHovered] = useState(false);
  const [isCatPressing, setIsCatPressing] = useState(false);
  const [isCatSelected, setIsCatSelected] = useState(false);
  const [isBirdHovered, setIsBirdHovered] = useState(false);
  const [isBirdPressing, setIsBirdPressing] = useState(false);
  const [isBirdSelected, setIsBirdSelected] = useState(false);
  const styles = createStyles(
    isDogHovered,
    isDogPressing,
    isDogSelected,
    isCatHovered,
    isCatPressing,
    isCatSelected,
    isBirdHovered,
    isBirdPressing,
    isBirdSelected,
  );
  const onDogPress = () => {
    if (!isDogSelected) {
      props.onSelectDog?.({} as GestureResponderEvent);
    } else {
      props.onDeselectFilter?.({} as GestureResponderEvent);
    }
    setIsDogSelected(!isDogSelected);
    setIsCatSelected(false);
    setIsBirdSelected(false);
    //Select dog filter
  };
  const onCatPress = () => {
    if (!isCatSelected) {
      props.onSelectCat?.({} as GestureResponderEvent);
    } else {
      props.onDeselectFilter?.({} as GestureResponderEvent);
    }
      setIsDogSelected(false);
      setIsCatSelected(!isCatSelected);
      setIsBirdSelected(false);


    //Select cat filter
  };
  const onBirdPress = () => {
    if (!isBirdSelected) {
      props.onSelectBird?.({} as GestureResponderEvent);
    } else {
      props.onDeselectFilter?.({} as GestureResponderEvent);
    }
    setIsDogSelected(false);
    setIsCatSelected(false);
    setIsBirdSelected(!isBirdSelected);
    //Select bird filter
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.petBackground}>
          <View style={styles.petRow}>
            <View style={styles.catButton}>
              <Pressable
                onPress={onCatPress}
                onHoverIn={() => setIsCatHovered(true)}
                onHoverOut={() => setIsCatHovered(false)}
                onPressIn={() => setIsCatPressing(true)}
                onPressOut={() => setIsCatPressing(false)}>
                <Image
                  style={styles.catImage}
                  source={cat}
                  resizeMode="cover"
                />
                <Text style={styles.iconTitle}> Gatos </Text>
              </Pressable>
            </View>
            <View style={styles.dogButton}>
              <Pressable
                onPress={onDogPress}
                onHoverIn={() => setIsDogHovered(true)}
                onHoverOut={() => setIsDogHovered(false)}
                onPressIn={() => setIsDogPressing(true)}
                onPressOut={() => setIsDogPressing(false)}
                hitSlop={0}>
                <Image
                  style={styles.dogImage}
                  source={dog}
                  resizeMode="cover"
                />
                <Text style={styles.iconTitle}> Perros </Text>
              </Pressable>
            </View>
            <View style={styles.birdButton}>
              <Pressable
                onPress={onBirdPress}
                onHoverIn={() => setIsBirdHovered(true)}
                onHoverOut={() => setIsBirdHovered(false)}
                onPressIn={() => setIsBirdPressing(true)}
                onPressOut={() => setIsBirdPressing(false)}>
                <Image
                  style={styles.birdImage}
                  source={bird}
                  resizeMode="contain"
                />
                <Text style={styles.iconTitle}> Razas Pequeñas </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default PetButton;
