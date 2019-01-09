<template>
  <div>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  data () {
    return {
      center: { lat: 51.492081, lng: 7.4473943 },
      places: ['Signal Iduna Park'],
      markers: [{ address: 'Signal Iduna Park' }]
    }
  }
}
</script>
