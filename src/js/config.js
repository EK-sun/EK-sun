require.config({
    paths: {
        'jquery': './jquery-3.3.1',
        'http':'./httpclient',
        'fangDaJing':'./magnifying'
    },
    shim:{
        'http':['jquery'],
    }
})