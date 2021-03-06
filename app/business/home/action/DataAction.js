/**
 * @fileOverview 首页 处理数据action
 */
import Qs from 'qs';
import * as types from './actionTypes';
import { getHasFetch, post, get, putFetch} from 'FetchData';
import { Urls } from 'kyCommon';
import { Toast } from 'uxComponent';
import { failLoading} from 'Utils';

/*
 * [getHome 获取首页数据]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function getHome(callback) {
    return (dispatch, getState) => {
        // Toast.loading('加载中...', 200);
        const response = getHasFetch(Urls.Home);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                dispatch({
                    type: types.HOME,
                    home: res.data
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
 * [addShoppingCar 加入购物车]
 * @param {[string]}   productId [传productId则累加数量，传carId则更新数量]
 * @param {[boolean]}   groupFlag [是否套组]
 * @param {[string || number]}   num   [数量]
 * @param  {Function} callback [回调函数]
 */
export function addShoppingCar(productId, groupFlag, num, callback) {
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const _data = {
            productId,
            groupFlag,
            num
        };
        const response = post(Urls.ShoppingCar, _data);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                // dispatch({
                //     type: types.HOME,
                //     home: res.data
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
                // dispatch({
                //     type: types.HOME,
                //     home: res.data
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

/*
 * [getProductInfoId 根据id获取商品详情]
 * @param {[string]}   id [商品id]
 * @param {Function} callback [回调函数]
 */
export function getProductInfoId(id, callback) {
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = getHasFetch(Urls.ProductInfoId + '/' + id);
        response.then((result) => {
            const res = result.data;
            if(!res.success){
                Toast.info(res.message, 2)
            }else{
                Toast.hide();
                dispatch({
                    type: types.PRODUCTINFOID,
                    product: res.data
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
