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
import ServiceCard from '../Cards/ServiceCard';
import { cutsList, petList } from '../../../../App';
import { doc, collection, addDoc, Timestamp, updateDoc, getDocs } from "firebase/firestore"; 
import { db } from '../../../../firebaseConfig';

const createStyles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    daysBar:{
      width: '100%',
      height: 50,
      backgroundColor: '#03bdbf',
    },
  });

type ServiceListProps = PropsWithChildren<{
  title: string;
}>;

function ServiceList({ title }: ServiceListProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const today = new Date(Date.now() - 18000000);
  const filteredData = cutsList.filter((e) => e.checkIn.toDate().toDateString() >= today.toDateString());
  const filterByState = filteredData.filter((e) => e.state != "Cobrado" && e.state != "Cancelado")
  const [services, setServices] = useState(filterByState.sort((a, b) => b.checkIn - a.checkIn));
  console.log(cutsList)
  console.log(services)

  useEffect(() => {
    const filteredData = cutsList.filter((e) => e.checkIn.toDate().toDateString() <= today.toDateString());
    const filterByState = filteredData.filter((e) => e.state != "Cobrado" && e.state != "Cancelado")
    setServices(filterByState.sort((a, b) => b.checkIn - a.checkIn));
  
    return cleanUp = () => {
      
    }
  }, []);

  return (
    <>
			<View style={styles.container}>
        <View style={styles.daysBar}>
          
        </View>
        <FlatList
          data={services}
          renderItem={({item}) =>
            <ServiceCard name={petList.find((e) => e.id == item.petId).name}
            serviceId={item.id}
            service={item.groomming}
            recomendations={item.recomendations}
            date={item.checkIn.toDate().toDateString()}
            time={item.checkIn.toDate().toLocaleTimeString()}
            color={item.color}
            petImage={item.petImage} petId={item.petId}  />
          }
          numColumns={4}
        />
			</View>
		</>
  );
}

export default ServiceList;
