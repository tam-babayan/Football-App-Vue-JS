<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
    <div class="container">
      <!-- Collapse -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <!-- Left -->
        <ul class="navbar-nav mr-auto">
          <ul class="navbar-nav mr-auto">
            <router-link class="nav-item" :to="{ path: '/' }" tag="li">
              <a class="nav-link">Home</a>
            </router-link>
          </ul>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style>
</style>
