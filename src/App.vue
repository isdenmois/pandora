<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useStore } from '@nanostores/vue'
import { loggedIn$ } from 'entities/viewer'

const AuthPage = defineAsyncComponent(() => import('pages/AuthPage.vue'))

const loggedIn = useStore(loggedIn$)
</script>

<template>
  <router-view v-if="loggedIn" />

  <AuthPage v-else />
</template>
