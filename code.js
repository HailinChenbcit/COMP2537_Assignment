poke_id = null
poke_name = null
pokemons = []

function call_ajax() {
    $.ajax(
        {
            "url": `https://pokeapi.co/api/v2/pokemon?limit=1126`,
            "type": 'GET',
            "success": function process() {
                result = ''
                for (i = 0; i < 4; i++) {
                    result += "<div class='images_group'>"
                    for (j = 0; j < 5; j++) {
                        poke_id = Math.floor((Math.random() * 152) + 1);
                        result += `<div class="image_container"> <a href='https://pokeapi.co/api/v2/pokemon/${poke_id}' id= ${poke_id}>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke_id}.png">
                        </img>
                        </a>
                        </div>`
                    }
                    result += "</div>"
                }
                $("main").html(result)
            }
        }
    )
}


$(document).ready(function () {
    call_ajax()
    $(".image_container").click(function () {

    })
})
