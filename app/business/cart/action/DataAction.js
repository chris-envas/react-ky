/**
 * @fileOverview 购物车 处理数据action
 */
import * as types from './actionTypes';
import * as payTypes from 'kyBus/pay/action/actionTypes';
import Base64 from 'js-base64';
import { get, deleteFetch, post } from 'FetchData';
import { Cache, Urls } from 'kyCommon';
import { Toast } from 'uxComponent';
import { failLoading} from 'Utils';

/*
 * [getShoppingCar 获取购物车所有商品数据]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function getShoppingCar(ids, callback){
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = get(Urls.ShoppingCar + `?ids=${ids}`);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                dispatch({
                    type: types.SHOPPINGCAR,
                    shappingcar: res.data
                });
                if(callback && typeof callback === 'function'){
                    callback(res.data);
                }
            }
        }).catch((err) => {
            failLoading(err);
        });
    };
}

/*
 * [updateShoppingCar 更新购物车]
 * @param {[string]}   carId [传carId则更新数量]
 * @param {[boolean]}   groupFlag [是否套组]
 * @param {[string || number]}   num   [数量]
 * @param  {Function} callback [回调函数]
 */
export function updateShoppingCar(carId, groupFlag, num, callback) {
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const _data = {
            carId,
            groupFlag,
            num
        };
        const response = post(Urls.ShoppingCar, _data);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                if(callback && typeof callback === 'function'){
                    callback(res.data);
                }
            }
        }).catch((err) => {
            failLoading(err);
        });
    };
}

/*
 * [deteteShoppingCar 删除指定的商品]
 * @param  {[string]}   id       [商品ID]
 * @param  {Function} callback [description]
 */
export function deteteShoppingCar(id, callback){
    return (dispatch, getState) => {
        Toast.loading('正在删除...', 200);
        const response = deleteFetch(Urls.ShoppingCar + `/${id}`);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                if(callback && typeof callback === 'function'){
                    callback(res.data);
                }
            }
        }).catch((err) => {
            failLoading(err);
        });
    };
}

/*
 * [deteteShoppingCar 预览订单]
 * @param  {[string]}   carIds  [购物车id]
 * @param  {Function} callback [description]
 */
export function OrderPreview(carIds, callback){
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const _data = {
            carIds: carIds
        };
        const response = post(Urls.OrderPreview, _data);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                if(callback && typeof callback === 'function'){
                    callback(res.data);
                }
            }
        }).catch((err) => {
            failLoading(err);
        });
    };
}

/*
 * [OrderAdd 创建订单]
 * @param  {[Object]}   data  [参数集合]
 * @param  {Function} callback [description]
 */
export function OrderAdd(data, callback){
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = post(Urls.OrderAdd, data);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                dispatch({
                    type: payTypes.PAYMENT,
                    payment: res.data
                });
                if(callback && typeof callback === 'function'){
                    callback(res.data);
                }
            }
        }).catch((err) => {
            failLoading(err);
        });
    };
}

/*
 * [OrderAdd payeezy支付]
 * @param  {[Object]}   data  [参数集合]
 * @param  {Function} callback [description]
 */
export function Payeezy(data, callback){
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = post(Urls.Payeezy, data);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                // dispatch({
                //     type: types.PAYMENT,
                //     payment: res.data
                // });
                if(callback && typeof callback === 'function'){
                    callback(res.data);
                }
            }
        }).catch((err) => {
            failLoading(err);
        });
    };
}
