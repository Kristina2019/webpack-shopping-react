module.exports = {
    parser: 'sugarss',
    plugins: {
        'postcss-import': {}, 
        'postcss-preset-env': {
            features: {
                'nesting-rules': true, 
                'custom-properties': true, 
                'custom-media-queries': true
            }
        }, 
        'cssnano': {}
    }
}