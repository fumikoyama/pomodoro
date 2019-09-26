<template>
  <vue-highcharts ref="lineCharts" :options="options" />
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import dayjs from 'dayjs'
export default {
  computed: {
    ...mapState('chart', ['days']),
    ...mapGetters('chart', ['getData', 'startDate', 'endDate']),
    options() {
      return {
        chart: {
          type: 'spline',
          backgroundColor: 'transparent'
        },
        title: {
          text: '回数'
        },
        xAxis: {
          labels: {
            formatter() {
              if (dayjs.isDayjs(this.value))
                return this.value.format('MM/DD(dd)')
              else return this.value
            },
            style: {
              fontSize: '12px'
            }
          },
          type: 'datetime',
          categories: this.days,
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
  watch: {
    days(p, v) {
      this.$nextTick(this.load)
    }
  },
  methods: {
    load() {
      const lineCharts = this.$refs.lineCharts
      lineCharts.delegateMethod('showLoading', 'Loading...')
      lineCharts.removeSeries()
      this.getData.forEach(lineCharts.addSeries)
      lineCharts.hideLoading()
    }
  }
}
</script>
