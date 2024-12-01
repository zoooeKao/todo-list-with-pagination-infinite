// @ts-check
import React, { useState } from 'react';
import { useProfileState, ThemeContext, LayoutContext } from './model/app/context';
import { Navbar } from './page/navbar/navbar';
import { LoginForm } from './page/login-form/login-form';
import { TodoWrapper } from './page/todo-wrapper/todo-wrapper';

export const App = () => {
  const { profileState, setProfileState } = useProfileState();
  const [theme, setTheme] = useState(/** @type {import('./model/global-state').Theme}*/ ('white'));
  const [layout, setLayout] = useState(/** @type {import('./model/global-state').Layout}*/ ('row'));
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <LayoutContext.Provider value={layout}>
          <Navbar getTheme={theme => setTheme(theme)} getLayout={layout => setLayout(layout)} />
          {profileState.status === 'login' ? (
            <LoginForm onProfileState={state => setProfileState(state)} />
          ) : (
            <TodoWrapper userId={profileState.id} />
          )}
        </LayoutContext.Provider>
      </ThemeContext.Provider>
    </>
  );
};
