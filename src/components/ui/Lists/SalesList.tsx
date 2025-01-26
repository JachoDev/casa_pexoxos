import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import SalesCard from '../Cards/SalesCard';
import {
  clientsList,
  salesList,
} from '../../../services/firebase/firestore/firestoreService';
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
      backgroundColor: '#88b764',
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
      color: '#2e2e2e',
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

type SalesListProps = PropsWithChildren<{
  title: string;
}>;

function SalesList(props: SalesListProps): React.JSX.Element {
  const styles = createStyles();
  const [sales, setSales] = useState(salesList.sort((a, b) => b.date - a.date));
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('day');
  const now = new Date();
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();
  const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1);

  const filterSales = (filter: string) => {
    const now = new Date();
    let filteredSales = salesList;

    if (filter === 'day') {
      filteredSales = salesList.filter(
        sale =>
          sale.date.toDate().toLocaleDateString() === now.toLocaleDateString(),
      );
    } else if (filter === 'week') {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      filteredSales = salesList.filter(
        sale => sale.date.toDate() >= startOfWeek,
      );
    } else if (filter === 'month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      filteredSales = salesList.filter(
        sale => sale.date.toDate() >= startOfMonth,
      );
    }

    console.log(now.toLocaleDateString());

    setSales(filteredSales);
    let sum = 0;
    filteredSales.forEach(i => {
      sum += i.total;
      console.log(i);
    });
    setTotal(sum);
  };

  const update = () => {
    setSales([]);
  };

  useEffect(() => {
    //setSales(salesList.sort((a, b) => b.date - a.date));

    console.log(sales);
    return (cleanUp = () => {});
  }, [sales]);

  return (
    <>
      <Picker onValueChange={() => {}} style={styles.pickerStyle}>
        {}
      </Picker>
      <View style={styles.rowContent}>
        <PeriodButton
          title={''}
          onPressDay={() => filterSales('day')}
          onPressWeek={() => filterSales('week')}
          onPressMonth={() => filterSales('month')}
        />
        <View style={styles.container}>
          <View style={styles.rowTile}>
            <Text style={styles.pageTitle}>Cliente</Text>
            <Text style={styles.pageTitle}>Teléfono</Text>
            <Text style={styles.pageTitle}>Servicio</Text>
            <Text style={styles.pageTitle}>Forma de Pago</Text>
            <Text style={styles.pageTitle}>Fecha</Text>
            <Text style={styles.pageTitle}>Total</Text>
          </View>
          <FlatList
            data={sales}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <SalesCard
                id={item.id}
                name={
                  clientsList.find(e => e.id == item.clientId)
                    ? clientsList.find(e => e.id == item.clientId).name
                    : ''
                }
                phone={
                  clientsList.find(e => e.id == item.clientId)
                    ? clientsList.find(e => e.id == item.clientId).phone
                    : ''
                }
                service={item.services}
                paymentMethod={item.paymentMethod}
                date={
                  item.date.toDate().toLocaleDateString() +
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

export default SalesList;
