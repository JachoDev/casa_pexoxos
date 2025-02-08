import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  StyleSheet,
  //SafeAreaView,
  Pressable,
  Text,
  View,
  GestureResponderEvent,
  Alert,
} from 'react-native';
import {Flyout} from 'react-native-windows';
import ExpenseForm from '../forms/ExpenseForm';
import { deleteExpense, updateExpensesList } from '../../../services/firebase/firestore/firestoreService';

const createStyles = (isHovered: boolean, _isPressing: boolean) =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: isHovered ? 1210 : 1200,
      height: isHovered ? 40 : 35,
      alignContent: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#d0dee2',
      borderRadius: 2,
      paddingHorizontal: 15,
      marginHorizontal: 5,
      marginVertical: 5,
      borderWidth: 2,
      borderColor: '#2e2e2e',
      opacity: _isPressing ? 0.2 : 1,
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
      fontSize: 16,
      fontWeight: '600', // SemiBold
      color: '#2e2e2e',
      alignSelf: 'center',
      flex: 1,
    },
    totalTitle: {
      fontSize: 16,
      fontWeight: '600', // SemiBold
      color: '#d6253f',
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

type ExpensesCardProps = PropsWithChildren<{
  id: string;
  date: string;
  paymentMethod: string;
  service: string;
  total: string;
  onReset?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function ExpensesCard(props: ExpensesCardProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const styles = createStyles(isHovered, isPressing);
  const [showFlyout, setShowFlyout] = useState(false);

  const onLongPress = () => {
    Alert.alert(
      'Eliminar',
      '¿Estás seguro de que deseas eliminar este elemento?',
      [
        {
          text: 'Sí',
          onPress: () => {
            try {
              deleteExpense(props.id);
              updateExpensesList().then(() => props.onReset?.({} as GestureResponderEvent));
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
          <ExpenseForm onSend={onSend} id={props.id} />
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
          <View style={styles.rowTile}>
            <Text style={styles.pageTitle}>{props.service}</Text>
            <Text style={styles.pageTitle}>{props.paymentMethod}</Text>
            <Text style={styles.pageTitle}>{props.date}</Text>
            <Text style={styles.totalTitle}>{props.total}</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}

export default ExpensesCard;
