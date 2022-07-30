import React from 'react';
import './style.css'

function Pokemon(props) {

  return(
    <div>
      <img src={props.image} alt="pokemon" className={props.img ? 'pokemon-image' : 'hidden-image'} />
        <h1 className="pokemon-data">
          <span className="pokemon-number">{props.number}</span>
          <span className="pokemon-name"> {props.name}</span>
        </h1>
    </div>
  );
}

export default Pokemon;