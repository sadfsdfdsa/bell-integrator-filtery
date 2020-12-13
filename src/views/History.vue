<template>
  <div class="about">
    <div class="row items-center">
      <div
        class="col-auto text-h3 cursor-pointer"
        @click="$router.push({ name: 'Home' })"
      >
        History
      </div>
    </div>
    <div class="row justify-center">
      <div class="col col-sm-8">
        <div class="row text-h3 q-mb-md">
          <div class="col text-center">{{ type }} history</div>
        </div>
        <q-separator horizontal />
        <HistoryRow
          v-for="(row, index) in history"
          :key="index"
          :date="row.date"
          :id="row.itemId"
          :title="row.title"
          :from="row.from"
          :to="row.to"
        />
        <q-separator v-if="history.length > 0" class="q-mt-sm" horizontal />
        <div class="row q-mt-sm">
          <div class="col text-center text-h4">
            {{ history.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { HistoryRow } from "../types";

export default Vue.extend({
  components: {
    HistoryRow: () => import("../components/HistoryRow.vue"),
  },
  name: "History",
  data: () => {
    return {
      history: [] as Array<HistoryRow>,
      type: "All",
    };
  },
  created() {
    const type = this.$route.query.type;
    switch (type) {
      case "add": {
        this.history = this.$store.getters.historyOfAdding;
        this.type = "Add";
        break;
      }
      case "remove": {
        this.history = this.$store.getters.historyOfRemoving;
        this.type = "Remove";
        break;
      }
      default: {
        this.history = this.$store.getters.history;
        break;
      }
    }
    this.history = this.history.sort((r1: HistoryRow, r2: HistoryRow) => {
      return r1.date > r2.date ? -1 : r1.date === r2.date ? 0 : 1;
    });
  },
});
</script>
