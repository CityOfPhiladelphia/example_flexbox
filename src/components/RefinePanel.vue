<template>
  <div
    id="refine-panel-component"
    class="refine-panel"
  >
    <div
      class="refine-title"
      @click="expandRefine"
    >
      REFINE
    </div>
    <div>
      here are the refine boxes
    </div>

  </div>
</template>

<script>

export default {
  name: 'RefinePanel',
  computed: {
    refineOpen() {
      return this.$store.state.refineOpen;
    },
  },
  methods: {
    expandRefine() {
      this.$store.commit('setRefineOpen', !this.refineOpen);
    },
  },
};

</script>

<style lang="scss">

.refine-panel {
  padding: 1rem;
}

.refine-title{
  color: $ben-franklin-blue-dark;
  position: relative;

  .clear-all{
    font-family: "Montserrat", sans-serif;
    font-weight: normal;
    margin: .35rem 0 0 .75rem;
    font-size: .8rem;
  }

  .clear-button{
    background-color: rgb(0, 204, 255);
    height: 30px;
    width: 80px;
    margin-left: 10px;
    margin-right: 10px;
  }
}

</style>
