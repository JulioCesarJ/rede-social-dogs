import React, { useState } from 'react'

const types = {
  email: {
    // eslint-disable-next-line no-useless-escape
    regex: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    message: 'Preencha um email valido!',
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message: 'A senha precisa ter 1 caracter maiúsuculom 1 minúsculo e 1 digito. Com no mínimo 8 caracteres'
  }
}

const useForm = (type) => {

  const [value, setValue] = useState('')
  const [error, seterror] = useState('')

  function validate(value){
    if(type === false) return true
    if(value.length === 0){
      seterror('Preencha um valor')
      return false
    } else if (types[type] && !types[type].regex.test(value)){
      seterror(types[type].message)
      return false
    } else {
      seterror(null)
      return true
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value)
    setValue(target.value)
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  }
}

export default useForm