<template>
  <v-list two-line>
    <template v-for="(item, index) in items">
      <v-list-tile avatar ripple :key="index" :to="{name: 'detail', params: {id: item.id}}" ripple>
        <v-list-tile-avatar>
          <img :src="item.author.avatar_url">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
          <v-list-tile-sub-title>{{ item.create_at|formatDate }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider v-if="index + 1 < items.length" :key="index" :inset="true"></v-divider>
    </template>
  </v-list>
  <!-- <v-layout row wrap>
    <v-flex xs12 v-for="(item, index) in items" :key="index">
      <v-card color="blue-grey darken-2" class="white--text">
        <v-card-title primary-title>
          <div class="headline">Unlimited music now</div>
          <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat dark>Listen now</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout> -->
</template>

<script>
export default {
  name: 'c-topics',
  props: {
    items: { type: Array, required: true }
  }
}
</script>

<style lang="stylus" scoped>
</style>
