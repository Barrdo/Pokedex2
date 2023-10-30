let pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse === 200){
        const data = await APIResponse.json();
        return data;
    }
    const data = await APIResponse.json();
    return data;
};
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    const data = await fetchPokemon(pokemon);

    if(data){

        console.log(data)
        pokemonImage.style.display = 'block'
        console.log(data.id)
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        console.log(data['sprites']['versions']['generation-v']['black-white']['animated']['front-default'])
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${data.id}.png`
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none'
        pokemonName = 'Not Found:('
        pokemonNumber = ''
    }
    
};

form.addEventListener('submit', (event) => {

    event.preventDefault(); 
    renderPokemon(input.value.toLowerCase())
    

})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon - 1;
        renderPokemon(searchPokemon);
    
    
}})

buttonNext.addEventListener('click', () => {

    searchPokemon += 1;
    renderPokemon(searchPokemon);

})

renderPokemon(searchPokemon)