<template>
  <div id="app">
    <div>
      <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
        <flag :iso="entry.flag" v-bind:squared=false /> {{entry.title}}
      </button>
    </div>
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view></router-view>




  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue';
  import Articles from './components/Articles.vue';
  import CreateArticles from './components/CreateArticles.vue';
  import i18n from '@/plugins/i18n';
  import axios from 'axios';

  export default {
    name: 'app',
    components: {
      HelloWorld,
      Articles,
      CreateArticles
    },
    data() {
      return {
        languages: [
          { flag: 'gb', language: 'en', title: 'English' },
          { flag: 'de', language: 'de', title: 'Deutsch' }
        ]
      };
    },
    methods: {
      changeLocale(locale) {
        axios.post('http://192.168.99.100:3000/setLocale', {
          locale: locale.toString(),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(response => {})
          .catch(e => {
            this.errors.push(e)
          });
        i18n.locale = locale;
        this.$forceUpdate();
        console.log(locale);

      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  button {
    padding: 15px;
    border: 1px solid green;
    font-size: 18px;
    margin: 15px;
  }
  h1 {
    margin-bottom: 30px;
  }

  #app {
    padding: 20px;
  }
</style>



