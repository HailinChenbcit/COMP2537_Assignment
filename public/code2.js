poke_id = null
poke_name = null
poke_type = null
page_number = null
g_data = null


async function paginate(page_number) {
    let total_pages = Math.ceil(g_data.pokemon.length / 9)
    // display page buttons
    var html = ""
    for (cur_page = 0; cur_page < total_pages; cur_page++) {
        html += `<span><button id="${cur_page + 1}">${cur_page + 1}</button></span>`
        $("#page_numbers").html(html)
    }

    html = ""

    pokemons = []
    pokemon_ids = []
    for (i = 0; i < g_data["pokemon"].length; i++) {
        pokemons.push(g_data["pokemon"][i]["pokemon"]["name"])
        id = g_data["pokemon"][i]["pokemon"]["url"]
        pokemon_ids.push(id.substr(34).slice(0, -1))
    }

    result = ""

    for (i = (page_number - 1) * 9; i < page_number * 9; i++) {
        poke_name = pokemons[i]
        poke_id = pokemon_ids[i]

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


function process_type(data) {
    g_data = data
    paginate(1)
}


async function process_region(data) {
    pokemons = []
    pokemon_ids = []
    for (i = 0; i < data["pokemon_entries"].length; i++) {
        pokemons.push(data["pokemon_entries"][i]["pokemon_species"]["name"])
        id = data["pokemon_entries"][i]["pokemon_species"]["url"]
        pokemon_ids.push(id.substr(42).slice(0, -1))
    }

    result = ""

    for (j = 0; j < pokemons.length; j++) {
        poke_name = pokemons[j]
        poke_id = pokemon_ids[j]
        one_column = parseInt(pokemons.length / 3)

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


function display_by_type() {
    var selected_type = $("#poke_type option:selected").val()
    $.ajax(
        {
            "url": `https://pokeapi.co/api/v2/type/${selected_type}`,
            "type": 'GET',
            "success": process_type
        }
    )
}


function display_by_region() {
    var selected_option = $("#poke_region option:selected").val()
    $.ajax(
        {
            "url": `https://pokeapi.co/api/v2/pokedex/${selected_option}`,
            "type": 'GET',
            "success": process_region
        }
    )
}


$(document).ready(function () {
    display_by_type()

    $("#poke_type").change(() => {
        display_by_type()
    })

    $("#poke_region").change(() => {
        display_by_region()
    })

    $("#search").click(() => {
        poke_name = $("#poke_name").val()
        $.ajax(
            {
                "url": `https://pokeapi.co/api/v2/pokemon/${poke_name}`,
                "type": 'GET',
                "success": function process(data) {
                    poke_name = data.name
                    poke_id = data.id
                    result = ''
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
                    result += "</div>"
                }
            }
        )
        $("main").html(result)
    })

    // display prev/next button and select page number
    $("#page_numbers").on("click", "button", (function () {
        page_number = this.id
        paginate(page_number)
        console.log(page_number)
    }))

    // Prev / Next button
    $("#prev").click(() => {
        if (page_number > 1) {
            page_number--;
            paginate(page_number)
        }
    })

    $("#next").click(() => {
        if (page_number * 9 < g_data.pokemon.length) {
            page_number++;
            paginate(page_number)
        }
    })
})
