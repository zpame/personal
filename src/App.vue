<template>
  <div class="site-shell">
    <header class="topbar">
      <a class="wordmark" href="/" aria-label="Zachary Pamer home">Zachary Pamer</a>
      <nav class="nav-links" aria-label="Main navigation">
        <a href="/projects.html">Projects</a>
        <a href="/Hobbies.html">Hobbies</a>
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
          <a class="primary-link" href="/projects.html">See my projects</a>
        </div>
        <div class="hero-image">
          <img src="/SeniorPic1.JPEG" alt="Senior picture of Zack" />
        </div>
      </section>

      <section class="work-section" aria-labelledby="work-title">
        <div class="section-heading">
          <p class="eyebrow">My projects</p>
          <h2 id="work-title">Projects I've worked on.</h2>
          <a class="text-link" href="/projects.html">See all projects</a>
        </div>
        <div class="project-list">
          <a class="project-row featured" href="/BlockRunner.html">
            <span class="project-name">Block Runner</span>
            <span class="project-type">Mobile game</span>
          </a>
          <a class="project-row" href="/Isolation.html">
            <span class="project-name">Isolation</span>
            <span class="project-type">Mobile / PC game</span>
          </a>
          <a class="project-row" href="/MagicClicker.html">
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
          <a href="/Hobbies.html#cubing" class="interest-item"><span>Speedcubing</span></a>
          <a href="/Hobbies.html#basketball" class="interest-item"><span>Basketball</span></a>
          <a href="/Hobbies.html#gaming" class="interest-item"><span>Gaming</span></a>
        </div>
      </section>
    </main>

    <footer class="footer">
      <span>Zachary Pamer</span>
      <span>Thanks for visiting</span>
    </footer>
  </div>
</template>
