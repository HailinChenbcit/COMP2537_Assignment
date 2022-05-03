const express = require('express')
const app = express()
app.set('view engine', 'ejs')


app.listen(8000, function (err) {
    if (err) console.log(err);
})

// app.get('/', function (req, res) {
//     res.send("GET request to homepage")
// })

app.get('/profile/:id', function (req, res) {
    // req.params.id;
    // res.write(`${req.params.id}`);

    // res.write(`${req.params.id}`);
    // res.send()

    res.render('profile.ejs', {
        "id": req.params.id
    })
})


app.use(express.static('./public'));
