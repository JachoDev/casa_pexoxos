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
      width: isHovered || _isSelected ? 45 : 35,
      height: isHovered || _isSelected ? 50 : 40,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: _isSelected ? '#9e3c5f' : '#eeeeee',
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
    pressable: {
      width: '100%',
      height: '100%',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pageTitle: {
      fontSize: isHovered || _isSelected ? 24 : 20,
      fontWeight: '600', // SemiBold
      color: '#2e2e2e',
    },
  });

type LetterItemProps = PropsWithChildren<{
  letter: string;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  isSelected?: boolean;
}>;

function LetterItem(props: LetterItemProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  //const [isSelected, setIsSelected] = useState(props.isSelected ?? false);
  const styles = createStyles(isHovered, isPressing, props.isSelected);

  const onPress = () => {
    //setIsSelected(props.isSelected);
    //console.log(isSelected + 'DayItem onPress');
    if (props.onPress) {
      props.onPress();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={styles.pressable}
          onPress={onPress}
          onHoverIn={() => setIsHovered(true)}
          onHoverOut={() => setIsHovered(false)}
          onPressIn={() => setIsPressing(true)}
          onPressOut={() => setIsPressing(false)}>
          <View style={styles.button}>
            <Text style={styles.pageTitle}>{props.letter.toLocaleUpperCase()}</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
}

export default LetterItem;
