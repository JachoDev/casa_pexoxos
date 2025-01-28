import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  Pressable,
  GestureResponderEvent,
} from 'react-native';

const createStyles = (
  isDayHovered: boolean,
  isDayPressing: boolean,
  isDaySelected: boolean,
  isWeekHovered: boolean,
  isWeekPressing: boolean,
  isWeekSelected: boolean,
  isMonthHovered: boolean,
  isMonthPressing: boolean,
  isMonthSelected: boolean,
) =>
  StyleSheet.create({
    periodBox: {
      width: 'auto',
      height: 'auto',
      marginVertical: 5,
      backgroundColor: 'white',
      borderLeftWidth: 6,
      borderBottomWidth: 6,
      borderTopWidth: 6,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      borderColor: '#2e2e2e',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    rowContent: {
      flexDirection: 'row',
    },
    periodTextD: {
      fontSize: isDaySelected ? 24 : isDayHovered ? 22 : 18,
      marginHorizontal: isDayHovered ? 3 : 0,
      marginVertical: isDayHovered ? 8 : 6,
      color: '#2e2e2e',
      opacity: isDayPressing ? 0.2 : 1,
      fontWeight: 'bold',
    },
    periodTextW: {
      fontSize: isWeekSelected ? 24 : isWeekHovered ? 22 : 18,
      marginHorizontal: isWeekHovered ? 3 : 0,
      marginVertical: isWeekHovered ? 8 : 6,
      color: '#2e2e2e',
      opacity: isWeekPressing ? 0.2 : 1,
      fontWeight: 'bold',
    },
    periodTextM: {
      fontSize: isMonthSelected ? 24 : isMonthHovered ? 22 : 18,
      marginHorizontal: isMonthHovered ? 3 : 0,
      marginVertical: isMonthHovered ? 8 : 6,
      color: '#2e2e2e',
      opacity: isMonthPressing ? 0.2 : 1,
      fontWeight: 'bold',
    },
    periodContent: {
      marginTop: 10,
      width: '10%',
      alignItems: 'flex-end',
    },
    pickerStyle: {
      height: 50,
      width: 100,
      margin: 5,
      color: 'white',
      backgroundColor: '#2e2e2e',
    },
  });

type PeriodButtonProps = PropsWithChildren<{
  title: string;
  isMonth?: boolean;
  onPressDay?: null | ((event: GestureResponderEvent) => void) | undefined;
  onPressWeek?: null | ((event: GestureResponderEvent) => void) | undefined;
  onPressMonth?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function PeriodButton(props: PeriodButtonProps): React.JSX.Element {
  const [isDayHovered, setIsDayHovered] = useState(false);
  const [isDayPressing, setIsDayPressing] = useState(false);
  const [isDaySelected, setIsDaySelected] = useState(props.isMonth ? !props.isMonth : true);
  const [isWeekHovered, setIsWeekHovered] = useState(false);
  const [isWeekPressing, setIsWeekPressing] = useState(false);
  const [isWeekSelected, setIsWeekSelected] = useState(false);
  const [isMonthHovered, setIsMonthHovered] = useState(props.isMonth ?? false);
  const [isMonthPressing, setIsMonthPressing] = useState(false);
  const [isMonthSelected, setIsMonthSelected] = useState(false);
  const styles = createStyles(
    isDayHovered,
    isDayPressing,
    isDaySelected,
    isWeekHovered,
    isWeekPressing,
    isWeekSelected,
    isMonthHovered,
    isMonthPressing,
    isMonthSelected,
  );
  const onDayPress = () => {
    props.onPressDay?.({} as GestureResponderEvent);
    setIsWeekSelected(false);
    setIsMonthSelected(false);
    setIsDaySelected(true);
    //Select dog filter
  };
  const onWeekPress = () => {
    props.onPressWeek?.({} as GestureResponderEvent);
    setIsDaySelected(false);
    setIsMonthSelected(false);
    setIsWeekSelected(true);
    //Select cat filter
  };
  const onMonthPress = () => {
    props.onPressMonth?.({} as GestureResponderEvent);
    setIsDaySelected(false);
    setIsWeekSelected(false);
    setIsMonthSelected(true);
    //Select bird filter
  };

  return (
    <>
      <View style={styles.periodContent}>
        <Pressable
          onPress={() => {
            onDayPress();
          }}
          onHoverIn={() => {
            setIsDayHovered(true);
          }}
          onHoverOut={() => {
            setIsDayHovered(false);
          }}
          onPressIn={() => {
            setIsDayPressing(true);
          }}
          onPressOut={() => {
            setIsDayPressing(false);
          }}>
          <View style={styles.periodBox}>
            <Text style={styles.periodTextD}>Día</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            onWeekPress();
          }}
          onHoverIn={() => {
            setIsWeekHovered(true);
          }}
          onHoverOut={() => {
            setIsWeekHovered(false);
          }}
          onPressIn={() => {
            setIsWeekPressing(true);
          }}
          onPressOut={() => {
            setIsWeekPressing(false);
          }}>
          <View style={styles.periodBox}>
            <Text style={styles.periodTextW}>Semana</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            onMonthPress();
          }}
          onHoverIn={() => {
            setIsMonthHovered(true);
          }}
          onHoverOut={() => {
            setIsMonthHovered(false);
          }}
          onPressIn={() => {
            setIsMonthPressing(true);
          }}
          onPressOut={() => {
            setIsMonthPressing(false);
          }}>
          <View style={styles.periodBox}>
            <Text style={styles.periodTextM}>Mes</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
}

export default PeriodButton;
