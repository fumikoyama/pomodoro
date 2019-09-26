<template>
  <div>
    <range-select />
    <client-only placeholder="Loading...">
      <hr />
      <total-count-chart />
      <hr />
    </client-only>
  </div>
</template>

<script>
import RangeSelect from '~/components/chart/RangeSelect'
import TotalCountChart from '~/components/chart/TotalCountChart'
export default {
  components: {
    RangeSelect,
    TotalCountChart
  }
}
</script>
