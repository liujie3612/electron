<template>
  <div class="join">
    <div class="title">{{title}}</div>
    <select v-model="selected">
      <option v-for="option in options" v-bind:value="option.value">
        {{ option.text }}
      </option>
    </select>
    <button id='join-btn' class="btn join-btn" @click="goMeeting">加 入</button>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      title: '请选择一个房间',
      selected: 'wilddogVideoTest',
      options: [
        { text: 'wilddogVideoTest', value: 'wilddogVideoTest' },
        { text: '美女与野兽', value: '美女与野兽' },
        { text: '速度与激情', value: '速度与激情' },
        { text: '大话西游', value: '大话西游' },
        { text: '柳暗花明又一村', value: '柳暗花明又一村' }
      ]
    }
  },
  methods: {
    goMeeting() {
      // const url = encodeURI('/meeting?room=' + this.selected);
      const url = '/meeting?room=' + this.selected
      this.$router.push({
        path: url
      });
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scope>
.join {
  width: 300px;
  margin: 300px auto;
  text-align: center;
  .title {
    font-size: 26px;
    margin-bottom: 30px;
  }
  select {
    display: block;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    width: 260px;
    height: 34px;
    line-height: 34px;
    padding-left: 10px;
    letter-spacing: 1px;
    background-color: #fff;
    margin: 0 auto;
    &:focus {
      outline: 0;
    }
  }
  .btn {
    padding: 0;
    display: inline-block;
    width: 160px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    border-radius: 3px;
    border: 1px solid #cd461e;
    color: #fff;
    background-color: #e6501e;
    cursor: pointer;
    margin-top: 30px;
    font-size: 14px;
    &:hover {
      background-color: #eb734b;
      border-color: #dc5528;
    }
    &:active {
      background-color: #f0916e;
      border-color: #e67855;
    }
    &:focus {
      outline: 0;
    }
  }
}

</style>
