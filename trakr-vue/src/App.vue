<script setup></script>

<template>
  <section id ="dashboard">
    <h1>
      Hola mundo
    </h1>
  </section>
</template>

<style scoped>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    color-scheme: light dark;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    display: grid;
    place-content: center;
    height: 100vh;
    padding: 36px 36px 100px 36px;
    grid-template-rows: 1fr;
    margin: 100px;
  }

  #dashboard {
    background-color: #c7b8ff;
    border: 1px solid #7650ff;
    border-radius: 5px;
    overflow: hidden;
    width: 90vh;
    height: 100vh;
    position: relative;
    display: grid;
    place-items: center;
  }


</style>
