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
      marginTop: 20,
      alignSelf: 'stretch',
      width: 300,
      height: 30,
      alignContent: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#cbc5c5',
      borderRadius: 30,
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
      fontSize: 14,
      fontWeight: '400', // SemiBold
      paddingLeft: 36,
    },
  });

type NavbarProps = PropsWithChildren<{
  title: string;
}>;

function Searchbar({children, title}: NavbarProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <>
			<View style={styles.container}>
        <View >
          <Text style={styles.pageTitle}>
            Buscar
          </Text>
          {children}
        </View>
			</View>
		</>
  );
}

export default Searchbar;
