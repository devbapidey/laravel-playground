const mix = require('laravel-mix');
require('laravel-mix-workbox');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js').vue()
    .postCss('resources/css/app.css', 'public/css', [
        require('postcss-import'),
        require('tailwindcss'),
    ])
    .generateSW({
        // Cleanup Outdated Caches
        cleanupOutdatedCaches: true,

        // Do not precache images
        exclude: [/\.(?:png|jpg|jpeg|svg)$/],

        runtimeCaching: [
            {
                // Match any request that ends with .png, .jpg, .jpeg or .svg.
                urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

                // Apply a cache-first strategy.
                handler: 'CacheFirst',

                options: {
                    // Use custom cache name
                    cacheName: 'images',

                    // Only cache 10 images
                    expiration: {
                        maxEntries: 10,
                    },
                },
            },
        ],

        skipWaiting: true
        })
    .webpackConfig(require('./webpack.config'));

if (mix.inProduction()) {
    mix.version();
}
