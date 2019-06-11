/* eslint-disable no-undef */
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express Confid
// eslint-disable-next-line no-undef

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// eslint-disable-next-line no-undef
const helpPath= path.join(__dirname, '../public/help.html');
const aboutPath = path.join(__dirname, '../public/about.html');

// set up static directories 
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));
app.use(express.static(helpPath));
app.use(express.static(aboutPath));

app.get('/title',  function(req,res){
    res.send('<h2> This is the h2 </h2>')
})

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Inkant Awasthi'
    })
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Inkant Awasthi',
        image: 'img/0.jpeg',

    })
});

app.get('/weather', (req,res)=>{

    if(!req.query.address){
        return res.send({
            address: 'Address is needed for the search'
        })
    }
    console.log(req.query);
    // res.send({
    //     address: req.query.address
    // })

    geocode(req.query.address, (error, {location, latitude, longitude}={}) => {
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        });
    });

});

app.get('/products', (req, res)=> {
    if (!req.query.search){
       return res.send({error: 'You must provide a search term'});
    }
    
    res.send({products : []});
});

app.get('/help', (req,res)=>{
    res.render('help', {
        title:'Help',
        name: 'Inkant Awasthi',
        message: 'Find the help contents here'
    })
});

app.get('/help/*',(req,res)=>{
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Inkant'
    });
})

app.get('*', (req,res)=>{
    res.render('404', {
        title:'404',
        errorMessage: 'Page not found',
        name: 'Inkant'
    });
});


app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Server is up and running');
});