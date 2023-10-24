import React, { useState, useEffect, Fragment } from 'react'
import './Pokedex.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import PokedexHeader from '../PokedexHeader/PokedexHeader'

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon?limit=6&offset=0'

function Pokedex() {
	const [pokemons, setPokemons] = useState([])
	const [currentPage, setCurrentPage] = useState(0)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		axios
			.get(POKEMON_API + currentPage * 6)
			.then((response) => {
				setLoading(false)
				const promises = response.data.results.map((pokemon) => axios.get(pokemon.url))
				return Promise.all(promises)
			})
			.then((responses) => {
				const pokemonDetails = responses.map((response) => response.data)
				setPokemons(pokemonDetails)
			})
			.catch((error) => {
				console.log(error)
				setLoading(false)
			})
	}, [currentPage])

	return (
		<div className='pokedex'>
			<PokedexHeader />
			<div className='pokedex-container'>
				{pokemons.map((pokemon) => (
					<div key={pokemon.name} className='pokemon-card'>
						{loading ? (
							<Loader />
						) : (
							<>
								<div className='pokemon-card__name'>{pokemon.name}</div>
								<div className='pokemon-card__img'>
									<img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
								</div>
								<div>
									<div className='pokemon-card__type'>Type: {pokemon.types[0].type.name}</div>
								</div>
								<div>
									<div className='pokemon-card__height'>
										Height: {pokemon.height} <span>m</span>
									</div>
								</div>
								<div>
									<div className='pokemon-card__weight'>
										Weight: {pokemon.weight} <span>kg</span>
									</div>
								</div>
							</>
						)}
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
