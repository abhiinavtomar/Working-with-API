var express     = require('express'),
    app         = express(),
    request     = require('request');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    request('http://demo4469839.mockable.io/influencers', (error, response, body) => {
        if(!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            res.render('index', { data: data, paginationIndex: 1 });
        } else {
            res.render('error');
        }
    });
});

app.get('/:id', function(req, res){
    const index = req.params.id;

    request('http://demo4469839.mockable.io/influencers', (error, response, body) => {
        if(!error && response.statusCode == 200 && index <=15 && index >=0) {
            const data = JSON.parse(body);
            res.render('index', { data: data, paginationIndex: index });
        } else {
            res.render('error');
        }
    });
});

app.listen(8080, (req, res) => {
    console.log("Server started ...");
});