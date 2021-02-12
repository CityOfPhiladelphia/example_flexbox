<template>
  <div id="app">
    <app-header
      :app-title="'test'"
      :is-sticky="true"
    />

    <main
      class="no-padding main-container"
    >
      <div
        v-if="i18nEnabled"
        class="i18n-panel-holder"
      >
        i18n PANEL HOLDER
      </div>

      <div
        v-if="refineEnabled"
        class="refine-panel-holder"
      >
        <refine-panel />
      </div>

      <div
        class="locations-and-map-panels-holder columns"
      >
        <div
          v-show="locationsPanelVisible"
          class="locations-panel-holder column"
        >
          LOCATIONS PANEL HOLDER
        </div>

        <div
          v-show="mapPanelVisible"
          class="map-panel-holder column"
        >
          MAP PANEL HOLDER
        </div>

      </div>

      <div
        v-show="toggleButtonVisible"
        class="toggle-button"
        @click="toggleMap"
      >
        TOGGLE
      </div>
    </main>

    <app-footer
      :is-sticky="true"
      :is-hidden-mobile="true"
    >
      <ul>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/terms-and-conditions">Terms & Conditions</a>
        </li>
      </ul>
    </app-footer>

  </div>
</template>

<script>

import Vue from 'vue';
import RefinePanel from './components/RefinePanel.vue';

import {
  AppHeader,
  AppFooter,
  // MobileNav,
  // InputForm,
  // Textbox,
} from '@phila/phila-ui';

