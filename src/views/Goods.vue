<template>
  <div id="goods">
    <!-- left -->
    <div class="left">

      <ul class="content">
        <p v-for="(v,i) in name" :key="i" :class="{bcg:num2==i}" @click="leftclick(i)">
          <img src="../assets/imges/decrease_1@2x.png" style="width:10px;" v-show="v.type==1">
          <img src="../assets/imges/discount_1@2x.png" style="width:10px;" v-show="v.type==2">
          {{v.name}}
        </p>
        <div></div>
      </ul>
    </div>
    <!-- right -->
    <div class="right wrapper ">
      <ul class="content">
        <!-- 获取分类 -->
        <div v-for="(v,i1) in name" :key="i1" :id="i1">
          <p>{{v.name}}</p>
          <!-- 获取分类中美食种类 -->
          <div class="content1" v-for="(val,i2) in v.foods" :key="i2">
            <div class="box">
              <img :src="val.image">
              <div class="content_box">
                <h6>{{val.name}}</h6>
                <span>月销售{{val.sellCount}}份</span><span>好评率{{val.rating}}%</span>
                <div class="price">
                  <strong>
                    ￥{{val.price}}
                    <span style="color:#ccc; text-decoration:line-through;" v-show="val.oldPrice!=0">￥{{val.oldPrice}}</span>
                  </strong>
                  <div>
                    <!-- 减 -->
                    <button v-show="val.num>0" class="reduce" @click="change(-1,i1,i2)">-</button>
                    <span v-show="val.num>0">{{val.num}}</span>
                    <!-- 加 -->
                    <button class="addnum" @click="change(1,i1,i2)">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
      <div class="fixed">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { getgoods } from '../../api/apis';
import Bscroll from 'better-scroll';
export default {
  data () {
    return {
      num2: 0,
    }
  },
  methods: {
    change (n, i1, i2) {
      var num = this.name;
      var num_new = num[i1].foods[i2].num + n;
      this.$store.commit('changeNum', { num_new, i1, i2 });
    },
    leftclick (n) {
      this.num2 = n;
      this.rightscroll.scrollToElement(document.getElementById(n), 500);
    },
  },
  created () {
    getgoods().then(res => {
      this.$store.commit('changeNamelist', res.data.data);
      // console.log(res.data.data)
    })
  },
  computed: {
    name () {
      return this.$store.state.namelist;
    },
    getDivsum () {
      var arr = [];
      var sum = 0;
      for (let i = 0; i < this.name.length; i++) {
        var height = document.getElementById(i).offsetHeight;
        arr.push({ min: sum, max: sum + height, index: i });
        sum += height;
      }
      return arr;
    },
  },
  mounted () {
    this.leftscroll = new Bscroll(document.querySelector('.left'), {
      click: true,
    });
    this.rightscroll = new Bscroll(document.querySelector('.right'), {
      click: true,
      probeType: 3,
    });
    this.rightscroll.on('scroll', ({ y }) => {
      for (let i = 0; i < this.getDivsum.length; i++) {
        if (this.getDivsum[i].min <= Math.abs(y) && Math.abs(y) < this.getDivsum[i].max) {
          this.num2 = this.getDivsum[i].index;
          return;
        }
      }
    })
  },
}
</script>

<style lang="less">
.fixed {
  position: fixed;
  bottom: 50px;
  left: 0;
}
#goods {
  flex: 1;
  display: flex;
  .left {
    width: 70px;
    background-color: #f4f5f7;
    overflow: auto;
    p {
      font-size: 12px;
      text-align: center;
      padding: 10px;
      border-bottom: 1px solid #dadde2;
      margin: 0;
    }
    ul {
      padding: 0;
      padding-top: 20px;
      margin: 0;
      div {
        height: 30px;
      }
    }
  }
  .right {
    flex: 1;
    overflow: auto;
    ul {
      padding: 0;
      margin-top: 0;
    }
    p {
      padding: 0;
      margin: 0;
      line-height: 20px;
      height: 20;
      border-left: 2px solid #dadde2;
      background-color: #f4f5f7;
      font-size: 12px;
      color: #969ba1;
    }
    .content1 {
      .box {
        display: flex;
        border-bottom: 1px solid #f4f5f7;
        padding-bottom: 20px;
        margin: 20px;
        &:last-child {
          margin-bottom: 0;
        }
        img {
          width: 64px;
          height: 50px;
          margin-right: 10px;
        }
        .content_box {
          flex: 1;
          h6 {
            margin: 0;
          }
          span {
            font-size: 12px;
            color: #d4d5d7;
          }
          .price {
            display: flex;
            justify-content: space-between;
            width: 100%;
            strong {
              color: red;
            }
            div {
              button {
                width: 20px;
                height: 20px;
                border-radius: 10px;
                border: 2px solid #00a0dc;
                background-color: #fff;
                text-align: center;
                padding: 0;
                margin: 0;
              }
              .addnum {
                background-color: #00a0dc;
                color: #fff;
              }
              span {
                width: 20px;
                line-height: 20px;
                display: inline-block;
                text-align: center;
                border: 0;
              }
            }
          }
        }
      }
    }
  }
  .bcg {
    background-color: #fff;
  }
}
</style>