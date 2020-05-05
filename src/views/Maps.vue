<template>
  <div class="test">
    <Navigation></Navigation>
    <div>
      <h2>TB Cases Map</h2>
    <GmapMap
  :center="{lat: 53.486902, lng:-2.273551}"
  :zoom="6"
  map-type-id="terrain"
  style="width: 100%; height: 800px"
>
<GmapCluster :styles="clusterStyles" :grid-size="gridSize">
   <GmapMarker
    v-for="geoObject in $options.latLONG"
    :key="geoObject.id"
    :position="{lat: parseFloat(geoObject.lat), lng: parseFloat(geoObject.lng)}"
    :icon="markerOptions"
    :clickable="true"
    @click="center=m.position"
  />
  </GmapCluster>
</GmapMap>

<b-container class="bv-example-row">
  <b-row align-h="start">
    <b-col>Cows represent farms with recent TB cases</b-col>
  </b-row>
</b-container>
<p></p>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Nav'
import latLong from '@/assets/MOCK_DATA.json'
const mapMarker = require('@/assets/cow.png')
const mapMarkerHerd = require('@/assets/cow-herd.png')
const mapMarkerHerdSmall = require('@/assets/cow-herd-small.png')
const mapMarkerHerdMedium = require('@/assets/cow-herd-medium.png')
const mapMarkerHerdLarge = require('@/assets/cow-herd-large.png')
var clusterStyles

export default {
  name: 'Maps',
  latLONG: latLong,
  components: {
    Navigation: Navigation
  },
  data () {
    return {
      markerOptions: {
        url: mapMarker,
        size: { width: 100, height: 90, f: 'px', b: 'px' },
        scaledSize: { width: 45, height: 45, f: 'px', b: 'px' }
      },
      gridSize: 50,
      clusterStyles: [
        {
          url: mapMarkerHerdSmall,
          height: 58,
          width: 77,
          textSize: 1
        },
        {
          url: mapMarkerHerdMedium,
          height: 70,
          width: 93,
          textSize: 1
        },
        {
          url: mapMarkerHerdLarge,
          height: 100,
          width: 133,
          textSize: 1
        }
      ]
    }
  }
}
</script>
<style scoped>
.map {
    width:100%;
    height: 500px;
}
p {
  align-content: flex-start;
}
</style>
