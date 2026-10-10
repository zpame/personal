<template>
  <div class="site-shell">
    <header class="topbar">
      <a class="wordmark" href="/" aria-label="Zachary Pamer home">Zachary Pamer</a>
      <nav class="nav-links" aria-label="Main navigation">
        <a href="/pages/projects.html">Projects</a>
        <a href="/pages/Hobbies.html">Hobbies</a>
        <a href="/Blog.html">Blog</a>
      </nav>
    </header>

    <main>
      <section class="hero" aria-labelledby="intro-title">
        <div class="hero-copy">
          <p class="eyebrow">A little about me</p>
          <h1 id="intro-title">Hi, I'm Zack.</h1>
          <p class="hero-description">
            I love to learn.
          </p>
          <a class="primary-link" href="/pages/projects.html">See my projects</a>
        </div>
        <div class="hero-image">
          <img :src="seniorPicture" alt="Senior picture of Zack" />
        </div>
      </section>

      <section class="work-section" aria-labelledby="work-title">
        <div class="section-heading">
          <p class="eyebrow">My projects</p>
          <h2 id="work-title">Projects I've worked on.</h2>
          <a class="text-link" href="/pages/projects.html">See all projects</a>
        </div>
        <div class="project-list">
          <a class="project-row featured" href="/pages/BlockRunner.html">
            <span class="project-name">Block Runner</span>
            <span class="project-type">Mobile game</span>
          </a>
          <a class="project-row" href="/pages/Isolation.html">
            <span class="project-name">Isolation</span>
            <span class="project-type">Mobile / PC game</span>
          </a>
          <a class="project-row" href="/pages/MagicClicker.html">
            <span class="project-name">MagicClicker</span>
            <span class="project-type">Mobile / PC game</span>
          </a>
        </div>
      </section>

      <section class="interests" aria-labelledby="interests-title">
        <div>
          <p class="eyebrow">My hobbies</p>
          <h2 id="interests-title">Things I like doing.</h2>
        </div>
        <div class="interest-grid">
          <a href="/pages/Cubing.html" class="interest-item"><span>Speedcubing</span></a>
          <a href="/pages/Basketball.html" class="interest-item"><span>Basketball</span></a>
          <a href="/pages/Gaming.html" class="interest-item"><span>Gaming</span></a>
        </div>
      </section>

      <section class="work-section" aria-labelledby="writing-title">
        <div class="section-heading">
          <p class="eyebrow">Pizza ratings</p>
          <h2 id="writing-title">Pizza places:</h2>
          <a class="text-link" href="/Blog.html">See all blogs</a>
        </div>
        <div class="project-list">
          <a class="project-row" href="/blogs/pizza-ratings.html">
            <span class="project-name">Pizza, yum.</span>
            <span class="project-type">Read Zack's ratings</span>
          </a>
        </div>
      </section>
    </main>

    <footer class="footer">
      <span>Zachary Pamer</span>
      <span>Thanks for visiting</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import seniorPicture from './assets/SeniorPic1.jpeg'
</script>
