var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var q = async.queue(function (link, cb) {
    console.log("REQUEST MADE",link);
    request(link, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            console.log("REQUEST DONE");
            var $ = cheerio.load(html);
            $('a').each(function (i, element) {
                if (element.attribs.href) {
                    if (element.attribs.href[0] == '/') {
                        var str = 'https://medium.com';
                        str += element.attribs.href;
                        element.attribs.href = str;
                    }
                    var sometext = element.attribs.href + '\n';
                    fs.appendFile('out_async.csv', sometext, 'utf8', function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log('It\'s saved!');
                        }
                    });
                    q.push(element.attribs.href);
                }
            });
        }
        else {
            console.log(error);
        }
        cb();
    });
}, 5);

q.push("https://medium.com");
q.drain = function () {
    console.log("Job Done");
}