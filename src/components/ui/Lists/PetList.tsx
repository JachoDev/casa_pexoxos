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
import PetCard from '../Cards/PetCards';
import {petList} from '../../../services/firebase/firestore/firestoreService';
import LetterItem from '../items/LetterItem';

const createStyles = () =>
  StyleSheet.create({
    container: {
      width: 'auto',
      height: 'auto',
      backgroundColor: '#ffffff',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 6,
      borderColor: '#2e2e2e'
    },
    lettersBar: {
      flexDirection: 'row',
      width: '100%',
      height: 65,
      backgroundColor: '#d1507e',
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      paddingHorizontal: 2,
      paddingTop: 5,
      borderBottomWidth: 6,
      borderColor: '#2e2e2e',
    },
    daysList: {
      width: '100%',
      height: 'auto',
      alignItems: 'flex-start',
      alignContent: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('').map((letter, index) => ({
  id: index + 1,
  letter: letter,
}));

type PetListProps = PropsWithChildren<{
  title: string;
}>;

function PetList(props: PetListProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [selectedLetter, setSelectedLetter] = useState(1);
  const [pets, setPets] = useState(
    petList.sort((a, b) => a.name.localeCompare(b.name)),
  );
  const filterPets = (pets: typeof petList, letter: string) => {
    return pets.filter(pet => pet.name.toLowerCase().startsWith(letter));
  };

  const [filteredPets, setFilteredPets] = useState(filterPets(petList, 'a'));

  const renderItem = ({item}: {id: string, letter: string}) => {
    const isSelected = selectedLetter === item.id;

    return (
      <LetterItem letter={item.letter} onPress={() => onSelectLetter(item.id, item.letter)} isSelected={isSelected}/>
    );
  };

  const onSelectLetter = (id: string, letter: string) => {
      setSelectedLetter(id);
      setFilteredPets(filterPets(petList, letter));
    };

  useEffect(() => {
    setFilteredPets(filterPets(petList, 'a'));
  }, [pets]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.lettersBar}>
          <View style={styles.daysList}>
            <FlatList
              data={letters}
              keyExtractor={item => item.id}
              extraData={selectedLetter}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </View>
        </View>
        <FlatList
          data={filteredPets}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <PetCard petId={item.id} image={''} />}
          numColumns={3}
        />
      </View>
    </>
  );
}

export default PetList;
