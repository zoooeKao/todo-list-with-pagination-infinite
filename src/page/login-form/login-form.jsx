// @ts-check
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../model/app/context';
import { getProfile } from '../../service/get-profile';
import { login } from '../../service/login';
import './login-form.scss';
import { TextInput } from './text-input';

const getLocalStorageUsername = localStorage.getItem('username');

/** @param {Object} param0 登入成功要取得 onLogin
 * @param {(param: import('../../model/app/content-state').ProfileState) => void} param0.onProfileState
 */
export function LoginForm({ onProfileState }) {
  const [username, setUsername] = useState(getLocalStorageUsername || 'emilys');
  const [password, setPassword] = useState('emilyspass');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const theme = useContext(ThemeContext);

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);
    login(username, password)
      .then(() => {
        return getProfile();
      })
      .then(profile => {
        onProfileState({ status: 'logged-in', username: profile.username, id: profile.id });
        remember ? localStorage.setItem('username', username) : localStorage.removeItem('username');
      })
      .catch(errMsg => {
        setHasError(true);
        setUsername('');
        setPassword('');
        alert(errMsg);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  /** @type {React.MouseEventHandler<HTMLButtonElement> } */
  const handleReset = () => {
    setUsername('');
    setPassword('');
    setShowPassword(false);
    setRemember(false);
    setIsSubmitting(false);
    setHasError(false);
    localStorage.removeItem('username');
  };

  return (
    <form className={`login login--${theme}`} onSubmit={handleSubmit}>
      <div className="login__container">
        <h1 className="title">Login</h1>
        {hasError && <div className="login__error">please register first!</div>}
        <TextInput>
          <span>username:</span>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            readOnly={isSubmitting}
            autoFocus
          />
        </TextInput>
        <TextInput>
          <span>password:</span>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            readOnly={isSubmitting}
          />
        </TextInput>
        <label>
          <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} />
          remember me
        </label>
        <br />
        <label>
          <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
          show password
        </label>
        <div className="login__btnWrapper">
          <button className="login__btn" type="submit" disabled={isSubmitting}>
            submit
          </button>
          <button className="login__btn" type="reset" onClick={handleReset} disabled={isSubmitting}>
            reset
          </button>
        </div>
        <br />
      </div>
    </form>
  );
}

// setChecked(!checked) / setChecked(e.target.checked)
// useEffect 的 dependency 需要包含所有 setup 的變數嗎
// https://react.dev/reference/react/useEffect#caveats
// https://react.dev/learn/synchronizing-with-effects (什麼是 external systems)
// pure function
// UI 及 事件處理相關 的程式要分開

// function Title({level, children}) {
//   switch (level) {
//     case 1:
//       return <h1>{children}</h1>;
//     case 2:
//       return <h2>{children}</h2>;
//     default:
//       return <h3>{children}</h3>;
//   }
// }

// <Title level={1}>
//   <input type='text' value={1} onChange={(e) => e} />
// </Title>;
