Skip to content
 
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@YYw1899 
Learn Git and GitHub without any code!
Using the Hello World guide, you’ll start a branch, write comments, and open a pull request.

Read the guide

YYw1899
/
sellapp
 Unwatch 1
 Star 0  Fork 0
 Code  Issues 0  Pull requests 0  Actions  Projects 0  Wiki  Security  Insights  Settings
Branch: master 
sellapp/src/views/Goods.vue
Find file Copy path
Fetching contributors…

182 lines (179 sloc)  4.18 KB
RawBlameHistory
    
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
    <div class="right">
      <ul class="content">
        <div v-for="(v,i) in name" :key="i" :id="i" @click="rightclick(i)">
          <p>{{v.name}}</p>
          <div class="content1" v-for="(val,index) in v.foods" :key="index">
            <div class="box">
              <img :src="val.image">
              <div class="content_box">
                <h6>{{val.name}}</h6>
                <span>月销售{{val.sellCount}}份</span><span>好评率{{val.rating}}%</span>
                <div class="price">
                  <strong>￥{{val.price}}</strong>
                  <div>
                    <!-- 减 -->
                    <button v-show="num<1" class="reduce">-</button>
                    <span v-show="num<1">{{num}}</span>
                    <button class="addnum">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getgoods } from '../../api/apis';
import Bscroll from 'better-scroll';
export default {
  data () {
    return {
      name: '',
      num: 0,
      num2: 0,
    }
  },
  methods: {
    leftclick (n) {
      this.num2 = n;
      this.rightscroll.scrollToElement(document.getElementById(n), 500);
    },
    rightclick (n) {
      this.num2 = n;
      this.leftscroll.scrollToElement(document.getElementById(n), 500);
    }
  },
  created () {
    getgoods().then(res => {
      this.name = res.data.data;
      console.log(res.data)
    })
  },
  mounted () {
    this.leftscroll = new Bscroll(document.querySelector('.left'), {
      click: true,
    });
    this.rightscroll = new Bscroll(document.querySelector('.right'), {
      click: true,
    });
  },
}
</script>

<style lang="less">
#goods {
  border-top: 2px solid #dadde2;
  display: flex;
  flex: 1;
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
© 2020 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
