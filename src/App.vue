<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {getDatos} from '@/crud/crudAxios'


interface Datos {
  info: {
    count: number,
    pages: number,
    next: string,
    prev: string
  },
  results: [
    {
      id: number,
      name: string,
      status: string,
      species: string,
      type: string
      image: string
    }
  ]
}
const datos = ref<Datos>()
const paginar = ref<string>("1")
const url = "https://rickandmortyapi.com/api/character"
const recuperarDatos = async (url: string) => {
  datos.value = await getDatos(url)
   paginar.value = url.split('=')[1]
  console.log(datos.value)
}






onMounted(async () => {
  datos.value = await getDatos(url)
  console.log(datos.value)
})


</script>

<template>

  <div id="app">
    <h1>Rick and Morty Characters</h1>
       <div class="pagination">
        <button @click="recuperarDatos(datos?.info.prev)" :disabled="!datos?.info.prev">Previous</button>
        <button @click="recuperarDatos(datos?.info.next)" :disabled="!datos?.info.next">Next</button>
      </div>
      <h2>pages: {{ datos?.info.pages }}</h2>
      <h2>Total Characters: {{ datos?.info.count }}</h2>
      <h2>Current Page: {{ paginar }}</h2>
    <div class="character-card" v-for="character in datos?.results" :key="character.id">
      <img :src="character.image" alt="Character Image" width="100" height="100">
      <h2>{{ character.name }}</h2>
      <p>Status: {{ character.status }}</p>
      <p>Species: {{ character.species }}</p>
      <p>Type: {{ character.type ? character.type : 'Unknown' }}</p>
    </div>
 
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}

.character-card {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: inline-block;
  text-align: left;
  width: 200px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

}

.character-card img {
  border-radius: 50%;
}

.character-card h2 {
  color: #f00;
  font-size: 1.2rem;
}

.character-card p {
  color: #00f;
  font-size: 1rem;
}

.pagination {
  margin-top: 20px;
}

.pagination button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>