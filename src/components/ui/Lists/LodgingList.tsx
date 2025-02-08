import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import LodgingCard from '../Cards/LodgingCard';
import {
  lodgingList,
  petList,
} from '../../../services/firebase/firestore/firestoreService';
import DayItem from '../items/DayItem';
import PetButton from '../buttons/PetButton';
import { availableCatRooms, availableDogRooms, getAvailableRooms } from '../../../services/local/rooms/roomsServices';
import RoomItem from '../items/roomItem';

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
    row: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
    },
    availables: {
      width: 'auto',
      height: 'auto',
      alignSelf: 'center',
      marginHorizontal: 50,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    text: {
      color: '#2e2e2e',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

const days = Array.from({length: 28}, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i + 1);
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
    date:
      date.getFullYear().toString() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.toString().split(' ')[2],
  };
});

type LodgingListProps = PropsWithChildren<{
  title: string;
}>;

function LodgingList(props: LodgingListProps): React.JSX.Element {
  const styles = createStyles();
  const [updateLisFlag, setUpdateLisFlag] = useState(lodgingList);
  const [selectedDay, setSelectedDay] = useState();
  const [filter, setFilter] = useState('none');
  const today = new Date();
  const [dogRoom, setDogRoom] = useState(availableDogRooms);
  const [catRoom, setCatRoom] = useState(availableCatRooms);
  const filteredData = lodgingList.filter(
    e => e.checkIn.toDate().toDateString() <= today.toDateString(),
  );
  const filterByState = filteredData.filter(
    e => e.state !== 'Cobrado' && e.state !== 'Cancelado',
  );
  const [lodging, setLodging] = useState(
    filterByState.sort((a, b) => a.checkIn - b.checkIn),
  );
  const [list, setList] = useState(lodgingList);

  const renderItem = ({item}: {id: string; name: string; date: string}) => {
    const isSelected = selectedDay === item.id;
    const day = `${item.name.substring(0, 3)} ${(item.date.split('-')[2] - 1)
      .toString()
      .padStart(2, '0')}/${item.date.split('-')[1]}`;
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
        new Date(e.checkIn.toDate()).toDateString() ===
        new Date(date).toDateString(),
    );
    const updatedFilterByState = updatedFilteredData.filter(
      e => e.state !== 'Cobrado' && e.state !== 'Cancelado',
    );
    setList(updatedFilterByState.sort((a, b) => a.checkIn - b.checkIn));
    if (filter !== 'none') {
      const updatedFilteredBySpecie = updatedFilterByState.filter(e => {
        const pet = petList.find(i => i.id === e.petId[0]);
        const _specie = pet ? pet.specie : 'Perro';
        if (_specie === filter) {
          return e;
        }
      });
      setLodging(updatedFilteredBySpecie.sort((a, b) => b.checkIn - a.checkIn));
    } else {
      setLodging(updatedFilterByState.sort((a, b) => b.checkIn - a.checkIn));
    }
  };

  const onSelectSpecie = (specie: string) => {
    if (specie !== filter) {
      setFilter(specie);
    }
    console.log(specie);
    const updatedFilteredData = list.filter(e => {
      const pet = petList.find(i => i.id === e.petId[0]);
      const _specie = pet ? pet.specie : 'Perro';
      if (_specie === specie) {
        return e;
      }
    });
    setLodging(updatedFilteredData.sort((a, b) => b.checkIn - a.checkIn));
  };

  const onDeselect = () => {
    setFilter('none');
    const updatedFilteredData = lodgingList.filter(
      e => e.checkIn.toDate().toDateString() === today.toDateString(),
    );
    const updatedFilterByState = updatedFilteredData.filter(
      e => e.state !== 'Cobrado' && e.state !== 'Cancelado',
    );
    setLodging(updatedFilterByState.sort((a, b) => b.checkIn - a.checkIn));
  };

  const update = () => {
    setUpdateLisFlag([]);
  };

  useEffect(() => {
    // const updatedFilteredData = lodgingList.filter(
    //   e => e.checkIn.toDate().toDateString() === today.toDateString(),
    // );
    const updatedFilterByState = lodgingList.filter(
      e => e.state !== 'Cobrado' && e.state !== 'Cancelado',
    );
    setLodging(updatedFilterByState.sort((a, b) => a.checkIn - b.checkIn));
    setList(updatedFilterByState.sort((a, b) => a.checkIn - b.checkIn));
    getAvailableRooms();
    setDogRoom(availableDogRooms);
    setCatRoom(availableCatRooms);

    return () => {};
  }, [updateLisFlag]);

  return (
    <>
      <View style={styles.row}>
        <PetButton
          title={''}
          onSelectDog={() => onSelectSpecie('Perro')}
          onSelectCat={() => onSelectSpecie('Gato')}
          onSelectBird={() => onSelectSpecie('Razas Pequeñas')}
          onDeselectFilter={() => onDeselect()}
        />
        <View style={styles.availables}>
          <Text style={styles.text}>Perros</Text>
          <FlatList data={dogRoom} horizontal={true} renderItem={({item}) => (
            <RoomItem size={item.size} available={item.availables} total={item.total} />
          )}/>
        </View>
        <View style={styles.availables}>
        <Text style={styles.text}>Gatos</Text>
          <FlatList data={catRoom} horizontal={true} renderItem={({item}) => (
            <RoomItem size={item.size} available={item.availables} total={item.total} />
          )}/>
        </View>
      </View>
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
                time={checkInDate.toTimeString().split(' ')[0]}
                petId={item.petId[0]}
                size={item.size}
                color={''}
                petImage={pet.petImage}
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
