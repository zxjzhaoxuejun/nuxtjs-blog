<template>
  <div class="emoji-mode">
    <div v-for="(item,index) in emojiDataList" :key="index" class="emoji-item" @click="chooseEmoji(item)">
      {{ item }}
    </div>
  </div>
</template>

<script>
import emojiData from './../config/emoji.json'
export default {
  data () {
    return {
      emojiDataList: emojiData.data.split(',')
    }
  },
  methods: {
    chooseEmoji (item) {
      console.log(item)
      this.$emit('onChange', item)
    }
  }
}
</script>

<style scoped lang="scss">
.emoji-mode{
    display: flex;
    flex-wrap: wrap;

    .emoji-item{
        padding: 2px;
        cursor: pointer;
        line-height: 20px;
    }
}
</style>
