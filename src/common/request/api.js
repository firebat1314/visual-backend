import http from './http'
import config from '@/common/config'

let def = {
    bundleid: config.bundleid,
    moduleid: config.moduleid,
    userid: config.userid,
    siteid: config.siteid
}

let apis = {
    /**
     * 获取所有页面 ajax?ugi=page&action=list&bundleid=mpwork.custompage&moduleid=
     */
    getPageList: params => http.get('/ajax?ugi=page&action=list', { ...def, ...params }),
    /**
     * 获取单个页面接口 ajax?ugi=page&action=get&bundleid=mpwork.custompage.base&moduleid=
     * vpageid 页面id
     */
    getPageInfo: params => http.get('/ajax?ugi=page&action=get', { ...def, ...params }),
    /**
     * 添加页面接口 ugi=page&bundleid=mpwork.custompage&action=add&moduleid=
     */
    addPage: params => http.get('/ajax?ugi=page&action=add', { ...def, ...params }, {
        headers: {
            // 'Content-Type': "application/json;charset=UTF-8"
        }
    }),
    /**
    * 保存页面 ugi=page&bundleid=mpwork.custompage&action=save&moduleid=
    */
    savePage: params => http.post('/ajax?ugi=page&action=save', { ...def, ...params }),
    /**
     * 删除页面接口 ugi=page&bundleid=mpwork.custompage&action=delete&moduleid=
     */
    delPage: params => http.get('/ajax?ugi=page&action=delete', { ...def, ...params }),
    /**
     * 获取背景音乐分类接口 
     */
    getBgmCategory: params => http.get('/ajax?ugi=bgmcategory&action=get', { ...def, ...params }),
    /**
     * 获取背景音乐列表接口 categoryid
     */
    getBgmList: params => http.get('/ajax?ugi=bgmcategory&action=list', { ...def, ...params }),
    /**
     * 获取导航接口 ugi=navigation&bundleid=mpwork.custompage&action=getNav&moduleid=
     */
    getNav: params => http.get('/ajax?ugi=navigation&action=getNav', { ...def, ...params }),
    /**
     * 更新导航接口 ajax?ugi=navigation&bundleid=mpwork.custompage&action=updateNav&moduleid=
     */
    updateNav: params => http.get('/ajax?ugi=navigation&action=updateNav', { ...def, ...params }),
    /**
     * 保存导航接口 ajax?ugi=navigation&bundleid=mpwork.custompage&action=saveNav&moduleid=
     */
    saveNav: params => http.post('/ajax?ugi=navigation&action=saveNav', { ...def, ...params }),
}

export default apis