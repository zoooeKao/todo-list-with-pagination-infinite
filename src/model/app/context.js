// @ts-check
import { createContext, useContext } from 'react';

// profileState
/**
 * @typedef {{profileState: import('./content-state').ProfileState;setProfileState: React.Dispatch<React.SetStateAction<import('./content-state').ProfileState>>;}} ProfileContext
 */

/**
 * @type {React.Context<ProfileContext | null>}
 */
export const ProfileStateContext = createContext(null);

export const useProfileState = () => {
  const profile = useContext(ProfileStateContext);

  if (!profile) throw new Error('Profile State does not has a provider.');

  return profile;
};

// loadDataState
/**
 * @typedef {{loadDataState: import('./content-state').LoadDataState;setLoadDataState: React.Dispatch<React.SetStateAction<import('./content-state').LoadDataState>>;}} LoadDataContext
 */

/**
 * @type {React.Context<LoadDataContext | null>}
 */
export const LoadDataStateContext = createContext(null);

export const useLoadDataState = () => {
  const loadData = useContext(LoadDataStateContext);

  if (!loadData) throw new Error('LoadData State does not has a provider.');

  return loadData;
};

// TabState
/**
 * @typedef {{tabState: import('./content-state').TabState; setTabState: React.Dispatch<React.SetStateAction<import('./content-state').TabState>>;}} TabContext
 */

/**
 * @type {React.Context<TabContext | null>}
 */
export const TabStateContext = createContext(null);

export const useTabState = () => {
  const tab = useContext(TabStateContext);

  if (!tab) throw new Error('Tab State does not has a provider.');

  return tab;
};

// themeState
export const ThemeContext = createContext(null);

// layoutState
export const LayoutContext = createContext(null);
