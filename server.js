const express = require('express')
const app = express()
app.set('view engine', 'ejs')


app.listen(process.env.port || 8000, function (err) {
    if (err) console.log(err);
})

const https = require('https')
app.get('/profile/:id', function (req, res) {
    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    data = ''
    https.get(url, function (https_res) {
        https_res.on("data", function (chunk) {
            data += chunk
        })
        https_res.on("end", function () {
            // console.log(JSON.parse(data))
            data = JSON.parse(data)
            obj_hp = data.stats.filter((obj)=>{
                return obj.stat.name == 'hp'
            }).map((obj)=>{
                return obj.base_stat
            })
            
            obj_atk = data.stats.filter((obj)=>{
                return obj.stat.name == 'attack'
            }).map((obj)=>{
                return obj.base_stat
            })

            obj_defense = data.stats.filter((obj)=>{
                return obj.stat.name == 'defense'
            }).map((obj)=>{
                return obj.base_stat
            })

            obj_abilities = []
            for (i =0; i<data.abilities.length;i++) {
                obj_abilities.push(data.abilities[i].ability.name)
            }

            obj_types = []
            for (i =0; i<data.types.length;i++) {
                obj_types.push(data.types[i].type.name)
            }

            console.log(obj_types)

            res.render('profile.ejs', {
                "id": req.params.id,
                'name': data.name,
                "hp": obj_hp[0],
                "weight": data.weight,
                "height": data.height,
                "attack": obj_atk[0],
                "defense": obj_defense[0],
                "abilities": obj_abilities,
                "types": obj_types,
            })
        })
    })
})


app.use(express.static('./public'));
