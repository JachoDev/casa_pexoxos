import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  FlatList,
} from 'react-native';
import SalesCard from '../Cards/SalesCard';
import { salesList, clientsList, petList } from '../../../../App';


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
    rowTile:{
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
      fontSize: 12,
      fontWeight: '600', // SemiBold
      color: 'blue',
      flex: 1,
    },
});

type SalesListProps = PropsWithChildren<{
  title: string;
}>;

function SalesList(props: SalesListProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [sales, setSales] = useState(salesList);

  useEffect(() => {
    setSales(salesList);
    console.log(sales);
    return cleanUp = () => {
      
    }
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
          renderItem={({item}) =>
            <SalesCard 
              name={clientsList.find((e) => e.id == item.clientId).name}
              phone={clientsList.find((e) => e.id == item.clientId).phone}
              service={item.services}
              paymentMethod={item.paymentMethod}
              date={item.date.toDate().toUTCString()}
              total={' $' + item.total}
            />
          }
        />
			</View>
		</>
  );
}

export default SalesList;
