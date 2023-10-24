import React, { Fragment } from 'react'
import './PokedexHeader.css'
import myImage from '../../assets/pokedex_logo.png'
import { Link } from 'react-router-dom'

const PokedexHeader = () => {
	return (
		<Fragment>
			<div className='pokedex-header'>
				<div className='pokedex-header__tittle'>
					<Link to='/'>
						<img src={myImage} alt='Pokedex' />
					</Link>
				</div>
				<div className='pokedex-header__link'>
					<Link to='/pokemondetail'>
						<h1 className='pokedex-header__link-h1'>Search Pokémon by name</h1>
					</Link>
				</div>
			</div>
		</Fragment>
	)
}

export default PokedexHeader
