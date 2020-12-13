import Vue from 'vue'
import Vuex from 'vuex';

import { Notify } from 'quasar'

import { getAlbums, getPhotosByAlbum } from '@/api';
import { Album, Photo, HistoryRow, Column } from '@/types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    albums: null as (Array<Album> | null),
    picked: [] as Array<Album>,
    history: [] as Array<HistoryRow>
  },
  getters: {
    albums: (state): Array<Album> | null => state.albums,
    picked: (state): Array<Album> => state.picked,
    history: (state): Array<HistoryRow> => state.history,
    historyOfAdding: (state): Array<HistoryRow> => state.history.filter(row => row.from === Column.first),
    historyOfRemoving: (state): Array<HistoryRow> => state.history.filter(row => row.from === Column.second)
  },
  mutations: {
    saveAlbums(state, albums: Array<Album>) {
      state.albums = albums;
    },
    removeFromAlbums(state, album: Album) {
      state.albums = state.albums?.filter(item => album.id != item.id) ?? null;
    },
    removeFromPicked(state, album: Album) {
      state.picked = state.picked.filter(item => album.id != item.id);
    },
    addToPicked(state, album: Album) {
      state.picked.push(album)
    },
    addToAlbums(state, album: Album) {
      state.albums?.push(album);
    },
    addHistory(state, row: HistoryRow) {
      state.history.push(row)
    }
  },
  actions: {
    async loadAlbums({ commit, getters }) {
      if (getters.albums) return

      let albums = [];
      try {
        albums = await getAlbums()
      } catch {
        Notify.create('Something goes wrong on catching Albums.')
        return;
      }

      const promises: Array<Promise<void>> = [];

      albums.forEach((element: Album) => {
        promises.push(
          getPhotosByAlbum(element.id).then((photos: Array<Photo>) => {
            element.photos = photos;
          }).catch(e => {
            console.log(e)
            Notify.create('Something goes wrong on catching Photos.')
          })
        );
      });

      Promise.all(promises).then(() =>
        commit('saveAlbums', albums)
      );
    },
    addToPicked({ commit }, item: Album) {
      commit('removeFromAlbums', item)
      commit('addToPicked', item)
      commit('addHistory', {
        date: new Date(),
        itemId: item.id,
        title: item.title,
        from: Column.first,
        to: Column.second
      } as HistoryRow)
    },
    addToAlbums({ commit }, item: Album) {
      commit('removeFromPicked', item)
      commit('addToAlbums', item)
      commit('addHistory', {
        date: new Date(),
        itemId: item.id,
        title: item.title,
        from: Column.second,
        to: Column.first
      } as HistoryRow)
    }
  }
})
