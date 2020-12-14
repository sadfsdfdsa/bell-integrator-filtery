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
      let albums: Array<Album> | null = this.$store.getters.albums;
      if (!this.input || !albums) return albums;

      const albumsSubstring: Record<number, number> = {};

      albums.forEach(album => {
        let albumCount = this.substringsNumber(album.title);
        album.photos && album.photos.forEach(photo => 
          albumCount += this.substringsNumber(photo.title)
        )
        albumsSubstring[album.id] = albumCount;
      })

      albums = albums.filter(album => albumsSubstring[album.id] !== 0)

      return albums.sort((album1, album2): number => {
        const al1Count = albumsSubstring[album1.id];
        const al2Count = albumsSubstring[album2.id];

        return al1Count > al2Count
          ? 1 // more
          : al1Count === al2Count
          ? 0 // ===
          : -1; // less
      })
    },
  },
  methods: {
    substringsNumber(string: string): number {
      return string.split(this.input).length - 1;
    },
    async addToPicked(index: number): Promise<void> {
      if (!this.sortedAlbums) return;
      this.$store.dispatch("addToPicked", this.sortedAlbums[index]);
    },
    async addToAlbums(index: number): Promise<void> {
      this.$store.dispatch("addToAlbums", this.picked[index]);
    },
  },
});
</script>