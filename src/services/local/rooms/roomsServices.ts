import {catBoxes, dogBoxes, lodgingList} from '../../firebase/firestore/firestoreService';

export const availableDogRooms = [];
export const availableCatRooms = [];

function sortSizes(list) {
  const sGroup = list.filter(item => item.size.endsWith('S')).sort((a, b) => b.size.split('X').length - a.size.split('X').length);
  const mGroup = list.filter(item => item.size.endsWith('M'));
  const lGroup = list.filter(item => item.size.endsWith('L')).sort((a, b) => a.size.split('X').length - b.size.split('X').length);

  return [...sGroup, ...mGroup, ...lGroup];
}

export const getAvailableRooms = () => {
  const today = new Date();
	availableDogRooms.splice(0, availableDogRooms.length);
	availableCatRooms.splice(0, availableCatRooms.length);
  const filteredList = lodgingList.filter(
    e =>
      e.state !== 'Cobrado' &&
      e.state !== 'Cancelado' &&
      e.checkIn.toDate() <= today &&
      e.checkOut.toDate() >= today
  );
	const filteredDogList = filteredList.filter(e => e.specie === 'Perro');
	const filteredCatList = filteredList.filter(e => e.specie === 'Gato');

	const availableDogBoxes = dogBoxes.map(e => {
		const filterBySize = filteredDogList.filter(i => i.size === e.box);
		return {size: e.box, total: e.qty, availables: e.qty - filterBySize.length}
	});

	const availableCatBoxes = catBoxes.map(e => {
		const filterBySize = filteredCatList.filter(i => i.size === e.box);
		return {size: e.box, total: e.qty, availables: e.qty - filterBySize.length}
	});

	availableDogRooms.push(...sortSizes(availableDogBoxes));
	availableCatRooms.push(...sortSizes(availableCatBoxes));

};
