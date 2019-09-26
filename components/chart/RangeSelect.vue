<template>
  <div>
    <b-field label="期間を選択してください。">
      <b-datepicker
        v-model="range"
        :mobile-native="false"
        :month-names="monthNames"
        :day-names="dayNames"
        :date-formatter="formatter"
        range
      />
    </b-field>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('calender', ['monthNames', 'dayNames']),
    range: {
      get() {
        return this.$store.state.chart.range
      },
      set(value) {
        this.setRange(value)
      }
    }
  },
  mounted() {
    this.$nextTick(this.initRange)
  },
  methods: {
    ...mapActions('chart', ['initRange', 'setRange']),
    formatter(date) {
      return this.$store.getters['calender/dateFormatter'](date)
    }
  }
}
</script>
