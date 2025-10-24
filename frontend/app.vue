<template>
  <div class="container">
    <h1>Bambu Manager</h1>
    <div class="status-section">
      <h2>Backend Status</h2>
      <div v-if="pending" class="loading">Loading...</div>
      <pre v-else-if="backendStatus" class="status-box">{{ JSON.stringify(backendStatus, null, 2) }}</pre>
      <div v-else-if="error" class="error">
        <p>Error: {{ error.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

const { data: backendStatus, pending, error } = await useFetch(`${config.public.apiBase}/health`, {
  server: false
})
</script>

<style scoped>
.container {
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

h2 {
  color: #34495e;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.status-section {
  margin-top: 2rem;
}

.loading {
  color: #666;
  font-style: italic;
}

.status-box {
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  border: 1px solid #ddd;
}

.error {
  color: #e74c3c;
  padding: 1rem;
  background: #fee;
  border-radius: 4px;
  border: 1px solid #fcc;
}
</style>
