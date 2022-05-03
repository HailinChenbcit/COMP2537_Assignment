poke_id = null
poke_name = null

function call_ajax() {
    poke_name = $("#poke_name").val()
    var selected_option = $("#searching option:selected")

    if (selected_option.val() == "name") {
        nameIsSelected = "selected"
    }
    if (selected_option.val() == "type") {
        typeIsSelected = "selected"
    }
    $.ajax(
        {
            "url": `https://pokeapi.co/api/v2/pokemon/${poke_name}`,
            // "url": `https://pokeapi.co/api/v2/pokemon/${poke_name}/${nameIsSelected}/${typeIsSelected}`,
            "type": 'GET',
            "success": function process(data) {
                console.log(data)
                poke_id = data['id']
                poke_name = data['name']
                poke_type = data["types"][0]["type"]["name"]
                console.log(poke_type)

                result = "<div class='image_container'>"
                result += "ID: " + poke_id + "<br>"

                result += "Name: " + poke_name + "<br>"

                result += "Ability: " + data['abilities'][0]['ability']['name'] + "<br>"

                result += "Type: " + poke_type + "<br>"

                result += `<a href=${'#'}>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke_id}.png">
                </img>
                </a>`

                result += "</div>"

                $("#result").html(result)
            }
        }
    )
}


$(document).ready(function () {
    $("#search").click(call_ajax)
})

