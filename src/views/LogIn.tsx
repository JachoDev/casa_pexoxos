import React from 'react';
import type {PropsWithChildren} from 'react';
//import CheckBox from '@react-native-community/checkbox';
import {
  SafeAreaView,
  Text,
  View,
  Image,
	ScrollView,
	TextInput,
	useColorScheme,
	StyleSheet,
} from 'react-native';
import {useTheme, useIsFocused} from '@react-navigation/native';
import Navbar from '../components/sections/Navbar';
import loginImage from '../assets/images/imagen_banner.jpeg';
import logo from '../assets/images/image_logo.png';

type LogInProps = PropsWithChildren<{
  title: string;
}>;

const createStyles = () =>
  StyleSheet.create({
    container: {
      padding: 10,
      paddingBottom: 40,
      paddingLeft: 36,
      alignSelf: 'center',
      height: '100%',
      alignContent: 'space-around',
    },
		columnContainer: {
			alignContent: 'space-around',
		},
		rowContainer: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			alignItems: 'center',
			alignContent: 'center',
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
    },
		text: {
			fontSize: 30,
			padding: 15,
			color: '#000000'
		},
		textInputTitle: {
			fontSize: 12,
			color: '#000000'
		},
		textInput: {
			borderColor: '#762776',
			borderRadius: 4,

		},
		imageBanner: {
			width: 500,
			height: 500,
			borderRadius: 20,
		},
		imageLogo: {
			width: 40,
			height: 40,
		}
  });

function LogIn({children, title}: LogInProps): React.JSX.Element {
	const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.rowContainer}>
					<View style={styles.container} >
						<View style={styles.columnContainer}>
							<View style={styles.rowContainer}>
								<View >
									<Image style={styles.imageLogo} source={logo}/>
								</View>
								<View>
									<Text style={styles.text}>Casa Pexoxos</Text>
								</View>
							</View>
							<View >
								<Text style={styles.text}>
									Iniciar sesión
								</Text>
							</View>
							<View >
								<Text style={styles.textInputTitle}>
									Usuario
								</Text>
								<TextInput style={styles.textInput}/>
							</View>
							<View >
								<Text style={styles.textInputTitle}>
									Usuario
								</Text>
								<TextInput style={styles.textInput}/>
							</View>
						</View>
						<View style={styles.rowContainer}>

						</View>
						
					</View>
					<View >
						<View >
							<Image style={styles.imageBanner} source={loginImage}/>
						</View>
					</View>
        </View>
      </SafeAreaView>
			
		</>
  );
}

export default LogIn;
