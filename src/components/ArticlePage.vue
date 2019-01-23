<template>
  <div class="single-article">
    <div v-if="loaded">




      <br>
      <h1>Article: {{article.title}}</h1>
      <br>
      <div class="card text-white bg-primary mb-3">
        <div class="card-header">
          Topic: {{article.topic}} contained in Section {{article.section}}
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>{{article.content}}</p>
            <footer class="blockquote-footer">Published originally in  <cite title="Source Title">{{$t(article.original_language)}}</cite></footer>
          </blockquote>
        </div>
      </div><br><br>
      <h2>{{$t('questions')}}</h2>
      <br><br>
        <div v-for="(question) in questions" v-bind:key="question.id">
          <div class="card">
            <div class="card-header">
              {{question.title}}         <i class="fa fa-thumbs-up" aria-hidden="true"></i> {{question.likes}}
              <i class="fas fa-thumbs-down" aria-hidden="true"></i>{{question.dislikes}}
            </div>
            <h3>  {{question.content}}</h3>



            <div class="card-columns">
              <div class="card p-3" v-for="(answer) in question.answers" v-bind:key="question.id">
                <blockquote class="blockquote mb-0 card-body">
                  <p>{{answer.content}}</p>
                  <footer >
                    <small class="text-muted">
                      {{answer.title}}     <br> <i class="fa fa-thumbs-up" aria-hidden="true"></i> {{answer.likes}}
                      <i class="fas fa-thumbs-down" aria-hidden="true"></i>{{answer.dislikes}}
                    </small>
                  </footer>
                </blockquote>
              </div>
            </div>
        </div>
      </div>

      <router-link :to="'/'" class="btn btn-primary"> {{$t('back')}} </router-link>
    </div>





    <div v-else>
      <h3>Loading...</h3>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue';
  import i18n from '@/plugins/i18n';
  import axios from 'axios';


  import ArticlePage from '@/components/ArticlePage.vue';
  export default {
    name: 'ArticlePage',
    data () {
      return {
        article: [],
        questions: [],
        answers: [],
        loaded: false
      }
    },

    created(){
      console.log("Fetched!");
      axios.get('http://192.168.99.100:3000/articles/' + this.$route.params.id.toString())
      //{
      //params: {
      //   ID: 12345
      //  })
        .then(response => {
          this.loaded = true
          this.article = response.data;
          this.questions = response.data.questions

        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })

    },
    beforeCreate (){
      // db.collection('articles').where(doc.id, '==' this.$route.params.id).then(querySnapshot =>{
      //   const articles = []
      //   const articlesArray = []
      //   let i = 0
      //   querySnapshot.forEach((doc)=>{
      //     articlesArray.push(doc.data())
      //     articlesArray[i].id = doc.id
      //     articles.push(articlesArray[i])
      //     i++
      //   })
      //   this.articles = articles
      // })
      console.log("Article !")
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3{
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .card-columns {
    @include media-breakpoint-only(lg) {
      column-count: 4;
    }
    @include media-breakpoint-only(xl) {
      column-count: 5;
    }
  }
</style>
