import { useTheme } from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  FlatList,
} from 'react-native';
import ServiceCard from '../Cards/ServiceCard';


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
    scrollView: {
      paddingRight: 20,
    },
    icon: {
      fontFamily: 'Segoe MDL2 Assets',
      fontSize: 16,
    },
    heroGradient: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    heroBackgroundImage: {
      position: 'absolute',
      resizeMode: 'cover',
      width: '100%',
      height: '99%',
    },
    pageHeader: {},
    pageTitleContainer: {
      height: 204,
      justifyContent: 'center',
    },
    pageTitle: {
      // https://github.com/microsoft/WinUI-Gallery/blob/c3cf8db5607c71f5df51fd4eb45d0ce6e932d338/WinUIGallery/HomePage.xaml#L82
      // TitleLargeTextBlockStyle
      fontSize: 20,
      fontWeight: '600', // SemiBold
      paddingLeft: 36,
      color: '#000000'
    },
  });

type ServiceListProps = PropsWithChildren<{
  title: string;
}>;

function ServiceList({ title }: ServiceListProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  const services = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Mascota 1',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '01:00 PM',
      color: 'green',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Mascota 2',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '01:30 PM',
      color: 'red',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Mascota 3',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '02:00 PM',
      color: 'blue',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb2zxa',
      name: 'Mascota 4',
      service: 'Corte',
      date: '15/11/2024',
      time: '03:00 PM',
      color: 'yellow',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa17f63',
      name: 'Mascota 5',
      service: 'Baño',
      date: '15/11/2024',
      time: '03:30 PM',
      color: 'green',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d12',
      name: 'Mascota 6',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '04:00 PM',
      color: 'red',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53ab328ba',
      name: 'Mascota 7',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '04:30 PM',
      color: 'purple',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa47f63',
      name: 'Mascota 8',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '05:00 PM',
      color: 'yellow',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e59d72',
      name: 'Mascota 9',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '06:00 PM',
      color: 'red',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53ab728ba',
      name: 'Mascota 10',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '06:30 PM',
      color: 'purple',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa67f63',
      name: 'Mascota 11',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '07:00 PM',
      color: 'blue',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e62d72',
      name: 'Mascota 12',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '07:30 PM',
      color: 'green',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
  ]

  return (
    <>
			<View style={styles.container}>
        <FlatList data={services} renderItem={({item}) => <ServiceCard name={item.name} service={item.service} date={item.date} time={item.time} color={item.color} petImage={item.petImage} />} numColumns={3} />
			</View>
		</>
  );
}

export default ServiceList;
