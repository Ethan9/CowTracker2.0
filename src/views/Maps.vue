<template>
  <div class="test">
    <Navigation></Navigation>
    <div class="">
    <GmapMap
  :center="{lat: 53.486902, lng:-2.273551}"
  :zoom="6"
  map-type-id="terrain"
  style="width: 100%; height: 800px"
>
<GmapCluster :styles="clusterStyles" :grid-size="gridSize">
  <!-- <GmapCircle
    v-for="geoObject in $options.latLONG"
    :key="geoObject.id"
    :center="{lat: parseFloat(geoObject.lat), lng: parseFloat(geoObject.lng)}"
    :radius="30000"
    :visible="true"
    :options="{fillColor:'#379fb8',fillOpacity:1.0}"
  ></GmapCircle> -->
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
          url: mapMarkerHerdSmall,
          height: 70,
          width: 93,
          textSize: 1
        },
        {
          url: mapMarkerHerdSmall,
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
</style>
