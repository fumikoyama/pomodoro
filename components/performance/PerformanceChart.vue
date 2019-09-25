<template>
  <div>
    <client-only placeholder="Loading...">
      <total-count-chart />
    </client-only>
  </div>
</template>

<script>
import TotalCountChart from '~/components/chart/TotalCountChart'
export default {
  components: {
    TotalCountChart
  }
}
</script>
