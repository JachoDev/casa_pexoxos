import { createContext, useContext, useReducer } from 'react';

const PetButtonsContext = createContext(null);

const PetButtonsDispatchContext = createContext(null);

export function PetButtonsProvider({ children }) {

  return(
    <PetButtonsContext.Provider>
    </PetButtonsContext.Provider>
  );
};

export function usePetButtons() {
  return useContext(PetButtonsContext);
}

export function usePetButtonsDispatch() {
  return useContext(PetButtonsDispatchContext)
} 

function petButtonsReducer(buttons, action) {
  switch (action.type) {
    case 'dogs': {
      return [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialButtons = [];