
let config = {
    // baseUrl: 'http://bjpost2020.maiget.com/mobile',
    apiUrl: 'http://test.weapi.org',
    bundleid: 'mpwork.custompage',
    moduleid: 'caee6ee2977a4e8ba15fd0decf9d9557',
    siteid: '2b7581c0e1cf464fb939c04f22c9de51',
    mapKey:'YAPBZ-3FEK3-NND35-Y7NT6-GWZYO-WFFYP'
}

// 环境的切换
if (process.env.NODE_ENV == 'development') {
    // config.apiUrl = 'http://test.weapi.org'
    // config.moduleid = 'caee6ee2977a4e8ba15fd0decf9d9557'
} 

export default config