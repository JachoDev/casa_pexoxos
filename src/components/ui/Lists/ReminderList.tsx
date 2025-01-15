import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  FlatList,
} from 'react-native';
import SalesCard from '../Cards/SalesCard';
import ExpensesCard from '../Cards/ExpensesCard';
import InventoryCard from '../Cards/InventoryCard';
import {inventory} from '../../../services/firebase/firestore/firestoreService';
import ReminderCard from '../Cards/ReminderCard';
import { reminders } from '../../../services/local/reminders/remindersService';

const createStyles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '90%',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      borderWidth: 6,
      borderColor: '#2e2e2e',
    },
    rowTile: {
      height: '15%',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: '#e94b57',
      paddingHorizontal: 20,
      borderBottomWidth: 6,
      borderColor: '#2e2e2e',
    },
    image: {
      width: 100,
      height: 100,
    },
    pageTitle: {
      // https://github.com/microsoft/WinUI-Gallery/blob/c3cf8db5607c71f5df51fd4eb45d0ce6e932d338/WinUIGallery/HomePage.xaml#L82
      // TitleLargeTextBlockStyle
      fontSize: 16,
      fontWeight: 'bold', // SemiBold
      color: '#363e4c',
      flex: 1,
    },
  });

type ReminderListProps = PropsWithChildren<{
  title: string;
}>;

function ReminderList(props: ReminderListProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [list, setList] = useState(reminders);

  const update = () => {
    setList([]);
  };

  useEffect(() => {
    setList(reminders);
    console.log(reminders);
    return (cleanUp = () => {});
  }, [list]);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={list}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ReminderCard
              id={item.id}
              petId={item.petId}
              checkIn={item.checkIn}
              grooming={item.groomming}
            />
          )}
        />
      </View>
    </>
  );
}

export default ReminderList;
