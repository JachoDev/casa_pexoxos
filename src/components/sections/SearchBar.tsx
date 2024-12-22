import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import testSvg from '../../assets/images/icons/Search.png';

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: 300,
      height: 30,
      alignContent: 'flex-start',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: 10,
      backgroundColor: '#cbc5c5',
      borderRadius: 30,
      flexDirection: 'row',
    },
    icon: {
      width: 15,
      height: 15,
    },
    textInputView: {
      color: 'black',
    },
    textInput: {
      color: 'black',
      marginTop: 1,
      width: 275,
      fontSize: 16,
      backgroundColor: 'transparent',
    },
    pageTitle: {
      // https://github.com/microsoft/WinUI-Gallery/blob/c3cf8db5607c71f5df51fd4eb45d0ce6e932d338/WinUIGallery/HomePage.xaml#L82
      // TitleLargeTextBlockStyle
      fontSize: 14,
    },
  });

type NavbarProps = PropsWithChildren<{
  title: string;
}>;

function Searchbar(props: NavbarProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [search, setSearch] = useState('');

  return (
    <>
			<View style={styles.container}>
      <Image source={testSvg} style={styles.icon}/>
        <View style={styles.textInputView}>
          <TextInput style={styles.textInput}
                                  placeholder='Buscar'
                                  onChangeText={setSearch}
                                  value={search}
                                  />
        </View>
			</View>
		</>
  );
}

export default Searchbar;
