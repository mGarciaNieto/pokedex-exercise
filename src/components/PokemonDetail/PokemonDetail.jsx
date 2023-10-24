import { Fragment } from 'react'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './PokemonDetail.css'

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

			<div className='pokemon__search'>
				<input className='pokemon__search-input' type='text' ref={searchTermRef} placeholder='Enter Pokémon name...' />
				<button className='pokemon__search-button' onClick={handleSearch}>
					Search
				</button>
				{selectedPokemon && (
					<div>
						<h1>{selectedPokemon.name}</h1>
						{/* Display other Pokémon details as needed */}
					</div>
				)}
			</div>
		</div>
	)
}

export default PokemonDetail
