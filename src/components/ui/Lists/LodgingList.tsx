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
import ServiceCard from '../Cards/ServiceCard';
import LodgingCard from '../Cards/LodgingCard';
import {collection, getDocs, Timestamp} from 'firebase/firestore';
import {db} from '../../../../firebaseConfig';
import {
  lodgingList,
  petList,
} from '../../../services/firebase/firestore/firestoreService';
import DayItem from '../items/DayItem';

const createStyles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      borderWidth: 6,
      borderColor: '#2e2e2e'
    },
    daysBar: {
      flexDirection: 'row',
      width: '100%',
      height: 70,
      backgroundColor: '#03bdbf',
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5,
      paddingTop: 5,
      borderBottomWidth: 6,
      borderColor: '#2e2e2e',
    },
    daysList: {
      width: '100%',
      height: 'auto',
      backgroundColor: '#03bdbf',
      alignItems: 'flex-start',
      alignContent: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });

  const days = Array.from({ length: 28 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      id: i + 1,
      name: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'][date.getDay()],
      date: date.toISOString().split('T')[0],
    };
  });

type LodgingListProps = PropsWithChildren<{
  title: string;
}>;

function LodgingList(props: LodgingListProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [pets, setPets] = useState(petList);
  const [selectedDay, setSelectedDay] = useState();
  const today = new Date(Date.now() - 18000000);
  const filteredData = lodgingList.filter(
    e => e.checkIn.toDate().toDateString() <= today.toDateString(),
  );
  const filterByState = filteredData.filter(
    e => e.state != 'Cobrado' && e.state != 'Cancelado',
  );
  const [lodging, setLodging] = useState(
    filterByState.sort((a, b) => a.checkIn - b.checkIn),
  );


  const renderItem = ({item}: {id: string, name: string, date: string}) => {
    const isSelected = selectedDay === item.id;

    return (
      <DayItem day={item.name} onPress={() => onSelectDay(item.id, item.date)} isSelected={isSelected}/>
    );
  };

  const onSelectDay = (day: string, date: string) => {
    setSelectedDay(day);
    const updatedFilteredData = lodgingList.filter((e) => e.checkIn.toDate().toDateString() == new Date(date).toDateString());
    const updatedFilterByState = updatedFilteredData.filter((e) => e.state !== "Cobrado" && e.state !== "Cancelado")
    setLodging(updatedFilterByState.sort((a, b) => a.checkIn - b.checkIn));
    console.log(day);
    console.log(date);
    console.log(lodging);
  };

  useEffect(() => {
    const updatedFilteredData = lodgingList.filter((e) => e.checkIn.toDate().toDateString() <= today.toDateString());
    const updatedFilterByState = updatedFilteredData.filter((e) => e.state !== "Cobrado" && e.state !== "Cancelado")
    setLodging(updatedFilterByState.sort((a, b) => a.checkIn - b.checkIn));
    setLodging(lodgingList);
    setPets(petList);
    console.log(pets);
    console.log(lodging);

    return (cleanUp = () => {});
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.daysBar}>
          <View style={styles.daysList}>
            <FlatList
              data={days}
              keyExtractor={item => item.id}
              extraData={selectedDay}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </View>
        </View>
        <FlatList
          data={lodging}
          renderItem={({item}) => (
            <LodgingCard
              name={petList.find(e => e.id == item.petId[0]).name}
              lodgingId={item.id}
              inDate={item.checkIn.toDate().toDateString()}
              outDate={item.checkOut.toDate().toDateString()}
              time={item.checkIn.toDate().toLocaleTimeString()}
              petId={item.petId[0]}
              color={''}
              petImage={''}
            />
          )}
          numColumns={4}
        />
      </View>
    </>
  );
}

export default LodgingList;
