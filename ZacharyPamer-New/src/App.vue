<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SeniorPic from '@/assets/seniorpic1.jpg'
import '../../style.css'

</script>

<template>
  <div class="Img1">
    <img :src="SeniorPic" alt="Profile Picture">
    </div>
    <h1>Zachary Pamer</h1>
    <div class="MainButton">
        <h1><a href="projects.html">Projects</a></h1>
    </div>
    <div class="MainButton">
        <h1><a href="Hobbies.html">Hobbies</a></h1>
    </div>

</template>
