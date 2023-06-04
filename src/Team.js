// Team.js

import Pokemon from "./Pokemon";
import Form from "./Form";
import { useState } from "react";

const Team = () => {

    // pokemonTeam state to hold the users current pokemon team
    const [pokemonTeam, setPokemonTeam] = useState([]);

    // pokemon array to hold the pokemon objects before they get saved in state
    const pokemon = []

    // random function that generates a number between 1 and 1015
    function random() {
        let number = Math.floor((Math.random() * 1015) + 1);
        return number;
    };

    // function that calls API 6 times
    function getPokemon() {
        for (let i = 0; i < 6; i++) {

            const url = new URL(`https://pokeapi.co/api/v2/pokemon/${random()}`);

            fetch(url)
                .then(results => {
                    return results.json();
                }).then(pokeData => {
                    // pushing pokemon object from API to the pokemon array
                    pokemon.push(pokeData);
                })
        }
    };

    // click function for the button below
    function click() {
        // calling get pokemon
        getPokemon()
        // delay before setting state to make sure that API call finishes
        setTimeout(() => {
            // setting pokeTeam state to the contents of the pokemon array
            setPokemonTeam(pokemon)
        }, 200)
    }

    return (
        <section className="flexContainer">
            <button onClick={click}>Generate</button>
            {/* <Form handleSubmit={generateNums}/> */}
            <ul className="team flexContainer">
                {
                    // mapping through pokemonTeam array
                    pokemonTeam.map((pokemonObj) => {
                        return (
                            // returning pokemon module with the data from the pokemon object
                            <Pokemon
                            // data passed with props
                                key={pokemonObj.id}
                                name={pokemonObj.name}
                                type={pokemonObj.types[0].type.name}
                                imageSource={pokemonObj.sprites.front_default} />
                        );
                    })
                }
            </ul>
        </section>
    )
}

export default Team;