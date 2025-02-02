import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState, useMemo} from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import ServiceCard from '../Cards/ServiceCard';
import {
  cutsList,
  petList,
} from '../../../services/firebase/firestore/firestoreService';
import DayItem from '../items/DayItem';
import PetButton from '../buttons/PetButton';

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
    date:
      date.getFullYear().toString() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0'),
  };
});

type ServiceListProps = PropsWithChildren<{
  title: string;
}>;

function ServiceList({title}: ServiceListProps): React.JSX.Element {
  const styles = createStyles();
  const today = useMemo(() => new Date(), []);
  const [cuts, setCuts] = useState(cutsList);
  const [filter, setFilter] = useState('none');
  const filteredData = cutsList.filter(
    e => e.checkIn.toDate().toDateString() <= today.toDateString(),
  );
  const filterByState = filteredData.filter(
    e => e.state != 'Cobrado' && e.state != 'Cancelado',
  );
  const [services, setServices] = useState(
    filterByState.sort((a, b) => b.checkIn - a.checkIn),
  );
  const [selectedDay, setSelectedDay] = useState();

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
    const filteredDate = new Date(date);
    const updatedFilteredData = cutsList.filter(
      e =>
        e.checkIn.toDate().toLocaleDateString() ===
        filteredDate.toLocaleDateString(),
    );
    const updatedFilterByState = updatedFilteredData.filter(
      e => e.state !== 'Cobrado' && e.state !== 'Cancelado',
    );
    setCuts(updatedFilterByState.sort((a, b) => b.checkIn - a.checkIn));
    if (filter !== 'none') {
      const updatedFilteredBySpecie = updatedFilterByState.filter(e => {
        const pet = petList.find(i => i.id === e.petId);
        const _specie = pet ? pet.specie : 'Perro';
        if (_specie === filter) {
          return e;
        }
      });
      setServices(updatedFilteredBySpecie.sort((a, b) => b.checkIn - a.checkIn));
    } else {
      setServices(updatedFilterByState.sort((a, b) => b.checkIn - a.checkIn));
    }
  };

  const onSelectSpecie = (specie: string) => {
    if (specie !== filter) {
      setFilter(specie);
    }
    const updatedFilteredData = cuts.filter(e => {
      const pet = petList.find(i => i.id === e.petId);
      const _specie = pet ? pet.specie : 'Perro';
      if (_specie === specie) {
        return e;
      }
    });
    setServices(updatedFilteredData.sort((a, b) => b.checkIn - a.checkIn));
  };

  const onDeselect = () => {
    setFilter('none');
    const updatedFilteredData = cuts.filter(
      e => e.checkIn.toDate().toDateString() === today.toDateString(),
    );
    const updatedFilterByState = updatedFilteredData.filter(
      e => e.state !== 'Cobrado' && e.state !== 'Cancelado',
    );
    setServices(updatedFilterByState.sort((a, b) => b.checkIn - a.checkIn));
  };

  const update = () => {
    //setServices([]);
  };

  useEffect(() => {
    const updatedFilteredData = cutsList.filter(
      e => e.checkIn.toDate().toDateString() === today.toDateString(),
    );
    const updatedFilterByState = updatedFilteredData.filter(
      e => e.state !== 'Cobrado' && e.state !== 'Cancelado',
    );
    setServices(updatedFilterByState.sort((a, b) => b.checkIn - a.checkIn));
    setCuts(updatedFilterByState.sort((a, b) => b.checkIn - a.checkIn));

    return () => {
      // cleanup code here if needed
    };
  }, []);

  return (
    <>
      <PetButton
        title={''}
        onSelectDog={() => onSelectSpecie('Perro')}
        onSelectCat={() => onSelectSpecie('Gato')}
        onSelectBird={() => onSelectSpecie('Razas Pequeñas')}
        onDeselectFilter={() => onDeselect()}
      />
      <View style={styles.container}>
        <View style={styles.daysBar}>
          <View style={styles.daysList}>
            <FlatList
              data={days}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </View>
        </View>
        <FlatList
          data={services}
          renderItem={({item}) => (
            <ServiceCard
              name={petList.find(e => e.id == item.petId).name}
              serviceId={item.id}
              service={item.groomming}
              recomendations={item.recomendations}
              date={item.checkIn.toDate().toLocaleDateString()}
              time={item.checkIn.toDate().toTimeString().split(' ')[0]}
              color={item.color}
              petImage={petList.find(e => e.id == item.petId).petImage}
              petId={item.petId}
              onReset={update}
            />
          )}
          numColumns={3}
        />
      </View>
    </>
  );
}

export default ServiceList;
