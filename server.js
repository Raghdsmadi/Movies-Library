'use strict'

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const axios = require("axios").default;
require("dotenv").config();
const PORT = 3000;
const app = express();
app.use(cors());
let APIKEY =process.env.APIKEY ;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let url = "postgres://raghd:12345@localhost:5432/movies";
//app.use(express.json());
const { Client } = require('pg');
const client = new Client(url);
//console.log(APIKEY)

//const P = process.env.P;

//dotenv.config();


//app.listen(PORT, handleListener);
app.use(cors());
app.get('/favorite', handleFavorite);
app.get('/', handleData);
app.get('/trending', trendingHandler)
app.get('/search', searchTrendingHandler)

app.post('/postMovies', postHandler);
app.get('/getData', getHandler);

app.put('/UPDATE/:id',updateHandler);
app.delete('/delete/:id', handleDelete);
app.get("/getMovie/:id", getMovieIdHandler);
app.use('/error', (req, res) => res.send(error()));
app.get('*', handelNotFound);
//app.use(handleError);




/*function handleListener() {

function handleListener() {


function handleFavorite(reg, res) {
    res.send("Welcome to Favorit page");
}

function handleData(req, res) {
    
    let result = [];
    let newMovie = new Movie(movieData.title, movieData.poster_path, movieData.overview);
    result.push(newMovie);
    res.json(result);

}

function handelNotFound(req, res) {

    res.status(404).send("Not found");

}



app.use(function (err, req, res, text) {
    console.log(err.stack);
    res.type('taxt/plain');
    res.status(500);
    res.send("Sorry something wrong");
});


function Movie(id ,title,release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;

}

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status ||500,
            message: error.message || 'Internal Server Error',
        },
    });
}) ;

function trendingHandler(req, res) {
    let result = [];
    
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}`)
        .then(apiResponse => {
            apiResponse.data.results.map(value => {
                let oneTrend = new Movie(value.id, value.title, value.release_date, value.poster_path, value.overview);
                result.push(oneTrend);
            })
            return res.status(200).json(result);
        }).catch(error => {
            res.send("error in getting data from API")
        })
    }
function searchTrendingHandler(req, res) {
    const search = req.query.data
    let results = [];
 console.log(search,APIKEY);
 axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${search}`)
        .then(apiResponse => {
           let data=  apiResponse.data 
          // console.log(data.results);
           data.results.map(value => {
                let oneTrend = new Movie(value.id || "N/A", value.title || "N/A", value.release_date || "N/A", value.poster_path || "N/A", value.overview || "N/A")
                results.push(oneTrend);
            });
            return res.status(200).json(results);
        }).catch(error => {res.send("error in getting data from API")
           // errorHandler(error, req, res);
        })
}

function postHandler(req, res) {
    console.log(req.body);
   
let {name,Geners,Duration,Rating,comments} = req.body; //destructuring


let sql = `INSERT INTO movieStore(name,Geners,Duration,Rating,comments) VALUES($1, $2, $3, $4, $5) RETURNING *;`; 
   let values = [name,Geners,Duration,Rating,comments];
   
    client.query(sql, values).then(result => {
        console.log(result);
        return res.status(201).json(result.rows);

    }).catch(error => {res.send("error in getting data from API")
    })

}

function getHandler(req, res) {
    let sql = `SELECT * FROM movieStore ;`;
    client.query(sql).then((result)=>{
        console.log(result);
        res.json(result.rows);
    }).catch((error) => {
        res.send("error in getting data from API")
    })
 } 

 function updateHandler(req,res){
let id = req.params.id;
//let movies= req.body ;
let {name,Geners,Duration,Rating,comments} = req.body;
let sql = `UPDATE movieStore SET name=$1,Geners=$2,Duration=$3,Rating=$4,comments=$5 WHERE id=${id} RETURNING *`;
let values = [name,Geners,Duration,Rating,comments];
client.query(sql, values).then(result => {
    console.log(result.rows);
    res.json(result.rows);
}).catch()

}



 function handleDelete(req, res) {
    let id = req.params.id;
    let sql = `DELETE FROM movieStore WHERE id=${id} RETURNING *`;
    client.query(sql).then(result => {
        console.log(result.rows[0]);
        res.status(204).json([]);
    }).catch(err => {
        console.log(err);
    })
}

function getMovieIdHandler(req, res)
{

  // console.log(res);
  
    const id = req.params.id;
    //console.log(id);
    const sql = `SELECT * FROM movieStore WHERE id=${id};`

    client.query(sql).then(data => {
        console.log(data.rows);
        res.status(200).json(data.rows);
    })
    .catch(error => {
        console.log(error);
        errorHandler(error, req, res);
    })
}


client.connect().then(() => {
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})



