import React, { useState, useEffect, Fragment } from 'react'
import './Pokedex.css'
import axios from 'axios'
import myImage from '../../assets/pokedex_logo.png'
import { Ring } from '@uiball/loaders'

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon?limit=8&offset=0'

function Pokedex() {
	const [pokemons, setPokemons] = useState([])
	const [currentPage, setCurrentPage] = useState(0)

	useEffect(() => {
		axios
			.get(POKEMON_API + currentPage * 8)
			.then((response) => {
				const promises = response.data.results.map((pokemon) => axios.get(pokemon.url))
				return Promise.all(promises)
			})
			.then((responses) => {
				const pokemonDetails = responses.map((response) => response.data)
				setPokemons(pokemonDetails)
			})
			.catch((error) => console.log(error))
	}, [currentPage])

	return (
		<div className='wrapper'>
			<div className='pokedex-tittle'>
				<img src={myImage} alt='Pokedex' />
			</div>
			<div className='pokedex-container'>
				{pokemons.map((pokemon) => (
					<div key={pokemon.name} className='pokemon-card'>
						<div className='pokemon-name'>{pokemon.name}</div>
						<div className='pokemon-img'>
							<img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
						</div>
						<div>
							<div className='pokemon-type'>Type: {pokemon.types[0].type.name}</div>
						</div>
						<div>
							<div className='pokemon-height'>
								Height: {pokemon.height} <span>m</span>
							</div>
						</div>
						<div>
							<div className='pokemon-weight'>
								Weight: {pokemon.weight} <span>kg</span>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className='pagination'>
				<button className='pagination-button' onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}>
					Previous
				</button>
				<button className='pagination-button' onClick={() => setCurrentPage((prev) => prev + 1)}>
					Next
				</button>
			</div>
		</div>
	)
}

export default Pokedex
