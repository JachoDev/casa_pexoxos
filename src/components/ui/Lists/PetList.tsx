import { useTheme } from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  FlatList,
} from 'react-native';


const createStyles = () =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 36,
      alignSelf: 'center',
      width: '70%',
      height: '10%',
      alignContent: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderRadius: 40,
      shadowColor:'#000000',
      shadowRadius: 5,
      shadowOpacity: 0.1,
      shadowOffset: { width: 10, height: -10 },
      elevation: 10,
      borderWidth: 2,
      borderColor: '#959595'
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

type PetListProps = PropsWithChildren<{
  title: string;
}>;

function PetList({children, title}: PetListProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <>
			<View style={styles.container}>
       <FlatList>
        
       </FlatList>
			</View>
		</>
  );
}

export default PetList;
