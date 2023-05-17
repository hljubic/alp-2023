const express = require('express')
const mysql = require('mysql')

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "csdigital"
})

const app = express();
app.use(express.urlencoded())

// Napraviti tablicu "gradovi" sa imenom grada i poštanskim brojem.
// Napraviti CRUD operacije za tablicu gradovi.


con.connect(function (err) {
    if (err) throw err;
    console.log('Spojen na bazu.')

    con.query('USE node2')

    app.get('/korisnici/dohvati', (req, res) => {
        con.query("SELECT * FROM korisnici", function (err, result, fields) {
            if (err) throw err;

            res.json(result)
        });
    })

    app.post('/korisnici/izmjeni', (req, res) => {
        let id = req.body.id
        let ime = req.body.ime
        let godine = req.body.godine
        
        con.query("UPDATE korisnici SET ime='" + ime + "', godine=" + godine + " WHERE id=" + id)

        res.send(ime + ' - ' + godine);
    })

    app.post('/korisnici/dodaj', (req, res) => {
        let ime = req.body.ime
        let godine = req.body.godine

        con.query("INSERT INTO korisnici(ime, godine) VALUES ('" + ime + "', " + godine + ")")

        res.send(ime + ' - ' + godine);
    })

    app.get('/korisnici/izbrisi/:id', (req, res) => {
        let id = req.params.id

        con.query("DELETE FROM korisnici WHERE id=" + id)

        res.send('Uspješno izbrisano.');
    })


    app.get('/gradovi/dohvati', (req, res) => {
        con.query("SELECT * FROM gradovi WHERE pb < 12000", function (err, result, fields) {
            if (err) throw err;

            res.json(result)
        });
    })

    app.get('/gradovi/izmjeni/:id/:naziv/:pb', (req, res) => {
        let id = req.params.id
        let naziv = req.params.naziv
        let pb = req.params.pb

        con.query("UPDATE gradovi SET naziv='" + naziv + "', pb=" + pb + " WHERE id=" + id)

        res.send(naziv);
    })


    app.get('/gradovi/dodaj/:naziv/:pb', (req, res) => {
        let naziv = req.params.naziv
        let pb = req.params.pb

        con.query("INSERT INTO gradovi(naziv, pb) VALUES ('" + naziv + "', " + pb + ")")

        res.send(naziv);
    })

    app.get('/gradovi/izbrisi/:id', (req, res) => {
        let id = req.params.id

        con.query("DELETE FROM gradovi WHERE id=" + id)

        res.send('Uspješno izbrisano.');
    })
})

app.listen(3000, () => {
    console.log('Pokrenut express na portu 3000.')
})