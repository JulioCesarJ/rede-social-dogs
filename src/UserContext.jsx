import React from "react";
import { USER_GET, TOKEN_POST, TOKEN_VALIDATE_POST } from './../api';
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null)
  const [login, setLogin] = React.useState(null)
  const [load, setLoad] = React.useState(false)
  const [error, setError] = React.useState(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token')
      if (token) {
        try {
          setError(null)
          setLoad(true)
          const { url, options } = TOKEN_VALIDATE_POST(token)
          const response = await fetch(url, options)
          if (!response.ok) throw new Error('Token Inválido!')
          await getUser(token)
        } catch (error) {
          userLogout()
        } finally {
          setLoad(false)
        }
      }
    }
    autoLogin()
  }, [])

  async function getUser(token) {
    const { url, options } = USER_GET(token)
    const response = await fetch(url, options)
    const json = await response.json()
    setData(json)
    setLogin(true)
  }

  async function userLogin(username, password) {
    try {
      setError(null)
      setLoad(true)
      const { url, options } = TOKEN_POST({ username, password })
      const tokenRes = await fetch(url, options)
      if (!tokenRes.ok) throw new Error(`Erro: Dados Inválidos!`)
      const { token } = await tokenRes.json()
      window.localStorage.setItem('token', token)
      await getUser(token)
      navigate('/conta')
    } catch (error) {
      setError(error.message)
      setLogin(false)
    } finally {
      setLoad(false)
    }

  }

  async function userLogout() {
    setData(null)
    setError(null)
    setLoad(false)
    setLogin(false)
    window.localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <UserContext.Provider value={{ userLogin, userLogout, data, error, load, login }}>
      {children}
    </UserContext.Provider>
  );
};
