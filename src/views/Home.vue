<template>
  <div class="home">
    <NavBar />
    <div class="row justify-center">
      <q-input v-model="input" class="col q-ma-sm text-h6" label="Filter" />
    </div>
    <div v-if="albums" class="row q-mt-sm">
      <ColumnAlbums
        title="All items"
        :items="sortedAlbums"
        :filter="input"
        @pick="addToPicked"
      />
      <ColumnAlbums
        title="Picked items"
        :items="picked"
        @pick="addToAlbums"
        :isPicked="true"
      />
    </div>
    <div v-else class="row q-mt-xl items-center">
      <div class="col text-center">
        <q-spinner color="primary" size="10em" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Album } from "../types";

export default Vue.extend({
  name: "Home",
  components: {
    NavBar: () => import("../components/NavBarHome.vue"),
    ColumnAlbums: () => import("../components/ColumnAlbums.vue"),
  },
  data: () => {
    return {
      input: "",
    };
  },
  async created() {
    await this.$store.dispatch("loadAlbums");
  },
  computed: {
    albums(): Array<Album> | null {
      return this.$store.getters.albums;
    },
    picked(): Array<Album> {
      return this.$store.getters.picked;
    },
    sortedAlbums(): Array<Album> | null {
      const albums: Array<Album> | null = this.$store.getters.albums;
      if (!this.input || !albums) return albums;
      return albums.sort((album1: Album, album2: Album): number => {
        let album1Count = this.substringsNumber(album1.title);
        let album2Count = this.substringsNumber(album2.title);

        album1.photos &&
          album1.photos.forEach(
            (photo) => (album1Count += this.substringsNumber(photo.title))
          );

        album2.photos &&
          album2.photos.forEach(
            (photo) => (album2Count += this.substringsNumber(photo.title))
          );

        // я не знаю почему, но мой линтер для vscode делает так!
        return album1Count > album2Count
          ? 1 // more
          : album1Count === album2Count
          ? 0 // ===
          : -1; // less
      });
    },
  },
  methods: {
    substringsNumber(string: string): number {
      return string.split(this.input).length - 1;
    },
    async addToPicked(index: number): Promise<void> {
      if (!this.albums) return;
      this.$store.dispatch("addToPicked", this.albums[index]);
    },
    async addToAlbums(index: number): Promise<void> {
      this.$store.dispatch("addToAlbums", this.picked[index]);
    },
  },
});
</script>