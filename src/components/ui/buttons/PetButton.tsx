import { useTheme } from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  Image,
} from 'react-native';
import cat from '../../../assets/images/cartoon-cat.png';
import dog from '../../../assets/images/cartoon-dog.png';

const createStyles = () =>
  StyleSheet.create({
    container: {
      marginTop: 20,
      alignSelf: 'stretch',
      width: 400,
      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
    },
    petBackground: {
      borderRadius: 10,
    },
    petRow:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    

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
      fontSize: 40,
      fontWeight: '600', // SemiBold
      paddingLeft: 36,
      color: '#000000'
    },
    petButton: {
      backgroundColor: '#f19a56',
      alignItems: 'center',
      justifyContent: 'center',  
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      width: 180,
      height: 120,
    },
    dogButton: {
      backgroundColor: '#cbc5c5',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      width: 160,
      height: 140,
    },
    petImage: {
      alignSelf: 'center',
      width: 80,
      height: 80,
    },
    petText: {
      color: 'black'
    }
  });

type NavbarProps = PropsWithChildren<{
  title: string;
}>;

function PetButton({children, title}: NavbarProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <>
			<View style={styles.container}>
        <View style={styles.petBackground}>
          <View style={styles.petRow}>
            <View style={styles.petButton}>
              <Image style={styles.petImage} source={cat}/>
              <Text style={styles.petText}>Gatos</Text>
            </View>
            <View style={styles.dogButton}>
              <Image style={styles.petImage} source={dog}/>
              <Text style={styles.petText}>Perros</Text>
            </View>
          </View>
        </View>
			</View>
		</>
  );
}

export default PetButton;
