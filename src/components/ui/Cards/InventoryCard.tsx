import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
} from 'react-native';
import { Flyout } from 'react-native-windows';
import InventoryForm from '../forms/InventoryForm';

const createStyles = (isHovered: boolean, _isPressing: boolean) =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: isHovered ? 460 : 450,
      height: isHovered ? 55 : 50,
      alignContent: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#d0dee2',
      borderRadius: 2,
      paddingHorizontal: 15,
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
      fontSize: 16,
      fontWeight: '600', // SemiBold
      color: '#363e4c',
      alignSelf: 'center',
      flex: 1,
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

type InventoryCardProps = PropsWithChildren<{
  id: string;
  product: string;
  qty: string;
}>;

function InventoryCard(props: InventoryCardProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const styles = createStyles(isHovered, isPressing);
  const [showFlyout, setShowFlyout] = useState(false);

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
          <InventoryForm onSend={() => setShowFlyout(false)} id={props.id}/>
        </View>
      </Flyout>
      <Pressable
        onPress={() => {
          setShowFlyout(true);
        }}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        onPressIn={() => setIsPressing(true)}
        onPressOut={() => setIsPressing(false)}>
        <View style={styles.container}>
          <View style={styles.rowTile}>
            <Text style={styles.pageTitle}>{props.product}</Text>
            <Text style={styles.pageTitle}>{props.qty}</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}

export default InventoryCard;
