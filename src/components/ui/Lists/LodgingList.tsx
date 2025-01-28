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
import PetButton from '../buttons/PetButton';

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
      borderColor: '#2e2e2e',
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

const days = Array.from({length: 28}, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return {
    id: i + 1,
    name: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ][date.getDay()],
    date: date.toISOString().split('T')[0],
  };
});

type LodgingListProps = PropsWithChildren<{
  title: string;
}>;

function LodgingList(props: LodgingListProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [selectedDay, setSelectedDay] = useState();
  const today = new Date();
  const filteredData = lodgingList.filter(
    e => e.checkIn.toDate().toDateString() <= today.toDateString(),
  );
  const filterByState = filteredData.filter(
    e => e.state != 'Cobrado' && e.state != 'Cancelado',
  );
  const [lodging, setLodging] = useState(
    filterByState.sort((a, b) => a.checkIn - b.checkIn),
  );

  const renderItem = ({item}: {id: string; name: string; date: string}) => {
    const isSelected = selectedDay === item.id;

    const day = `${item.name.substring(0, 3)} ${item.date.split('-')[2]}/${
      item.date.split('-')[1]
    }`;
    return (
      <DayItem
        day={day}
        onPress={() => onSelectDay(item.id, item.date)}
        isSelected={isSelected}
      />
    );
  };

  const onSelectDay = (day: string, date: string) => {
    setSelectedDay(day);
    const updatedFilteredData = lodgingList.filter(
      e =>
        new Date(e.checkIn.toDate()).toLocaleDateString() ===
        new Date(date).toLocaleDateString(),
    );
    const updatedFilterByState = updatedFilteredData.filter(
      e => e.state !== 'Cobrado' && e.state !== 'Cancelado',
    );
    setLodging(updatedFilterByState.sort((a, b) => a.checkIn - b.checkIn));
    console.log(day);
    console.log(date);
    console.log(new Date(date).toLocaleDateString());
  };

  const update = () => {
    setLodging([]);
  };

  useEffect(() => {
    const updatedFilteredData = lodgingList.filter(
      e => e.checkIn.toDate().toDateString() === today.toDateString(),
    );
    const updatedFilterByState = updatedFilteredData.filter(
      e => e.state !== 'Cobrado' && e.state !== 'Cancelado',
    );
    setLodging(updatedFilterByState.sort((a, b) => a.checkIn - b.checkIn));
    console.log(lodging);

    return (cleanUp = () => {});
  }, []);

  return (
    <>
      <PetButton title={''} />
      <View style={styles.container}>
        <View style={styles.daysBar}>
          <View style={styles.daysList}>
            <FlatList
              data={days}
              keyExtractor={item => item.id.toString()}
              extraData={selectedDay}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </View>
        </View>
        <FlatList
          data={lodging}
          renderItem={({item}) => {
            const pet = petList.find(e => e.id === item.petId[0]);
            const checkInDate = item.checkIn.toDate();
            const checkOutDate = item.checkOut.toDate();
            const months = [
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
            const formattedCheckInDate = `${checkInDate.getDate()} de ${
              months[checkInDate.getMonth()]
            } de ${checkInDate.getFullYear()}`;
            const formattedCheckOutDate = `${checkOutDate.getDate()} de ${
              months[checkOutDate.getMonth()]
            } de ${checkOutDate.getFullYear()}`;

            return (
              <LodgingCard
                name={pet ? pet.name : 'Desconocido'}
                lodgingId={item.id}
                inDate={formattedCheckInDate}
                outDate={formattedCheckOutDate}
                time={checkInDate.toTimeString()}
                petId={item.petId[0]}
                color={''}
                petImage={''}
                onReset={update}
              />
            );
          }}
          numColumns={4}
        />
      </View>
    </>
  );
}

export default LodgingList;
