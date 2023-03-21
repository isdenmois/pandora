<script setup lang="ts">
import { ref } from 'vue'
import { tvdbAPI } from 'shared/api'
import { SeriesSearchItem } from 'shared/api/tvdb/series-search'
import { allSeries$, createSeries, removeSeries } from 'entities/series'
import { useObservable } from 'shared/hooks'
import { env } from 'shared/lib'

const query = ref('')
const series = ref<SeriesSearchItem[]>([])
const loading = ref(false)
const allSeries = useObservable(allSeries$)

const search = async () => {
  loading.value = true

  series.value = []

  try {
    series.value = await tvdbAPI.search(query.value, 'en')
  } finally {
    loading.value = false
  }
}

const addSeries = async (series: SeriesSearchItem) => {
  await createSeries({
    id: `tvdb_${series.id}`,
    title: series.seriesName,
    overview: series.overview,
    poster: series.image || undefined,
    aired: series.firstAired?.toISOString(),
    network: series.network || undefined,
    status: 1,
  })

  alert('Series was added')
}
</script>

<template>
  <q-page class="column items-center justify-evenly">
    <q-card v-for="series of allSeries" v-bind:key="series.id" class="card">
      <q-img v-if="series.poster" :src="env.corsURL + series.poster">
        <div class="absolute-bottom text-subtitle2 text-center">{{ series.title }}</div>
      </q-img>

      <q-card-section v-else>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ series.title }}</div>
      </q-card-section>

      <q-card-section>
        <q-btn label="Remove" @click="removeSeries(series.id)" />
      </q-card-section>
    </q-card>

    <form @submit.prevent="search" class="row items-start">
      <q-input filled bottom-slots v-model="query" label="Query" dense :disabled="loading">
        <template v-slot:append>
          <q-icon v-if="query" name="close" @click="query = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>
      </q-input>

      <q-btn type="submit" color="white" text-color="black" :disabled="loading" label="Search" />
    </form>

    <div v-if="loading">Loading...</div>

    <div class="q-pa-md row items-start q-gutter-md">
      <q-card v-for="item of series" v-bind:key="item.id" class="card">
        <q-img v-if="item.image" :src="env.corsURL + item.image">
          <div class="absolute-bottom text-subtitle2 text-center">{{ item.seriesName }}</div>
        </q-img>

        <q-card-section v-else>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ item.seriesName }}</div>
        </q-card-section>

        <q-card-section>
          <q-btn label="Add to the collection" @click="addSeries(item)" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>
form {
  gap: 16px;
}
.card {
  width: 250px;
}

@media (max-width: 550px) {
  .card {
    width: calc(100vw - 32px);
  }
}
</style>
