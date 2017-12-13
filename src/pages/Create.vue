<template>
  <v-container grid-list-md text-xs-left>
    <v-layout row wrap>
      <v-flex xs12>
        <form class="form">
          <v-text-field label="标题字数 10 字以上" v-model="title" required single-line></v-text-field>
          <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
          <v-btn @click="submit">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    submit() {},
    clear() {}
  }
}
</script>

<style lang="stylus" scoped>
@import '~simplemde/dist/simplemde.min.css';
</style>
