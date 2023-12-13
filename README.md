<<<<<<< HEAD
# stock-chart

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
=======
# Stock Chart Frontend
In frontend we have to send symbol,start date and end date in string format. Also we have to specify the type of chart.

Then the frontend stores the data sent from backend and makes a chart.

For displaying the charts I have used Plotly.js(a free api available on internet).

I have also shown the company name and description by sending symbol to polygon.io api(an api I found on internet to provide company information by using ticker symbol).

We can change the type of charts, symbol, start end and end date.
# Stock Chart Backend
Backend is hosted on Heroku app

https://stocks-fariz.herokuapp.com/

We have to do a POST request with sending symbol,start date and end date as string from frontend.
Then the backend API sends the relevant data in JSON format.


>>>>>>> cabef6739efc2a891d243b7601760c63edec01a4
