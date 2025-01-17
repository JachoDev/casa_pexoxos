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

const createStyles = (
  isHovered: boolean,
  _isPressing: boolean,
  _isSelected: boolean,
) =>
  StyleSheet.create({
    container: {
      alignSelf: 'flex-end',
      width: isHovered || _isSelected ? 110 : 90,
      height: isHovered || _isSelected ? 55 : 40,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: _isSelected ? '#017172' : '#eeeeee',
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      marginVertical: 0,
      marginHorizontal: 0.5,
      flexDirection: 'row',
      opacity: _isPressing ? 0.2 : 1,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderTopWidth: 2,
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
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      marginVertical: 0,
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
      // https://github.com/microsoft/WinUI-Gallery/blob/c3cf8db5607c71f5df51fd4eb45d0ce6e932d338/WinUIGallery/HomePage.xaml#L82
      // TitleLargeTextBlockStyle
      fontSize: isHovered || _isSelected ? 20 : 16,
      fontWeight: '600', // SemiBold
      color: '#2e2e2e',
      paddingLeft: 5,
    },
  });

type DayItemProps = PropsWithChildren<{
  day: string;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  isSelected?: boolean;
}>;

function DayItem(props: DayItemProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  //const [isSelected, setIsSelected] = useState(props.isSelected ?? false);
  const styles = createStyles(isHovered, isPressing, props.isSelected);
  const isSunday = props.day.substring(0, 3) === 'Dom';

  const onPress = () => {
    //setIsSelected(props.isSelected);
    //console.log(isSelected + 'DayItem onPress');
    if (props.onPress) {
      props.onPress();
    }
  };

  return (
    <>
      {isSunday ? <></> : <View style={isSunday ? styles.disabled : styles.container}>
        <Pressable
          style={styles.pressable}
          disabled={isSunday}
          onPress={onPress}
          onHoverIn={() => setIsHovered(true)}
          onHoverOut={() => setIsHovered(false)}
          onPressIn={() => setIsPressing(true)}
          onPressOut={() => setIsPressing(false)}>
          <View style={styles.button}>
            <Text style={isSunday ? null : styles.pageTitle}>{isSunday ? '...' : props.day}</Text>
          </View>
        </Pressable>
      </View>}
    </>
  );
}

export default DayItem;
