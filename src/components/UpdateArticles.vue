<template>

  <div id="update_articles">

    <div>
      <h1>{{$t('creation.title')}}</h1>
      <form v-if="!isSubmitted" @submit.prevent="submit" novalidate>
        <div class="form-group">
          <label for="title">{{ $t('form.title') }} *</label>
          <input type="text" class="form-control" id="title" v-model.lazy.trim="form.title" @blur="onFieldBlur('title')" v-bind:class="getFieldClasses('title')">
          <div v-if="isErrorField('title')" class="invalid-feedback">{{ $t('error.fieldRequired', { field: $t('form.title') }) }}</div>
        </div>
        <div class="form-group">
          <label for="topic">{{ $t('form.topic') }} *</label>
          <input type="text" class="form-control" id="topic" v-model.lazy.trim="form.topic" @blur="onFieldBlur('topic')" v-bind:class="getFieldClasses('topic')">
          <div v-if="isErrorField('topic')" class="invalid-feedback">{{ $t('error.fieldRequired', { field: $t('form.topic') }) }}</div>
        </div>
        <div class="form-group">
          <label for="section">{{ $t('form.section') }} *</label>
          <input type="text" class="form-control" id="section" v-model.lazy.trim="form.section" @blur="onFieldBlur('section')" v-bind:class="getFieldClasses('section')">
          <div v-if="isErrorField('section')" class="invalid-feedback">{{ $t('error.fieldRequired', { field: $t('form.section') }) }}</div>
        </div>
        <div class="form-group">
          <label for="type">{{ $t('form.language') }} *</label>
          <select id="type" class="form-control" v-model="form.language" @blur="onFieldBlur('language')" v-bind:class="getFieldClasses('language')">
            <option v-for="language in languages" v-bind:key="language.value" v-bind:value="language.value">{{ $t(language.label) }}</option>
          </select>
          <div v-if="isErrorField('language')" class="invalid-feedback">{{ $t('form.language') }}</div>
        </div>
        <div class="form-group">
          <label for="content">{{ $t('form.content') }}</label>
          <textarea
            type="content"
            class="form-control"
            id="content"
            v-model.trim="form.content"
            v-bind:class="getFieldClasses('content')"
            v-bind:maxlength="$v.form['content'].$params.maxLength.max"
            @blur="onFieldBlur('content')">
        </textarea>
          <small class="text-muted form-text">{{ $tc('form.charactersLeft', getCharactersLeft('content'), { charCount: getCharactersLeft('content') }) }}</small>
          <div v-if="isErrorField('content')" class="invalid-feedback">{{ $t('error.fieldMaxLength', { field: $t('form.content') }) }}</div>
        </div>
        <div class="alert alert-danger" v-if="isError">
          <p class="mb-0">
            <strong>{{ $t(errorHeader) }}</strong>
          </p>
          <ul class="mb-0 pl-3" v-if="errors.length > 0">
            <li v-for="error in errors" v-bind:key="error.field">
              <span v-if="error.field">{{ $t('form.'+error.field) }}<span v-if="error.message">: {{ $t(error.message) }}</span></span>
              <span v-else-if="error.message">{{ $t(error.message) }}</span>
            </li>
          </ul>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            <span v-if="submitting">{{ $t('form.submitting' ) }} <img src="@/assets/loader.svg" /></span>
            <span v-else>{{ $t('form.submit' ) }}</span>
          </button>
          <router-link :to="'/'" class="btn btn-primary"> Back </router-link>
        </div>
      </form>
      <div v-else>
        <div class="alert alert-success">
          <strong>{{ $t('form.submitted' ) }}</strong>
        </div>
        <div class="alert alert-info">
          <p><strong>{{ $t('form.sentInfo' ) }}</strong></p>
          <pre>
            {{form}}
        </pre>
        </div>
        <p class="text-center">
          <a href="/" class="btn btn-secondary" >{{ $t('form.return' ) }}</a>

        </p>
      </div>
    </div>

  </div>
