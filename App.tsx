import React, { useEffect } from 'react';
import AppRouter from './src/router/RouterNavigator';
import { getAll } from './src/services/firebase/firestore/firestoreService';
import { getReminders } from './src/services/local/reminders/remindersService';

function App(): React.JSX.Element  {
  const getStore = async () => {
    try {
      console.log('Firestore connected')
      await getAll();
      getReminders();
    }
    catch(e) { console.log(e) }
  };


  useEffect(() => {
    getStore();

    return () => {

    };
  }, []);

  return (
    <>
      <AppRouter/>
    </>
  );
}

export default App;
