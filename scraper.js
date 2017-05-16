var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var queue = [], ong = 0, count = 0, ms = 500;
queue.push('https://medium.com');
var inte = setInterval(function () {
    if (count == 100) {
        console.log("Cap reached, processing the remaining items in the queue");
        clearInterval(inte);
    }
    if (queue.length == 0 && ong == 0) {
        console.log('Job Done');
        clearInterval(inte);
    }
    else if (queue.length == 0 && ong != 0) {
        ;
    }
    else {
        if (ong < 5) {
            ong++;
            var link = queue.shift();
            count++;
            console.log("REQUEST MADE ", link);
            request(link, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    console.log("REQUEST DONE");
                    var $ = cheerio.load(html);
                    $('a').each(function (i, element) {
                        if (element.attribs.href) {
                            if(element.attribs.href[0]=='/'){
                                var str= 'https://medium.com';
                                str+=element.attribs.href;
                                element.attribs.href=str;
                            }
                            var sometext = element.attribs.href + '\n';
                            fs.appendFile('out.csv', sometext, 'utf8', function (err) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log('It\'s saved!', ong, "connections ongoing");
                                }
                            });
                            queue.push(element.attribs.href);
                        }
                    });
                    ong--;
                }
                else {
                    console.log(error);
                    if (queue.length == 0) {
                        clearInterval(inte);
                    }
                }
            });
        }
    }
}, ms);

