# simplescraper
A simple web scraper written using NodeJs with the help of cheerio and request libraries. Scrapes medium.com and stores all the links recursively in out.csv.

# Setting Up
Install cheerio and request packages using npm.

# Running
Run "node scraper.js" on the terminal

# Tweaks
The current number of requests is capped at 100, do play around with the count variable to tweak that.
Also, requests are being made every 500 ms, that can be increased as well by tweaking the ms variable.
