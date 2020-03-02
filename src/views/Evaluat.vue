<template>
  <div id="evaluat">
    <ul class="content">
      <!-- 总评价 -->
      <div class="allevaluat">
        <div class="leftbox">
          <strong>{{data2.score}}</strong>
          <p>综合评分</p>
          <p>高于周边商家{{data2.rankRate}}%</p>
        </div>
        <div class="rightbox">
          <p>口味评分
            <img src="../assets/imges/star24_on@2x.png" alt="" v-for="(v) in  allevaluat.foods" :key="v.id">
            <img src="../assets/imges/star24_half@2x.png" v-show="data2.foodScore%1!=0">
            <img src="../assets/imges/star24_off@2x.png" alt="" v-show="Math.ceil(data2.foodScore)==1" v-for="(va0) in 4" :key="va0.id">
            <img src="../assets/imges/star24_off@2x.png" alt="" v-show="Math.ceil(data2.foodScore)==2" v-for="(val) in 3" :key="val.id">
            <img src="../assets/imges/star24_off@2x.png" alt="" v-show="Math.ceil(data2.foodScore)==3" v-for="(va2) in 2" :key="va2.id">
            <img src="../assets/imges/star24_off@2x.png" alt="" v-show="Math.ceil(data2.foodScore)==4" v-for="(va3) in 1" :key="va3.id">
            <span>{{data2.foodScore}}</span>
          </p>
          <p>服务态度
            <img src="../assets/imges/star24_on@2x.png" alt="" v-for="(v) in allevaluat.serves" :key="v.id">
            <img src="../assets/imges/star24_half@2x.png" v-show="data2.serviceScore%1!=0">
            <img src="../assets/imges/star24_off@2x.png" alt="" v-show="Math.ceil(data2.serviceScore)==1" v-for="(va0) in 1" :key="va0.id">
            <img src="../assets/imges/star24_off@2x.png" alt="" v-show="Math.ceil(data2.serviceScore)==2" v-for="(val) in 2" :key="val.id">
            <img src="../assets/imges/star24_off@2x.png" alt="" v-show="Math.ceil(data2.serviceScore)==3" v-for="(va2) in 3" :key="va2.id">
            <img src="../assets/imges/star24_off@2x.png" alt="" v-show="Math.ceil(data2.serviceScore)==4" v-for="(va3) in 4" :key="va3.id">
            <span>{{data2.serviceScore}}</span>
          </p>
          <p>送达时间 {{data2.deliveryTime}}分钟</p>
        </div>
      </div>
      <!-- 分割 -->
      <div class="hr"> </div>
      <!-- 满意不满意 -->
      <div class="all">
        <div class="allsum">全部{{allevaluat.all}}</div>
        <div class="yes">满意{{allevaluat.scoretypeok}}</div>
        <div class="no">不满意{{allevaluat.scoretypeno}}</div>
      </div>
      <!-- 评价列表 -->
      <div class="list">
        <!-- title -->
        <div class="listtitle">
          <p><button>√</button>只看有内容的评价</p>
        </div>
        <!-- listcontent -->
        <div class="listcontent" v-for="(v,i) in data" :key="i">
          <div class="box">
            <img :src="v.avatar" alt="" class="head">
            <div>
              <p>{{v.username}}<span>{{date(v.rateTime)}}</span></p>
              <p>
                <img src="../assets/imges/star24_on@2x.png" alt="" v-for="(v) in Math.floor(v.score)" :key="v.score">
                <img src="../assets/imges/star24_half@2x.png" v-show="v.score%1!=0">
                <img src="../assets/imges/star24_off@2x.png" alt="" v-show="v.score==1" v-for="(va,index) in 4" :key="index">
                <img src="../assets/imges/star24_off@2x.png" alt="" v-show="v.score==2" v-for="(va) in 3" :key="va.score">
                <img src="../assets/imges/star24_off@2x.png" alt="" v-show="v.score==3" v-for="(va) in 2" :key="va.score">
                <img src="../assets/imges/star24_off@2x.png" alt="" v-show="v.score==4" v-for="(va) in 1" :key="va.score">
                {{v.deliveryTime}}分钟送达
              </p>
              <p>{{v.text}}</p>
              <p>
                <img src='../assets/imges/ok.png' v-show="v.rateType==1">
                <img src='../assets/imges/no.png' v-show="v.rateType==0">
                <span v-for='v in v.recommend' :key="v" class="ok">{{v}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import { evaluat } from '../../api/apis'
import { getseller } from '../../api/apis'
import Bscroll from 'better-scroll';
export default {
  data () {
    return {
      allevaluat: {
        scoretypeok: 0,
        scoretypeno: 0,
        all: 0,
        foods: 0,
        serves: 0,
      },
      data: [],
      data2: '',
    }
  },
  methods: {
    date (d) {
      var date = new Date(d);
      var year = date.getFullYear();
      var mouth = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minite = date.getMinutes();
      var seconds = date.getSeconds();
      var time = year + '-' + mouth + '-' + day + ' ' + hours + ':' + minite + ':' + seconds;
      return time;
    },

  },
  mounted () {
    new Bscroll(document.querySelector('#evaluat'));
  },
  created () {
    getseller().then(val => {
      this.data2 = val.data.data;
      this.allevaluat.foods = Math.floor(this.data2.foodScore);
      this.allevaluat.serves = Math.floor(this.data2.serviceScore);
      // console.log(Math.floor(this.data2.foodScore))
    })
    evaluat().then(res => {
      this.data = res.data.data;
      this.data.forEach(v => {
        v.rateType == 0 ? this.allevaluat.scoretypeno++ : this.allevaluat.scoretypeok++;
        this.allevaluat.all++;
      });
    });
    if (this.score % 1 != 0) {
      this.num = 4;
    }

  },
}
</script>

<style lang="less">
#evaluat {
  flex: 1;
  overflow: auto;
  ul {
    margin: 0;
    padding: 0;
  }
  .allevaluat {
    display: flex;
    justify-content: space-around;
    padding: 20px;
    padding-right: 0;
    color: #23272a;
    img {
      width: 12px;
      margin-right: 3px;
    }
    .leftbox {
      text-align: center;
      strong {
        font-size: 22px;
        color: #f99c00;
      }
      p {
        margin: 5px;
        font-size: 14px;
        &:last-child {
          font-size: 12px;
          color: #969aa3;
        }
      }
    }
    .rightbox {
      p {
        margin: 5px;
        font-size: 14px;
      }
    }
  }
  .hr {
    height: 20px;
    background-color: #f4f5f7;
    border-bottom: 1px solid #dadde2;
    border-top: 1px solid #dadde2;
  }
  .all {
    display: flex;
    padding: 20px;
    div {
      width: 70px;
      line-height: 40px;
      text-align: center;
      border-radius: 3px;
      margin-right: 10px;
      &:first-child {
        background-color: #00a0dc;
      }
      &:nth-child(2) {
        background-color: #ccecf7;
      }
      &:last-child {
        background-color: #eaebed;
      }
    }
  }
  .list {
    .listtitle {
      padding: 20px;
      border-bottom: 2px solid #e5e6e8;
      padding-top: 0;
      p {
        border-top: 1px solid #e5e6e8;
        margin: 0;
        line-height: 30px;
        padding-top: 20px;
        color: #4f5458;
        button {
          width: 20px;
          height: 20px;
          border-radius: 10px;
          padding: 0;
          border: 0;
          color: #fff;
          margin-right: 5px;
        }
      }
    }
    .listcontent {
      padding: 20px;
      .box {
        display: flex;
        border-bottom: 1px solid #dadde2;
        font-size: 12px;
        // justify-content: space-between;
        .head {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin-right: 5px;
          // background-color: #000;
        }
        div {
          flex: 1;
          p {
            margin: 2px;
            &:first-child {
              display: flex;
              justify-content: space-between;
            }
            &:nth-child(2) {
              img {
                width: 14px;
                margin-right: 3px;
                margin-top: -4px;
                vertical-align: middle;
              }
            }
            &:last-child {
              margin-bottom: 20px;
              display: flex;
              align-items: center;
              img {
                width: 16px;
                margin-right: 5px;
              }
            }
            &:nth-child(3) {
              font-size: 14px;
              color: #2f3640;
            }
          }
          .ok {
            font-size: 12px;
            display: inline-block;
            width: 40px;
            border: 1px solid #dadde2;
            margin-right: 5px;
            color: #dadde2;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>