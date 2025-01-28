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
import PeriodButton from '../buttons/PeriodButton';
import {Picker} from '@react-native-picker/picker';

const createStyles = () =>
  StyleSheet.create({
    container: {
      width: '90%',
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
      height: '15%',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: '#d35c50',
      paddingHorizontal: 20,
      borderBottomWidth: 6,
      borderColor: '#2e2e2e',
    },
    image: {
      width: 100,
      height: 100,
    },
    pageTitle: {
      fontSize: 20,
      fontWeight: 'bold', // SemiBold
      color: '#363e4c',
      flex: 1,
    },
    rowContent: {
      flexDirection: 'row',
    },
    totalContainer: {
      width: 'auto',
      height: 'auto',
      flexDirection: 'row',
      backgroundColor: 'white',
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 30,
      marginBottom: 20,
      borderLeftWidth: 6,
      borderRightWidth: 6,
      borderBottomWidth: 6,
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderColor: '#2e2e2e',
    },
    totalText: {
      fontSize: 30,
      color: '#2e2e2e',
      fontWeight: 'bold',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    filtersContainer: {
      marginLeft: 200,
      width: 1000,
      height: 50,
      backgroundColor: 'white',
    },
    pickerStyle: {
      height: 50,
      width: 200,
      marginLeft: 180,
      margin: 5,
      color: 'white',
      backgroundColor: '#2e2e2e',
    },
  });

type ExpensesListProps = PropsWithChildren<{
  title: string;
}>;

function ExpensesList(props: ExpensesListProps): React.JSX.Element {
  const styles = createStyles();
  const now = new Date();
  const [expenses, setExpenses] = useState(
    expensesList.sort((a, b) => b.date - a.date),
  );
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('month');
  const [day, setDay] = useState();
  const [week, setWeek] = useState();
  const [month, setMonth] = useState(now.getMonth().toString());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const daysInMonth = endOfMonth.getDate();
  const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1);
  const weekDaysArray = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ];
  const monthsArray = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const weeksArray: {start: Date; end: Date}[] = [];
  let currentWeekStart = startOfMonth;
  currentWeekStart.setDate(
    currentWeekStart.getDate() - startOfMonth.getDay() + 1,
  );
  while (currentWeekStart <= endOfMonth) {
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(
      currentWeekStart.getDate() + 6 - startOfMonth.getDay(),
    );
    weeksArray.push({
      start: new Date(currentWeekStart),
      end: currentWeekEnd,
    });
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  }

  const filterExpenses = (filter: string) => {
    setFilter(filter);
  };

  const update = () => {
    setExpenses([]);
  };

  const setFilteredDay = item => {
      setDay(item);
      const _startOfMonth = new Date(now.getFullYear(), now.getMonth(), item);
      let filteredSales = expensesList;
      filteredSales = expensesList.filter(
        sale =>
          sale.date.toDate().toDateString() === _startOfMonth.toDateString(),
      );
      setExpenses(filteredSales);
      let sum = 0;
      filteredSales.forEach(e => {
        sum += e.total;
        console.log(e);
      });
      setTotal(sum);
    };

    const setFilteredWeek = item => {
      setWeek(item);
      const startOfWeek = new Date(weeksArray[item].start);
      const endOfWeek = new Date(weeksArray[item].end);
      console.log(startOfWeek);
      console.log(endOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 1);
      let filteredSales = expensesList;
      filteredSales = expensesList.filter(
        sale =>
          sale.date.toDate() >= startOfWeek && sale.date.toDate() <= endOfWeek,
      );
      setExpenses(filteredSales);
      let sum = 0;
      filteredSales.forEach(e => {
        sum += e.total;
        console.log(e);
      });
      setTotal(sum);
    };

    const setFilteredMonth = item => {
      setMonth(item);
      const _startOfMonth = new Date(now.getFullYear(), item, 1);
      let filteredSales = expensesList;
      filteredSales = expensesList.filter(
        sale =>
          sale.date.toDate().getMonth() === _startOfMonth.getMonth() &&
          sale.date.toDate().getFullYear() === _startOfMonth.getFullYear(),
      );
      setExpenses(filteredSales);
      let sum = 0;
      filteredSales.forEach(e => {
        sum += e.total;
        console.log(e);
      });
      setTotal(sum);
    };


  useEffect(() => {
    //setExpenses(expensesList.sort((a, b) => b.date - a.date));
    setFilteredMonth(month);
    console.log(expenses);
    return () => {};
  }, []);

  return (
    <>
      {filter === 'day' ? (
        <Picker
          selectedValue={day}
          onValueChange={setFilteredDay}
          style={styles.pickerStyle}>
          {daysArray.map((item, index) => (
            <Picker.Item
              key={index}
              label={item.toString()}
              value={item.toString()}
            />
          ))}
        </Picker>
      ) : null}
      {filter === 'week' ? (
        <Picker
          selectedValue={week}
          onValueChange={setFilteredWeek}
          style={styles.pickerStyle}>
          {weeksArray.map((item, index) => (
            <Picker.Item
              key={index}
              label={
                item.start.toLocaleDateString() +
                '  -  ' +
                item.end.toLocaleDateString()
              }
              value={index.toString()}
            />
          ))}
        </Picker>
      ) : null}
      {filter === 'month' ? (
        <Picker
          selectedValue={month}
          onValueChange={setFilteredMonth}
          style={styles.pickerStyle}>
          {monthsArray.map((item, index) => (
            <Picker.Item key={index} label={item} value={index.toString()} />
          ))}
        </Picker>
      ) : null}
      <View style={styles.rowContent}>
        <PeriodButton
          title={''}
          isMonth={true}
          onPressDay={() => filterExpenses('day')}
          onPressWeek={() => filterExpenses('week')}
          onPressMonth={() => filterExpenses('month')}
        />
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
                date={
                  weekDaysArray[item.date.toDate().getDay()].substring(0, 3) +
                  ' ' +
                  item.date.toDate().getDate().toString().padStart(2, '0') +
                  ' ' +
                  monthsArray[item.date.toDate().getMonth()].substring(0, 3) +
                  ' ' +
                  item.date.toDate().getFullYear() +
                  ' ' +
                  item.date.toDate().toTimeString()
                }
                total={' $' + item.total.toFixed(2)}
                onReset={update}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: </Text>
        <Text style={styles.totalText}>${total.toFixed(2)}</Text>
      </View>
    </>
  );
}

export default ExpensesList;
