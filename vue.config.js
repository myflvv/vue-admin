module.exports = {
    publicPath: "./",
    outputDir: "dist",
    devServer: {
        proxy: {
            "/kong": {
                // target: "https://kong.gbicom.com:8443",
                target:"http://kong.d.gbicom.com",
                secure: false,
                ws: true,
                changeOrigin: true,
                pathRewrite: {'^/kong': ' '}
            },
            "/api": {
                target: "http://casher.d.gbicom.com",
                changOrigin: true,
                // pathRewrite: {'^/api': ' '}
            }
        }
    }
}