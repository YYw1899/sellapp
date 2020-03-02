<template>
  <div id="shopcar" class="back" v-show="show">
    <transition name="slide-fade">
      <div class="list" v-show="show">
        <div class="title-div">
          <strong>点餐:{{shopCarlist.length}}份</strong>
          <span @click="del">清空</span>
        </div>
        <div v-for="(v,i) in shopCarlist" :key="i" class="list-div">
          <span>{{v.name}}</span>
          <span class="price">￥{{v.price}}</span>
          <div class="addnum">
            <button @click="shopcarchange(-1,i)">-</button>
            <span>{{v.num}}</span>
            <button @click="shopcarchange(1,i)">+</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    del () {
      this.$store.commit('changeAllNum', 0);
    },
    shopcarchange (n, i) {
      var i1 = 0, i2 = 0;
      for (let a1 = 0; a1 < this.namelist.length; a1++) {
        for (let a2 = 0; a2 < this.namelist[a1].foods.length; a2++) {
          if (this.namelist[a1].foods[a2].name == this.shopCarlist[i].name) {
            i1 = a1;
            i2 = a2;
            var num_new = this.shopCarlist[i].num + n;
            this.$store.commit('changeNum', { num_new, i1, i2 });
            return;
          }
        }
      }
    }
  },
  computed: {
    namelist () {
      return this.$store.state.namelist;
    },
    shopCarlist () {
      return [...new Set(this.$store.getters.shopCarlist)];
    },
    show () {
      return this.$store.state.show;
    }
  },
}
</script>

<style lang="less">
.back {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 50px;
  height: 100%;
  width: 100%;
  z-index: 2;
  .title-div {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    margin-bottom: 15px;
    padding: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    span {
    }
  }
  .list-div {
    padding: 10px 20px;
    margin-bottom: 10px;
    span {
      &:first-child {
        width: 150px;
      }
    }
    display: flex;
    justify-content: space-around;
    .price {
      color: red;
    }
    .addnum {
      span {
        width: 20px;
        line-height: 20px;
        display: inline-block;
        text-align: center;
        border: 0;
      }
      button {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        border: 2px solid #00a0dc;
        background-color: #fff;
        text-align: center;
        padding: 0;
        margin: 0;
        &:nth-of-type(2) {
          background-color: #00a0dc;
          color: #fff;
        }
      }
    }
  }
  .list {
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 50px;
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(300px);
    opacity: 0;
  }
}
</style>