<template>
  <div class="hemo-wrapper">
    <v-container grid-list-xs text-xs-center>
      <c-topics :items="items"></c-topics>
      <v-btn color="pink" fab dark primary fixed bottom right>
        <v-icon>add</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Topics from '@/components/Topics'
import topics from '@/store/modules/topics-tag'

export default {
  name: 'home',
  props: {},
  data() {
    return {
      vuexModulePath: [],
      titles: {
        all: 'Node.js专业中文社区',
        good: '精华',
        share: '分享',
        ask: '问答',
        job: '招聘',
        dev: '客户端测试'
      }
    }
  },
  computed: {
    $s() {
      return {
        state: name => {
          return this.$store.state[this.vuexModulePath[0]][
            this.vuexModulePath[1]
          ][name]
        },
        getters: name => {
          return this.$store.getters[[...this.vuexModulePath, name].join('/')]
        },
        actions: (name, payload) => {
          return this.$store.dispatch(
            [...this.vuexModulePath, name].join('/'),
            payload
          )
        }
      }
    },
    items() {
      return this.$s.getters('items') || []
    }
  },
  asyncData({ store, route }) {
    let tab = route.params.tab || 'all'
    let namespace = ['topics', tab]

    store.registerModule(namespace, topics)

    let page = store.state[namespace[0]][namespace[1]].page
    return store.dispatch(`${namespace.join('/')}/fetchTopics`, {
      tab: route.params.tab,
      page: 1
    })
  },
  created() {
    let tab = this.$route.params.tab || 'all'
    this.vuexModulePath = ['topics', tab]
  },
  activated() {
    this.setAppHeader({
      show: true,
      title: `CNode：${this.titles[this.$route.params.tab || 'all']}`,
      showMenu: true,
      showBack: false,
      showLogo: true
    })

    this.activateBottomNav('home')
  },
  beforeDestroy() {
    this.$store.unregisterModule(this.vuexModulePath)
  },
  methods: {
    ...mapActions('appShell/appHeader', ['setAppHeader']),
    ...mapActions('appShell/appBottomNavigator', [
      'showBottomNav',
      'activateBottomNav'
    ]),
    fetchTopics(payload) {
      return this.$s.actions('fetchTopics', payload)
    }
  },
  components: {
    [Topics.name]: Topics
  }
}
</script>

<style lang="stylus" scoped>
$text-color ?= rgba($material-theme.text-color, $material-theme.primary-text-percent);

.content {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  h2 {
    font-size: 46px;
    font-weight: 500;
  }

  h2, h4 {
    color: $text-color;
  }
}
</style>
