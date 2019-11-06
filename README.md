# Gekko - Market Visualizer API
Gekko Backend is an API written for [Gekko][1], a market share visualizer. The code is written in [Node.js][2] and the development environment is bootstrapped with [Vagrant][3]. The data is stored in [PostgreSQL][4], retrieved using [pg][5], processed using [async][6], and all requests are served using [express][7].

![Gekko](/screenshots/gekko.png?raw=true)

## Frontend

> [Gekko][1] is a market share visualization app written with [D3][9]'s
> Treemap, [Highstocks][10], & [AngularJS][11]. It allows you to see the
> size of market sectors and how they change through time.
>
> **The subsectors are clickable!** When you click on one, a dialog with each related subsector and their prices will appear. Within this same dialog you can compare non-related sectors to each other.


### Libraries
- [Express][7]
- [pg][5]
- [Async][6]
- [Vagrant][3]


  [1]: http://emils.github.io/gekko/
  [2]: http://nodejs.org/
  [3]: http://vagrantup.com
  [4]: http://www.postgresql.org/
  [5]: https://github.com/brianc/node-postgres
  [6]: https://github.com/caolan/async
  [7]: https://github.com/visionmedia/express
  [9]: https://github.com/mbostock/d3
  [10]: https://github.com/highslide-software/highcharts.com
  [11]: https://github.com/angular/angular.js

### Screenshots

![Chart](/screenshots/chart.png?raw=true)
![Calendar](/screenshots/calendar.png?raw=true)
![Glossary](/screenshots/glossary.png?raw=true)
