import { useTheme } from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
} from 'react-native';

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: 120,
      height: 125,
      alignContent: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#eeeeee',
      borderRadius: 10,
      marginVertical: 30,
      marginHorizontal: 35,
      paddingTop: 5,
      flexDirection: 'row',
    },
    image: {
      width: 100,
      height: 100,
    },
    pageTitle: {
      // https://github.com/microsoft/WinUI-Gallery/blob/c3cf8db5607c71f5df51fd4eb45d0ce6e932d338/WinUIGallery/HomePage.xaml#L82
      // TitleLargeTextBlockStyle
      fontSize: 12,
      fontWeight: '600', // SemiBold
      color: '#000000',
      paddingLeft: 5,
    },
  });

type PetCardProps = PropsWithChildren<{
  name: string;
  image: string;
}>;

function PetCard(props: PetCardProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <>
			<View style={styles.container}>
        <View >
          <Image style={styles.image} source={require('../../../assets/images/dog.png')} resizeMode='stretch'/>
          <Text style={styles.pageTitle}>
            {props.name}
          </Text>
        </View>
			</View>
		</>
  );
}

export default PetCard;
