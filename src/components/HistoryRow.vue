<template>
  <div class="row text-body1 q-mt-sm">
    <div class="col-sm-6">{{ id }}. {{ title }}</div>
    <div
      class="col"
      :class="{
        'text-green-5': from === 'FIRST',
        'text-red-5': from === 'SECOND',
      }"
    >
      {{ from }} &#8594; {{ to }}
    </div>
    <div class="col">
      {{ dateLocale }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HistoryRow",
  props: {
    date: {
      required: true,
      type: Date,
    },
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    // Column
    from: {
      type: String,
      required: true,
    },
    // Column
    to: {
      type: String,
      required: true,
    },
  },
  computed: {
    dateLocale() {
      return new Date(this.date).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },
});
</script>