import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  FlatList,
  Button,
} from 'react-native';
import ExpensesCard from '../Cards/ExpensesCard';
import {expensesList} from '../../../services/firebase/firestore/firestoreService';

const createStyles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: '#ffffff',
      borderWidth: 6,
      borderColor: '#2e2e2e',
    },
    rowTile: {
      height: '20%',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: '#d35c50',
      paddingHorizontal: 40,
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

type ExpensesListProps = PropsWithChildren<{
  title: string;
}>;

function ExpensesList(props: ExpensesListProps): React.JSX.Element {
  const styles = createStyles();
  const [expenses, setExpenses] = useState(
    expensesList.sort((a, b) => b.date - a.date),
  );

  const update = () => {
    setExpenses([]);
  };

  useEffect(() => {
    setExpenses(expensesList.sort((a, b) => b.date - a.date));
    console.log(expenses);
    return () => {};
  }, [expenses]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.rowTile}>
          <Text style={styles.pageTitle}>Concepto</Text>
          <Text style={styles.pageTitle}>Método de Pago</Text>
          <Text style={styles.pageTitle}>Fecha</Text>
          <Text style={styles.pageTitle}>Total</Text>
        </View>
        <FlatList
          data={expenses}
          renderItem={({item}) => (
            <ExpensesCard
              id={item.id}
              service={item.expenditure}
              paymentMethod={item.paymentMethod}
              date={item.date.toDate().toUTCString()}
              total={' $' + item.total}
              onReset={update}
            />
          )}
        />
      </View>
    </>
  );
}

export default ExpensesList;
