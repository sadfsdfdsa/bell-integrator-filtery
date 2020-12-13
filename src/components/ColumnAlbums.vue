<template>
  <div class="col col-sm-6">
    <div class="row text-h5">
      <div class="col text-center">{{ title }}</div>
    </div>
    <AlbumCard
      :key="index"
      v-for="(album, index) in items"
      :id="album.id"
      :index="index"
      :title="album.title"
      :photos="album.photos"
      :isPicked="isPicked"
      :filter="filter"
      @pick="$emit('pick', index)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "AlbumsColumn",
  components: {
    AlbumCard: () => import("../components/AlbumCard.vue"),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    isPicked: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: String,
      default: "",
    },
  },
});
</script>