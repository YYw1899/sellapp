import axios from 'axios';

var req = axios.create({
  baseURL: 'http://192.168.0.100:3000',
  timeout: 10000,
});
// 获取商家信息
export function getseller () {
  return req.get('/api/seller')
}
// 商品列表
export function getgoods () {
  return req.get('/api/goods')
}
// 评价
export function evaluat () {
  return req.get('/api/ratings')
}