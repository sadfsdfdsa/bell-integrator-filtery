<template>
  <div class="row">
    <q-card class="col q-ma-sm q-pa-md shadow-3 text-body1">
      <div class="row justify-between items-center">
        <div class="col">
          {{ id }}.
          <text-highlight :queries="[filter]">{{ title }}</text-highlight>
        </div>
        <div class="col-auto">
          <q-btn
            round
            color="grey-6"
            size="sm"
            :icon="'fas fa-chevron-' + (opened ? 'up' : 'down')"
            @click="opened = !opened"
          />
          <q-btn
            round
            :color="isPicked ? 'red-5' : 'primary'"
            size="sm"
            class="q-ml-xs"
            :icon="'fas fa-' + (isPicked ? 'minus' : 'plus')"
            @click="$emit('pick')"
          />
        </div>
      </div>
      <div v-if="opened">
        <div
          :key="index"
          v-for="(photo, index) in photos"
          class="row text-body2"
        >
          {{ photo.id }}.
          <text-highlight :queries="[filter]">{{ photo.title }}</text-highlight>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AlbumCard",
  props: {
    id: {
      type: Number,
      required: true,
    },
    // Array<Photo>
    photos: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      required: true,
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
  data: () => {
    return {
      opened: false,
    };
  },
});
</script>