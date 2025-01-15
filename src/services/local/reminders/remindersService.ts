import {cutsList} from '../../firebase/firestore/firestoreService';

interface Cut {
  id: string;
  date: string;
  // Add other properties as needed
}

export const reminders: Cut[] = [];

export const getReminders = () => {
  if (reminders.length === 0) {
    const now = new Date();
    const tenDaysAgo = new Date(now);
    tenDaysAgo.setDate(now.getDate() - 28);
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 21);

    const filteredCuts = cutsList.filter(cut => {
      const cutDate = new Date(cut.checkIn.toDate());
      console.log(cutDate);
      return cutDate >= tenDaysAgo && cutDate <= sevenDaysAgo;
    });

    console.log(tenDaysAgo, sevenDaysAgo, now);

    reminders.push(...filteredCuts);
  }
  return reminders;
};