</template>


<script>

  import { required, maxLength } from 'vuelidate/lib/validators';
  import axios from 'axios';
  import Vue from 'vue';

  export default {
    name: 'CreateArticles',
    data() {
      return {
        isSubmitted: false,
        isError: false,
        errorHeader: 'error.invalidFields',
        errors: [],
        languages: this.getLanguages(),
        submitting: false,
        form: {
          title: '',
          topic: '',
          section: '',
          language: null,
          content: ''
        }
      }
    },
    created(){
      console.log("Fetched!");
      axios.get('http://localhost:3000/articles/' + this.$route.params.id.toString())
      //{
      //params: {
      //   ID: 12345
      //  })
        .then(response => {
          this.form.title = response.data.title;
          this.form.topic = response.data.topic;
          this.form.section = response.data.section;
          this.form.language = response.data.language;
          this.form.content = response.data.content;
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })

    },
    methods: {
      submit() {
        this.$v.$touch();
        if (!this.$v.$error) {
          this.sendFormData();
        } else {
          this.validationError();
        }
      },
      enableSubmitLoader() {
        this.submitting = true;
      },
      disableSubmitLoader() {
        this.submitting = false;
      },
      sendFormData() {
        this.enableSubmitLoader();
        console.log("jejeje");
        axios.put('http://localhost:3000/articles/' + this.$route.params.id.toString() , this.form).then(response => {
          this.submitSuccess(response);
          this.disableSubmitLoader();
        }).catch(error => {
          this.submitError(error);
          this.disableSubmitLoader();
        });
      },
      submitSuccess(response) {
        console.log("Debugging");
        console.log(response);
        if (response.status == 204) {
          this.isSubmitted = true;
          this.isError = false;
        } else {
          this.errorHeader = 'error.invalidFields';
          this.errors = response.data.errors;
          this.isError = true;
        }
      },
      submitError(error) {
        this.errorHeader = 'error.general';
        this.errors = [{'field': null, 'message': 'error.generalMessage'}];
        this.isError = true;
      },
      validationError() {
        this.errorHeader = 'error.invalidFields';
        this.errors = this.getErrors();
        this.isError = true;
      },
      isErrorField(field) {
        try {
          if (this.getValidationField(field).$error) {
            return true;
          }
        } catch (error) {}

        return this.errors.some(el => el.field === field);
      },
      getErrors() {
        let errors = [];
        for (const field of Object.keys(this.form)) {
          try {
            if (this.getValidationField(field).$error) {
              errors.push({'field': field, 'message': null});
            }
          } catch (error) {}
        }
        return errors;
      },
      getFieldClasses(field) {
        return { 'is-invalid': this.isErrorField(field) }
      },
      getCharactersLeft(field) {
        try {
          return this.getValidationField(field).$params.maxLength.max - this.form[field].length;
        } catch (error) {
          return 0;
        }
      },
      getLanguages() {
        return [{
          value: 'en',
          label: 'form.languages.en'
        }, {
          value: 'de',
          label: 'form.languages.de'
        }];
      },
      getValidationField(field) {
        if (this.$v.form[field]) {
          return this.$v.form[field];
        }
        throw Error('No validation for field ' + field);
      },
      onFieldBlur(field) {
        try {
          this.getValidationField(field).$touch();
          if (this.getValidationField(field).$error) {
            if (!this.errors.some(el => el.field === field)) {
              this.errors.push({'field': field, 'message': null});
            }
          } else {
            this.errors = this.errors.filter(el => el.field !== field);
          }
        } catch (error) {}
      },
      reload() {
        window.location = '';
      }
    },
    validations: {
      form: {
        title: { required },
        topic: { required },
        section: { required },
        language: { required },
        content: { required, maxLength: maxLength(1000) }
      }
    },
    watch: {
      errors() {
        this.isError = this.errors.length > 0 ? true : false;
      }
    }
  }
</script>


<style src="./Form.scss" lang="scss" scoped></style>
