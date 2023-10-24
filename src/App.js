import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pokedex from './components/Pokedex/Pokedex'
import PokemonDetail from './components/PokemonDetail/PokemonDetail'

function App() {
	return (
		<BrowserRouter>
			{/* <Pokedex /> */}
			<Routes>
				<Route exact path='/' element={<Pokedex />} />
				<Route exact path='/pokemondetail' element={<PokemonDetail />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
