
<template>


  <div id="articles">

    <h1>{{ $t('welcomeMsg') }}</h1>



    <div class="card mt-5">
      <div class="card-header">
        Articles
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">
                 {{ $t('form.title') }}
              </th>
              <th>
                 {{ $t('form.topic') }}
              </th>
              <th>
                 {{ $t('form.section') }}
              </th>
              <th>
                {{ $t('form.language') }}
              </th>
              <th>
                {{ $t('action') }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(article) in articles" v-bind:key="article.id">
              <template v-if="editId == article.id">
                <td><input v-model="editArticleData.article_id" type="text"></td>
                <td><input v-model="editArticleData.article_title" type="text"></td>
                <td><input v-model="editArticleData.article_price" type="text"></td>
                <td>
                    <span class="icon">
                      <i  @click="onEditSubmit(article.id)" class="fa fa-check"></i>
                    </span>
                  <span class="icon">
                      <i  @click="onCancel" class="fa fa-ban"></i>
                    </span>
                </td>
              </template>
              <template v-else>
                <td>
                  {{article.title}}
                </td>
                <td>
                  {{article.topic}}
                </td>
                <td>
                  {{article.section}}
                </td>
                <td>

                  {{ $t(article.language) }}

                </td>
                <td>

                  <a v-on:click="onDelete(article.id)" href="#" class="icon">
                    <i  class="fa fa-trash"></i>
                  </a>


                  <router-link
                    :to="{
                      name:'UpdateArticles',
                      params:{id: article.id}
                    }"
                    class="icon"

                  >
                    <i class="fa fa-pencil-alt"></i>
                  </router-link>

                  <router-link
                    :to="{
                      name:'ArticlePage',
                      params:{id: article.id}
                    }"
                    class="icon"

                  >
                    <i class="fa fa-eye"></i>
                  </router-link>


                </td>
              </template>
            </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>

    <router-link to="/create" class="btn btn-primary btn-lg"> Create new </router-link>

  </div>
</template>





<script>
  import Vue from 'vue';
  import i18n from '@/plugins/i18n';
  import axios from 'axios';

  import CreateArticles from '@/components/CreateArticles.vue';
  import UpdateArticles from '@/components/UpdateArticles.vue';
  import DeleteArticles from '@/components/DeleteArticles.vue';
  import ArticlePage from '@/components/ArticlePage.vue';



  export default {
      title: 'articles',
      components: {
        CreateArticles,
        UpdateArticles,
        DeleteArticles,
        ArticlePage
      },
    data(){
      return {
        articles: [],
        title: [],
        relationship: [],
        errors: [],
        editId: '',
        articleData: {
          'id' : '',
          'article_id': '',
          'article_title': '',
          'article_price': ''
        },
        editArticleData: {
          'id' : '',
          'article_id': '',
          'article_title': '',
          'article_price': ''
        },
        articles: []
      }
    },
    created(){
        console.log("Created!");
        console.log (Vue.config.API_URL + '/articles')
      axios.get('http://localhost:3000/articles')
      //{
      //params: {
      //   ID: 12345
      //  })
        .then(response => {
          this.articles = response.data;
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })

    },
    computed:{
      sortedArticles(){
        return this.articles.slice().sort((a,b)=>{
          return a.article_id - b.article_id
        })
      }
    },
    methods: {
      onSubmit(){
        //db.collection('articles').add(this.articleData).then(this.getArticles)
        this.articleData.article_id = ''
        this.articleData.article_title = ''
        this.articleData.article_price = ''
      },
      // onDelete(article_id){
      //   db.collection('articles').where('article_id', '==', article_id).get().then(querySnapshot =>{
      //     querySnapshot.forEach(doc=>{
      //       doc.ref.delete().then(this.getArticles)
      //     })
      //   })
      // }
      onDelete: function (id){

        console.log("Removed as that person");
        axios.delete('http://localhost:3000/articles/' + id.toString())
          .then(response => {
            console.log("Deleted!")
          });
        console.log(this.result);

        axios.get('http://localhost:3000/articles')
        //{
        //params: {
        //   ID: 12345
        //  })
          .then(response => {
            this.articles = response.data;
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
            // always executed
          })
        console.log("hehe");
        location.reload();
      },
      onEdit(article){
        this.editId = article.id
        this.editArticleData.article_id = article.article_id
        this.editArticleData.article_title = article.article_title
        this.editArticleData.article_price = article.article_price
      },
      onCancel(){
        this.editId = ''
        this.editArticleData.article_id = ''
        this.editArticleData.article_title = ''
        this.editArticleData.article_price = ''
      },
      onEditSubmit (id){
        db.collection("articles").doc(id).set(this.editArticleData).then(
          this.getArticles)
        this.editId = ''
        this.editArticleData.article_id = ''
        this.editArticleData.article_title = ''
        this.editArticleData.article_price = ''
      }
    }
  }

</script>

<style scoped>
  h3{
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .icon{
    margin-right: 10px;
  }
  .icon i{
    cursor: pointer;
  }
</style>

