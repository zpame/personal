<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SeniorPic from '@/assets/seniorpic2.jpg'
</script>

<template>
  <div id = "Img1">
    <img :src="SeniorPic" alt="Profile Picture">
    </div>
    <h1>Zachary Pamer</h1>
    <div id="projects">
        <h1><a href="projects.html">Projects</a></h1>
    </div>
    <div id="hobbies">
        <h1><a href="Hobbies.html">Hobbies</a></h1>
    </div>

</template>
