import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './PokemonDetail.css'
import { Link } from 'react-router-dom'

const PokemonDetail = () => {
	const [allPokemons, setAllPokemons] = useState([])
	const [selectedPokemon, setSelectedPokemon] = useState(null)
	const searchTermRef = useRef('')

	useEffect(() => {
		axios
			.get('https://pokeapi.co/api/v2/pokemon?limit=100000')
			.then((response) => {
				setAllPokemons(response.data.results)
			})
			.catch((error) => console.error('Error fetching all Pokémon:', error))
	}, [])

	const handleSearch = () => {
		const searchTerm = searchTermRef.current.value.toLowerCase()
		const pokemon = allPokemons.find((p) => p.name.toLowerCase() === searchTerm)
		if (pokemon) {
			axios
				.get(pokemon.url)
				.then((response) => {
					setSelectedPokemon(response.data)
				})
				.catch((error) => console.error('Error fetching Pokémon details:', error))
		} else {
			alert('Pokémon not found')
		}
	}

	return (
		<div className='pokemon'>
			<h1 className='pokemon__tittle'>Pokémon Detail</h1>

			<div className='pokemon-main'>
				<div className='pokemon__search'>
					<input className='pokemon__search-input' type='text' ref={searchTermRef} placeholder='Enter Pokémon name...' />
					<button className='pokemon__search-button' onClick={handleSearch}>
						Search
					</button>
				</div>
				{selectedPokemon && (
					<div className='pokemon-details'>
						<h2 className='pokemon-details__name'>{selectedPokemon.name}</h2>

						<img className='pokemon-details__image' src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />

						<div className='pokemon-details__types'>
							<h2>Types</h2>
							<ul>
								{selectedPokemon.types.map((typeInfo) => (
									<li key={typeInfo.type.name}>{typeInfo.type.name}</li>
								))}
							</ul>
						</div>

						<div className='pokemon-details__stats'>
							<h2>Stats</h2>
							<ul>
								{selectedPokemon.stats.map((statInfo) => (
									<li key={statInfo.stat.name}>
										{statInfo.stat.name}: {statInfo.base_stat}
									</li>
								))}
							</ul>
							<div className='pokemon-details__stats-total'>Total: {selectedPokemon.stats.reduce((total, statInfo) => total + statInfo.base_stat, 0)}</div>
						</div>
					</div>
				)}
				<div className='pokemon-main__button'>
					{/* <h1>Lista de pokemones</h1>
          <ul>
            {allPokemons.map((pokemon) => (
              <li key={pokemon.name}>{pokemon.name}</li>
            ))}
          </ul> */}
					<Link to='/'>
						<h2>Back to main</h2>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default PokemonDetail
