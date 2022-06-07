// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState = initialName => {
  const initialValue = () =>
    window.localStorage.getItem('initialName') || initialName

  const [name, setName] = React.useState(initialValue)

  React.useEffect(() => {
    window.localStorage.setItem('initialName', name)
  }, [name])

  return [name, setName]
}
function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  const [name, setName] = useLocalStorageState(initialName)

  function handleChange(event) {
    const {value} = event.target
    setName(value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
