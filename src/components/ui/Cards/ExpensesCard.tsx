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
      width: 1100,
      height: 25,
      alignContent: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#ffffffaf',
      borderRadius: 2,
    },
    rowTile:{
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 100,
      height: 100,
    },
    pageTitle: {
      // https://github.com/microsoft/WinUI-Gallery/blob/c3cf8db5607c71f5df51fd4eb45d0ce6e932d338/WinUIGallery/HomePage.xaml#L82
      // TitleLargeTextBlockStyle
      fontSize: 16,
      fontWeight: '600', // SemiBold
      color: 'blue',
      alignSelf: 'center',
      flex: 1,
    },
  });

type ExpensesCardProps = PropsWithChildren<{
  date: string;
  service: string;
  total: string;
}>;

function ExpensesCard(props: ExpensesCardProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <>
            <View style={styles.container}>
        <View style={styles.rowTile}>
          <Text style={styles.pageTitle}>{props.service}</Text>
          <Text style={styles.pageTitle}>{props.date}</Text>
          <Text style={styles.pageTitle}>{props.total}</Text>
        </View>
            </View>
        </>
  );
}

export default ExpensesCard;
