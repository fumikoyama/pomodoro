<template>
  <div class="box">
    <vue-highcharts ref="lineCharts" :options="options" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('chart/total-count-chart', ['getDays', 'getData']),
    options() {
      return {
        chart: {
          type: 'spline',
          backgroundColor: 'transparent'
        },
        title: {
          text: `回数（${this.getDays[0].format('MM/DD')} 〜
            ${this.getDays[this.getDays.length - 1].format('MM/DD')}）`
        },
        xAxis: {
          labels: {
            formatter() {
              return this.value.format('MM/DD(dd)')
            },
            style: {
              fontSize: '12px'
            }
          },
          type: 'datetime',
          categories: this.getDays,
          lineWidth: 2
        },
        yAxis: {
          title: { text: null },
          lineWidth: 2
        },
        responsive: {
          rules: [{ condition: { maxheight: 400 } }]
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          useHTML: true,
          formatter() {
            return this.points.map((point) => {
              return `
                <i style="
                  background-color:${point.color};
                  border-radius:50%;
                  display: inline-block;
                  height:6px;
                  margin-right:4px;
                  width:6px;"
                ></i>${
                  point.series.name
                }: <b>${point.y.toLocaleString()}</b><br>`
            })
          }
        },
        credits: {
          enabled: false
        },
        series: []
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.load()
    })
  },
  methods: {
    load() {
      const lineCharts = this.$refs.lineCharts
      lineCharts.delegateMethod('showLoading', 'Loading...')
      lineCharts.removeSeries()
      this.getData.forEach((x) => lineCharts.addSeries(x))
      lineCharts.hideLoading()
    }
  }
}
</script>
