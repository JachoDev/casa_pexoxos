import {useTheme} from '@react-navigation/native';
import React, { useState } from 'react';
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

const createStyles = (isHovered: boolean, _isPressing: boolean, _isSelected: boolean) =>
  StyleSheet.create({
    container: {
      alignSelf: 'flex-end',
      width: isHovered ? 110 : 90,
      height: isHovered ? 55 : 40,
      alignContent: 'center',
      justifyContent: 'center',
			alignItems: 'center',
      backgroundColor: _isSelected ? '#017172' : '#eeeeee',
      borderTopLeftRadius: 3,
			borderTopRightRadius: 3,
      marginVertical: 0,
      marginHorizontal: .5,
      flexDirection: 'row',
      opacity: _isPressing ? 0.2 : 1,
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
      fontSize: isHovered ? 20 : 16,
      fontWeight: '600', // SemiBold
      color: '#000000',
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
					onPress={onPress}
					onHoverIn={() => setIsHovered(true)}
					onHoverOut={() => setIsHovered(false)}
					onPressIn={() => setIsPressing(true)}
					onPressOut={() => setIsPressing(false)}>
						<View style={styles.button}>
							<Text style={styles.pageTitle}>{props.day}</Text>
						</View>
				</Pressable>
			</View>
    </>
  );
}

export default DayItem;
