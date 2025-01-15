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
import {
  clientsList,
  salesList,
} from '../../../services/firebase/firestore/firestoreService';
import ExpensesCard from '../Cards/ExpensesCard';

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
      borderColor: '#2e2e2e'
    },
    rowTile: {
      height: '20%',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: '#88b764',
      paddingHorizontal: 40,
      borderBottomWidth: 6,
      borderColor: '#2e2e2e',
    },
    image: {
      width: 100,
      height: 100,
    },
    pageTitle: {
      fontSize: 16,
      fontWeight: 'bold', // SemiBold
      color: '#2e2e2e',
      flex: 1,
    },
  });

type SalesListProps = PropsWithChildren<{
  title: string;
}>;

function SalesList(props: SalesListProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const today = new Date();
  const [sales, setSales] = useState(salesList.sort((a, b) => b.date - a.date));

  const update = () => {
    setSales([]);
  };

  useEffect(() => {
    setSales(salesList.sort((a, b) => b.date - a.date));
    console.log(sales);
    return (cleanUp = () => {});
  }, [sales]);

  return (
    <>
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
              name={clientsList.find((e) => e.id == item.clientId).name}
              phone={clientsList.find((e) => e.id == item.clientId).phone}
              service={item.services}
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

export default SalesList;
