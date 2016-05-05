require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Semantify.io',
    description: 'From Standards to Ontologies- A Web-based tool to semantify the knowledge standards with semantic technologies',
    head: {
      titleTemplate: 'Semantify.io: %s',
      meta: [
        {name: 'description', content: 'From Standards to Ontologies- A Web-based tool to semantify the knowledge standards with semantic technologies'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Semantify.io'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Semantify.io'},
        {property: 'og:description', content: 'From Standards to Ontologies- A Web-based tool to semantify the knowledge standards with semantic technologies'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@BonnWestCoast'},
        {property: 'og:creator', content: '@BonnWestCoast'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
