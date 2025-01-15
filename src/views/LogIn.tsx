import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  useColorScheme,
  StyleSheet,
  Button,
  ImageBackground,
  Alert,
} from 'react-native';
import {useTheme, useIsFocused, useNavigation} from '@react-navigation/native';
import Navbar from '../components/sections/Navbar';
import loginImage from '../assets/images/image_banner.png';
import logo from '../assets/images/image_logo.png';
import background from '../assets/images/Login_Background.png';
import Home from './Home';
import {users} from '../services/firebase/firestore/firestoreService';

type LogInProps = PropsWithChildren<{
  title: string;
}>;

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',

      width: '100%',
      flex: 1,
    },
    presentation: {
      alignSelf: 'center',
      alignContent: 'space-between',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    columnContainer: {
      alignContent: 'space-around',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    rowContainer: {
      flexDirection: 'row',
      height: '100%',
      flexWrap: 'wrap',
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'auto',
      justifyContent: 'space-evenly',
    },
    rowContainerSmall: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'center',
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
      color: '#000000',
    },
    textInputTitle: {
      fontSize: 18,
      color: '#000000',
    },
    textInput: {
      borderColor: '#762776',
      borderRadius: 4,
      color: '#000000',
    },
    imageBanner: {
      width: 500,
      height: 500,
      borderRadius: 20,
    },
    imageLogo: {
      width: 40,
      height: 40,
      borderRadius: 10,
    },
    button: {
      width: 120,
    },
  });

function LogIn({children, title}: LogInProps): React.JSX.Element {
  const styles = createStyles();
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  const onLogin = () => {
    const matchedUser = users.find(
      u => u.username === user && u.password === password,
    );
    if (matchedUser) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  const onPress = () => {navigation.navigate('Home');};

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} resizeMode="cover">
          <View style={styles.rowContainer}>
            <View style={styles.presentation}>
              <View style={styles.columnContainer}>
                <View style={styles.rowContainerSmall}>
                  <View>
                    <Image style={styles.imageLogo} source={logo} />
                  </View>
                  <View>
                    <Text style={styles.text}>Casa Pexoxos</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.text}>Iniciar sesión</Text>
                </View>
                <View>
                  <Text style={styles.textInputTitle}>Usuario</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Nombre de Usuario"
                    placeholderTextColor="gray"
                    value={user}
                    onChangeText={setUser}
                  />
                </View>
                <View>
                  <Text style={styles.textInputTitle}>Contraseña</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Contraseña"
                    placeholderTextColor="gray"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>
              <View style={styles.rowContainerSmall}>
                <CheckBox
                  onTintColor="#ffa0b5"
                  onCheckColor="#ffffff"
                  onFillColor="#ffa0b5"
                />
                <Text style={styles.textInputTitle}>Recordar Usuario</Text>
              </View>
              <View style={styles.button}>
                <Button title="Entrar" color="#ffa0b5" onPress={onPress} />
              </View>
            </View>
            <View>
              <View>
                <Image
                  style={styles.imageBanner}
                  source={loginImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

export default LogIn;
