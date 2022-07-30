import React, { useState, useEffect } from 'react';
import Pokemon from '../Pokemon';
import './style.css';
import pokedexImage from '../../images/pokedex.png';

async function getPokemon(pokemon) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if(response.status === 200){
    let data = await response.json();
    return data;
  }
}

let searchPokemon = 1;
let img = true;

function Pokedex() {
  const [nameOrID, setNameOrID] = useState('1');
  const [pokemon, setPokemon] = useState('');

  useEffect(() => {
    renderPokemon();
  }, [])

  function renderPokemon() {
    getPokemon(searchPokemon).then(data => {
      setNameOrID('');
      if(data) {
        img = true;
        searchPokemon = data.id;
        setPokemon({
          name: data.name,
          number: `${data.id} - `,
          image: data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'],
        });
      } else {
        img = false;
        setPokemon({
          name: 'Not found :C',
          number: '',
          image: '#',
        });
      }
    })
  }

  const handlePokemon = event => {
    event.preventDefault();
    searchPokemon = nameOrID;
    renderPokemon();
  }

  function buttonPrev(){
    if(searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon();
    }
  }

  function buttonNext(){
    searchPokemon += 1;
    renderPokemon();
  }

  return (
    <div className='container'>
      <div className="main">
        <form className="form" onSubmit={handlePokemon}>
          <input 
            type="search" 
            className="input-search" 
            placeholder="Name or Number"
            onChange={e => setNameOrID(e.target.value.toLowerCase())}
            value={nameOrID}
            required
          />
        </form>
        <div className="buttons">
          <button className="button btn-prev" onClick={buttonPrev}>Prev &lt;</button>
          <button className="button btn-next" onClick={buttonNext}>Next &gt;</button>
        </div>
        <Pokemon 
          name={pokemon.name} 
          image={pokemon.image} 
          number={pokemon.number}
          img={img}
        />

        <img className="pokedex" src={pokedexImage} alt="pokedex" />
      </div>
    </div>
  );
}

export default Pokedex;