export default {
  name: 'App',
  components: {
    RefinePanel,
    AppHeader,
    AppFooter,
    // MobileNav,
    // InputForm,
    // Textbox,
  },
  data() {
    return {
      dropdownOptions: {
        address: {
          text: 'Address',
          data: null,
        },
        keyword: {
          text: 'Keyword',
          data: null,
        },
      },
      i18nEnabled: true,
      refineEnabled: true,
      isMapVisible: false,
      buttonText: 'Toggle to map',
      gridRowTransform: {
        'mobileNoRefine': 'auto 40px',
        'mobileRefineOpen': 'auto',
        'mobileRefineClosed': '40px auto 40px',
        'nonMobileNoRefine': 'auto',
        'nonMobileRefine': '100px auto',
      },
    };
  },
  computed: {
    layoutDescription() {
      let value;
      if (this.isMobile && !this.refineEnabled) {
        value = 'mobileNoRefine';
      } else if (this.isMobile && this.refineEnabled && this.refineOpen) {
        value = 'mobileRefineOpen';
      } else if (this.isMobile && this.refineEnabled && !this.refineOpen) {
        value = 'mobileRefineClosed';
      } else if (!this.refineEnabled) {
        value = 'nonMobileNoRefine';
      } else {
        value = 'nonMobileRefine';
      }
      return value;
    },
    gridRows() {
      return this.gridRowTransform[this.layoutDescription];
    },
    locationsPanelVisible() {
      return !this.isMobile || this.layoutDescription !== 'mobileRefineOpen' && !this.isMapVisible;
    },
    mapPanelVisible() {
      return !this.isMobile || this.layoutDescription !== 'mobileRefineOpen' && this.isMapVisible;
    },
    toggleButtonVisible() {
      return this.isMobile && this.layoutDescription !== 'mobileRefineOpen';
    },
    refineOpen() {
      return this.$store.state.refineOpen;
    },
  },
  watch: {
    isMobile(nextIsMobile) {
      if (nextIsMobile) {
        console.log('is mobile');
        this.handleResize();
      }
    },
    isTablet(nextIsTablet) {
      if (nextIsTablet) {
        console.log('is tablet');
        this.handleResize();
      }
    },
    isDesktop(nextIsDesktop) {
      if (nextIsDesktop) {
        console.log('is desktop');
        this.handleResize();
      }
    },
    isWideScreen(nextIsWidescreen) {
      if (nextIsWidescreen) {
        console.log('is widescreen');
        this.handleResize();
      }
    },
  },
  mounted() {
    // this.handleResize();
    if (!this.i18nEnabled) {
      this.$data.buttonText = this.$data.isMapVisible ? 'Toggle to resource list' : 'Toggle to map';
    } else {
      this.$data.buttonText = this.$data.isMapVisible ? 'app.viewList' : 'app.viewMap';
    }
  },
  methods: {
    handleResize () {
      console.log('handleResize is starting');
      //wait for dom to finish updating
      let isMobile = this.isMobile;
      Vue.nextTick(function () {
        let header = document.querySelector('#app-header');
        let footer = document.querySelector('#app-footer');
        let main = document.querySelector('main');
        let headerOffsetHeight = header.offsetHeight || 0;
        let footerOffsetHeight = 0;
        if (footer !== null) {
          footerOffsetHeight = footer.offsetHeight;
        }
        let offsetHeight;
        if (isMobile) {
          let offsetHeight = headerOffsetHeight;
          console.log('handleResize isMobile, offsetHeight:', offsetHeight, 'headerOffsetHeight:', headerOffsetHeight, 'footerOffsetHeight:', footerOffsetHeight);
          // main.style['min-height'] = `calc(100vh - ${headerOffsetHeight}px)`;
          main.style['height'] = `calc(100vh - ${headerOffsetHeight}px)`;
        } else {
          let offsetHeight = headerOffsetHeight + footerOffsetHeight;
          console.log('handleResize is NOT mobile, offsetHeight:', offsetHeight, 'headerOffsetHeight:', headerOffsetHeight, 'footerOffsetHeight:', footerOffsetHeight);
          // main.style['min-height'] = `calc(100vh - ${offsetHeight}px)`;
          main.style['height'] = `calc(100vh - ${offsetHeight}px)`;
        }
      });
    },
    toggleMap() {
      this.$data.isMapVisible = !this.$data.isMapVisible;
      // console.log('toggleMap is running, this.$data.isMapVisible:', this.$data.isMapVisible);
      if (this.$data.isMapVisible === true) {
        // console.log('toggleMap is running, this.$data.isMapVisible === true');
        // console.log('setTimeout function is running');
        if (this.mapType === 'leaflet') {
          this.$store.state.map.map.invalidateSize();
        } else if (this.mapType === 'mapbox') {
          let themap = this.$store.map;
          setTimeout(function() {
            // console.log('mapbox running map resize now');
            themap.resize();
            // console.log('mapbox ran map resize');
          }, 250);
        }
      }
    },
  },
};

</script>

<style lang="scss">

@import "./assets/scss/main.scss";

// html, body {
//   box-sizing: border-box;
//   height: 100%;
// }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #000000;
}

.container {
  grid-gap: 1px;
}

.no-padding {
  padding: 0px !important;
}

.main-container {
  display: flex;
  display: -ms-flexbox;
  flex-direction: column;
  // height: 300px;
  background-color: red;
}

.locations-and-map-panels-holder {
  flex-grow: 1;
  // flex: 1 0 0;
  // -ms-flex: 1 0 0;
  // flex: 1;
  display: flex;
  display: -ms-flexbox;
  flex-direction: row;
  margin: 0px !important;
  background-color: yellow;
}

@media screen and (max-width: 767px) {
  .locations-panel-holder {
  }

  .map-panel-holder {
  }
}

// .main-container > div {
//   // flex: 1;
//   // display: flex;
//   // justify-content: center;
//   // align-items: center;
//   // font-size: 2em;
// }

.i18n-panel-holder {
  background-color: white;
}

.refine-panel-holder {
  background-color: #f0f0f0;
}

.locations-panel-holder {
  background-color: #88d8b0;
}

.map-panel-holder {
  background-color: #ff6f69;
  // height: 100%;
}

.toggle-button {
  background-color: #d2d2d2;
}

::-webkit-scrollbar {
  display: none;
}

</style>
