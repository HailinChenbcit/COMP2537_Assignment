poke_id = null
poke_name = null
pokemons = []

const colors = {
    fire: ['#FDDFDF', '#fccccc'],
    grass: ['#aeeab2', '#ccfcd0'],
    electric: ['#FCF7DE', '#faefb9'],
    water: ['#DEF3FD', '#bbe6fa'],
    ground: ['#f4e7da', '#fad8b6'],
    rock: ['#d5d5d4', '#a6a6a2'],
    fairy: ['#fceaff', '#edbff5'],
    poison: ['#77f37f', '#3bd15a'],
    bug: ['#f8d5a3', '#fcba5b'],
    dragon: ['#97b3e6', '#6384c2'],
    psychic: ['#eceda1', '#f0f283'],
    flying: ['#F5F5F5', '#f5e9e9'],
    fighting: ['#ff8c8c', '#bfb6a4'],
    normal: ['#f5ffcb', '#fafae3'],
    ice: ["#37f0e8", '#1ae8df'],
    dark: ["#370000", '#5c0101'],
    steel: ["#226945", '#0ad670'],
    shadow: ["#e6edee", '#93a1a3'],
}

async function display_all_picture() {
    result = ''
    for (i = 0; i < 3; i++) {
        result += "<div class='images_group'>"
        for (j = 0; j < 3; j++) {
            poke_id = Math.floor((Math.random() * 900) + 1);
            await $.ajax(
                {
                    "url": `https://pokeapi.co/api/v2/pokemon/${poke_id}`,
                    "type": 'GET',
                    "success": function process(data) {
                        allowed = data.types[0].type.name
                        obj_colors = Object.keys(colors).filter(key => allowed.includes(key))
                        color_code = colors[obj_colors]
                        poke_name = data.name
                        result += `<div class="image_container" style="background:linear-gradient(45deg, ${color_code[0]}, ${color_code[1]});"> <a href='profile/${poke_id}' id= ${poke_id}>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke_id}.png">
                        </img>
                        </a>
                        <div class='card_header'>
                        <div class='poke__number'>
                        #${poke_id}
                        </div>
                        </div>
                        <div>${poke_name}</div>
                        </div>`
                    }
                }
            )
        }

        result += "</div>"
    }
    $("main").html(result)
}


$(document).ready(function () {
    display_all_picture()
})
