<template>
  <div class="row items-center">
    <div class="col-auto text-h3">Filtery</div>
    <div class="col q-pl-sm">by Artem Shuvaev</div>
    <div class="col text-right">
      <div class="row items-end q-gutter-sm">
        <q-btn :to="{ name: 'History' }" color="primary" label="All history" />
        <q-btn
          :to="{ name: 'History', query: { type: 'add' } }"
          color="green-5"
          label="History of adding"
        />
        <q-btn
          :to="{ name: 'History', query: { type: 'remove' } }"
          color="red-5"
          label="History of removing"
        />
      </div>
    </div>
  </div>
</template>