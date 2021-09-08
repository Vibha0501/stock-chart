<template>
  <div>
    <nav class="navbar navbar-light bg-success">
      <span class="navbar-brand mb-0 "><b>Stock Chart</b></span>
    </nav>
    <div class="main">
      <div class="row">
        <div class="col-md-4 m-5 mb-2 form">
          <div class="mb-3 ">
            <label for="symbol" class="form-label">Enter Symbol</label>
            <input
              type="text"
              v-model="symbol"
              class="form-control"
              id="symbol"
              placeholder="Eg. AAPL"
            />
          </div>
          <div class="mb-3">
            <label for="start-date" class="form-label">Enter start date</label>
            <input
              type="date"
              v-model="start"
              class="form-control"
              id="start-date"
              placeholder="YYYY-MM-DD"
            />
          </div>
          <div class="mb-3">
            <label for="end-date" class="form-label">Enter end date</label>
            <input
              type="date"
              v-model="end"
              class="form-control"
              id="end-date"
              placeholder="YYYY-MM-DD"
            />
          </div>
          <center>
            <button class="btn btn-success" type="submit" @click="submit()">
              Apply
            </button>
          </center>
        </div>
        <div class="col-md-8 p-5 pt-0">
          <br /><br />
          <h2><b>Description</b></h2>
          <br />
          <h5>
            <b>{{ companyName }}</b>
          </h5>
          <p>{{ description }}</p>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-3 col-sm-12">
          <h2 class="p-5 pt-3"><b>Chart</b></h2>
        </div>
        <div class="col-md-4 col-sm-12 mt-3">
          <label for="chart-type" class="form-label float-start">Chart Type</label>
          <select
            class="form-select custom-select "
            v-model="chartType"
            aria-label=".form-select-sm "
            
          >
            <option selected>candlestick</option>
            
            <option>ohlc</option>
            <option >bar</option>
            
          </select>
        </div>
      </div>

      <div id="chart" class="chart">
        <div v-bind:id="chartType"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Plotly from "plotly.js-dist";

export default {
  name: "Home",
  data() {
    return {
      symbol: "",
      start: "",
      end: "",
      result: "",
      open: [],
      close: [],
      high: [],
      low: [],
      datex: [],
      xi: "",
      trace: {},
      companyName: "",
      description: "",
      chartType: "",
    };
  },
  components: {},
  methods: {
    submit() {
      axios
        .get(
          `https://api.polygon.io/v1/meta/symbols/${this.symbol}/company?&apiKey=FD9zdyzLpfXvGQIGae7HcX3rr5FNLNC9`
        )
        .then((resp) => {
          (this.companyName = resp.data.name),
            (this.description = resp.data.description);
        });
      const endres = {
        symbol: this.symbol,
        start: this.start,
        end: this.end,
      };
      axios.post(`https://stocks-fariz.herokuapp.com/`, endres).then((res) => {
        (this.open = []),
          (this.close = []),
          (this.high = []),
          (this.low = []),
          (this.datex = []),
          (this.xi = ""),
          (this.result = res.data);
        for (this.xi of this.result) {
          this.open.push(this.xi.open);
          this.close.push(this.xi.close);
          this.high.push(this.xi.high);
          this.low.push(this.xi.low);
          this.datex.push(this.xi.date);
        }
      });
      var trace1 = {
        x: this.datex,
        close: this.close,
        decreasing: { line: { color: "red" } },
        high: this.high,
        increasing: { line: { color: "green" } },
        line: { color: "rgba(31,119,180,1)" },

        low: this.low,

        open: this.open,

        type: this.chartType,
        xaxis: "x",
        yaxis: "y",
      };

      var data = [trace1];

      var layout = {
        dragmode: "zoom",
        margin: {
          r: 0,
          t: 0,
          b: 0,
          l: 20,
        },
        showlegend: false,
        xaxis: {
          autorange: true,
          domain: [0, 1],
          range: [this.start, this.end],
          rangeselector: {
        x: 0,
        y: 1.2,
        xanchor: 'left',
        font: {size:8},
        buttons: [{
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1 month'
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6 months'
        }, {
            step: 'all',
            label: 'All dates'
        }]
      },
          rangeslider: {visible:false},
          title: "Date",
          type: "date",
        },
        yaxis: {
          autorange: true,
          domain: [0, 1],
          range: [Math.min(...this.close) - 10, Math.max(...this.close) + 20],
          type: "linear",
        },
      };

      Plotly.newPlot(this.chartType, data, layout);
    },
  },

  chartOptions: {
    chart: {
      type: "candlestick",
      height: 350,
      width: 500,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  },
};
</script>
<style scoped>
.form {
  height: 300px;
  width: 250px;
}
.chart {
  margin-left: 7%;
  margin-right: 0;
}
.navbar-brand {
  padding-left: 1%;
}
.form-label {
  text-align: left;
  font-weight: bold;
}
.main {
  margin: 1%;
}
</style>
