<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SeniorPic from '@/assets/seniorpic1.jpg'
import '../../style.css'
</script>

<template>
  <div class="Img1">
    <img :src="SeniorPic" alt="Profile Picture" />
  </div>
  <h1>Zachary Pamer</h1>
  <RouterLink class="MainButton" to="/projects">Projects</RouterLink>
  <br />
  <RouterLink class="MainButton" to="/hobbies">Hobbies</RouterLink>

  <RouterView />
</template>
