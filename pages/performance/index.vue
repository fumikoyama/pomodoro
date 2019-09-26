<template>
  <b-tabs position="is-centered" type="is-toggle">
    <b-tab-item>
      <template slot="header">
        <b-icon icon="view-list" size="is-small" />
      </template>
      <performance-list />
    </b-tab-item>
    <b-tab-item>
      <template slot="header">
        <b-icon icon="chart-timeline-variant" size="is-small" />
      </template>
      <performance-chart />
    </b-tab-item>
  </b-tabs>
</template>

<script>
import PerformanceList from '~/components/performance/PerformanceList'
import PerformanceChart from '~/components/performance/PerformanceChart'
export default {
  layout: 'main',
  components: {
    PerformanceList,
    PerformanceChart
  }
}
</script>
