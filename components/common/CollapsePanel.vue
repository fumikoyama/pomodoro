<template>
  <b-collapse :aria-id="ariaId" class="panel" :open.sync="open">
    <div
      slot="trigger"
      class="panel-heading"
      role="button"
      :aria-controls="ariaId"
    >
      <b-icon :icon="icon"></b-icon>
      <strong>{{ title }}</strong>
      <b-icon
        :icon="open ? 'menu-down' : 'menu-up'"
        class="is-pulled-right"
      ></b-icon>
    </div>
    <slot></slot>
  </b-collapse>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: '' },
    title: { type: String, default: null },
    isOpen: { type: Boolean, default: true }
  },
  data() {
    return {
      open: this.isOpen
    }
  },
  computed: {
    ariaId() {
      return `collapse-${~~(Math.random() * 5000)}`
    }
  }
}
</script>
