poke_id = null
poke_name = null
pokemons = []

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
                        poke_name = data.name
                        result += `<div class="image_container"> <a href='profile/${poke_id}' id= ${poke_id}>
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
    $(".image_container").click(function () {
        
    })
})
