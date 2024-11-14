import { useTheme } from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
} from 'react-native';

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: 200,
      height: 70,
      alignContent: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#fffaaa',
      borderRadius: 10,
      marginVertical: 40,
      marginHorizontal: 25,
      flexDirection: 'row',
    },
    imageView: {
      flex: 6,
      backgroundColor: 'black',
    },
    textView: {
      flex: 12,
    },
    arrowView: {
      flex: 1,
      backgroundColor: 'red',
    },
    scrollView: {
      paddingRight: 20,
    },
    icon: {
      fontFamily: 'Segoe MDL2 Assets',
      fontSize: 16,
    },
    heroGradient: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    heroBackgroundImage: {
      position: 'absolute',
      resizeMode: 'cover',
      width: '100%',
      height: '99%',
    },
    pageHeader: {},
    pageTitleContainer: {
      height: 204,
      justifyContent: 'center',
    },
    pageTitle: {
      // https://github.com/microsoft/WinUI-Gallery/blob/c3cf8db5607c71f5df51fd4eb45d0ce6e932d338/WinUIGallery/HomePage.xaml#L82
      // TitleLargeTextBlockStyle
      fontSize: 20,
      fontWeight: '600', // SemiBold
      paddingLeft: 36,
      color: '#000000'
    },
  });

type ServiceProps = PropsWithChildren<{
  title: string;
}>;

function ServiceCard({ title }: ServiceProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <>
			<View style={styles.container}> 
        <View style={styles.imageView}>

        </View>
        <View style={styles.textView}>
          <Text >
            {title}
          </Text>
        </View>
        <View style={styles.arrowView}>
          
        </View>
			</View>
		</>
  );
}

export default ServiceCard;
