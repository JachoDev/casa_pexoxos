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
import {expensesList} from '../../../services/firebase/firestore/firestoreService';

const createStyles = () =>
  StyleSheet.create({
    container: {
      paddingTop: 10,
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    salesContainer: {
      alignSelf: 'center',
      width: 1100,
      height: 25,
      alignContent: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#eeeeee',
      borderRadius: 10,
      flexDirection: 'row',
    },
    rowTile: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      marginBottom: 5,
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
      color: 'blue',
      flex: 1,
    },
  });

type ExpensesListProps = PropsWithChildren<{
  title: string;
}>;

function ExpensesList(props: ExpensesListProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [sales, setSales] = useState(
    expensesList.sort((a, b) => b.date - a.date)
  );

  useEffect(() => {
    setSales(expensesList.sort((a, b) => b.date - a.date));
    console.log(sales);
    return () => {};
  }, [sales]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.rowTile}>
          <Text style={styles.pageTitle}>Concepto</Text>
          <Text style={styles.pageTitle}>Fecha</Text>
          <Text style={styles.pageTitle}>Total</Text>
        </View>
        <FlatList
          data={sales}
          renderItem={({item}) => (
            <ExpensesCard
              service={item.expenditure}
              date={item.date.toDate().toUTCString()}
              total={' $' + item.total}
            />
          )}
        />
      </View>
    </>
  );
}

export default ExpensesList;
