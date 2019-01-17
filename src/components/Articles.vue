<template>
 <div id="articles">
  <div v-for="(article) in articles" :key="article.id">
   <p>{{article.name}} is my {{article.relationship}}</p>
  </div>
 </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        articles: [],
        name: [],
        relationship: [],
        errors: []
      }
    },
    created() {
      axios.get('localhost:3000/articles')
        .then(response => {
        .this.articles = response.data
        })
        .catch(e => {
          this.error.push(e)
        })
    },
  }
</script>
