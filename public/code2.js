poke_id = null
poke_name = null
poke_type = null

async function process(data) {
    pokemons = []
    pokemon_ids = []
    for (i = 0; i < data["pokemon"].length; i++) {
        pokemons.push(data["pokemon"][i]["pokemon"]["name"])
        id = data["pokemon"][i]["pokemon"]["url"]
        pokemon_ids.push(id.substr(34).slice(0, -1))
    }

    result = ""

    for (j = 0; j < pokemons.length; j++) {
        poke_name = pokemons[j]
        poke_id = pokemon_ids[j]
        one_column = parseInt(pokemons.length / 3)
        console.log(poke_id.length, one_column)

        await $.ajax(
            {
                "url": `https://pokeapi.co/api/v2/pokemon/${poke_id}`,
                "type": 'GET',
                "success": function process() {
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

    $("main").html(result)
}


function display() {
    var selected_option = $("#poke_type option:selected").val()
    $.ajax(
        {
            "url": `https://pokeapi.co/api/v2/type/${selected_option}`,
            "type": 'GET',
            "success": process
        }
    )
}

$(document).ready(function () {
    display()
    $("#poke_type").change(() => {
        display()
    })
})
