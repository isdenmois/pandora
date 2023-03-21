<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { authInit$, loggedIn$ } from 'entities/viewer'
import { useObservable } from 'shared/hooks'

const AuthPage = defineAsyncComponent(() => import('pages/AuthPage.vue'))

const loaded = useObservable(authInit$)
const loggedIn = useObservable(loggedIn$)
</script>

<template>
  <template v-if="loaded">
    <router-view v-if="loggedIn" />

    <AuthPage v-else />
  </template>
</template>
