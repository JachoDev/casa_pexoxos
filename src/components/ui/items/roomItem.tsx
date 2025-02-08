import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
} from 'react-native';

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      width: 50,
      height: 70,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
      borderRadius: 3,
      marginVertical: 0,
      marginHorizontal: 1,
      borderWidth: 2,
      borderColor: '#2e2e2e',
    },
    disabled: {
      alignSelf: 'flex-end',
      width: 40,
      height: 30,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#017172',
      borderRadius: 3,
      marginHorizontal: 0.5,
      flexDirection: 'row',
    },
    pressable: {
      width: '100%',
      height: '100%',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: '100%',
      height: '100%',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pageTitle: {
      fontSize: 16,
      fontWeight: '600', // SemiBold
      color: '#2e2e2e',
      paddingLeft: 5,
      marginVertical: 2,
    },
  });

type RoomItemProps = PropsWithChildren<{
  size: string;
  available: string;
  total: string;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function RoomItem(props: RoomItemProps): React.JSX.Element {

  const styles = createStyles();


  return (
    <>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>
          {props.size}
        </Text>
        <Text style={styles.pageTitle}>
          {props.available + '/' + props.total}
        </Text>
      </View>
    </>
  );
}

export default RoomItem;
