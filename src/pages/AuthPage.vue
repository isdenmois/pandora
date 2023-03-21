<script setup lang="ts">
import { ref } from 'vue'
import { signIn } from 'entities/viewer'

const email = ref('')
const password = ref('')
const loading = ref(false)
const login = async () => {
  try {
    loading.value = true
    await signIn(email.value, password.value)
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth">
    <form @submit.prevent="login">
      <q-input v-model="email" filled type="email" hint="Email" :disable="loading" />
      <q-input v-model="password" filled type="password" hint="Password" :disable="loading" />

      <div class="submit-button">
        <q-btn type="submit" color="primary" label="Login" :loading="loading" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.auth {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
}

form {
  width: 300px;
}

.submit-button {
  margin-top: 16px;
  text-align: center;
}
</style>
