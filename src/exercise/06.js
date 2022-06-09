// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false}
  }

  render() {
    if (this.props.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const hasPokemonName = Boolean(pokemonName.length)
  // const [pokemon, setPokemon] = React.useState(() => null)
  // const [error, setError] = React.useState(() => null)
  // const [status, setStatus] = React.useState(() => 'idle')
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })

  React.useEffect(() => {
    if (hasPokemonName) {
      setState({pokemon: null, status: 'pending', error: null})
      console.log('mudou o nome', pokemonName)
      fetchPokemon(pokemonName).then(
        pokemon => {
          setState({pokemon, status: 'resolved', error: null})
        },
        error => {
          setState({pokemon: null, status: 'rejected', error})
        },
      )
    }

    return () => {
      setState({pokemon: null, status: 'idle', error: null})
    }
  }, [hasPokemonName, pokemonName])

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'

  return (
    <ErrorBoundary hasError={state.status === 'rejected'}>
      {state.status === 'resolved' && (
        <PokemonDataView pokemon={state.pokemon} />
      )}
      {state.status === 'idle' && <div>Submit a pokemon</div>}
      {state.status === 'pending' && <PokemonInfoFallback name={pokemonName} />}
    </ErrorBoundary>
  )

  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this
  // return 'TODO'
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
