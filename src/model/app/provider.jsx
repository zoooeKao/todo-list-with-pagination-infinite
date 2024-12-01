// @ts-check
import { useState } from 'react';
import { ProfileStateContext, LoadDataStateContext, TabStateContext } from './context';

/**
 * @type {React.FC<{ children: React.ReactNode }>}
 */
export const ProfileContextProvider = ({ children }) => {
  const [profileState, setProfileState] = useState(
    /** @type {import('./content-state').ProfileState} */ ({ status: 'login' }),
  );

  return (
    <ProfileStateContext.Provider value={{ profileState, setProfileState }}>{children}</ProfileStateContext.Provider>
  );
};

/**
 * @type {React.FC<{ children: React.ReactNode }>}
 */
export const LoadDataContextProvider = ({ children }) => {
  const [loadDataState, setLoadDataState] = useState(
    /** @type {import('./content-state').LoadDataState} */ ('pagination'),
  );

  return (
    <LoadDataStateContext.Provider value={{ loadDataState, setLoadDataState }}>
      {children}
    </LoadDataStateContext.Provider>
  );
};

/**
 * @type {React.FC<{ children: React.ReactNode }>}
 */
export const TabContextProvider = ({ children }) => {
  const [tabState, setTabState] = useState(/** @type {import('./content-state').TabState} */ ('all'));

  return <TabStateContext.Provider value={{ tabState, setTabState }}>{children}</TabStateContext.Provider>;
};
