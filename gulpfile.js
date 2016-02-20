var gulp = require('gulp');
var path = require('path');
var gulpTasks = require('grommet/utils/gulp/gulp-tasks');

var opts = {
  dist: path.resolve(__dirname, 'dist'),
  copyAssets: [
    'README.md',
    'package.json',
    {
      asset: 'src/**',
      babel: true
    }
  ],
  jsAssets: [
    'src/*.js'
  ],
  mainJs: 'src/index.js',
  webpack: {
    output: {
      filename: 'grommet-native.min.js',
      libraryTarget: 'var',
      library: 'GrommetNative'
    },
    resolve: {
      modulesDirectories: ['node_modules', 'src']
    },
    externals: {
      'react': 'React',
      'grommet': 'grommet'
    }
  // },
  // jsLoader: {
  //   test: /.js$/,
  //   include: [
  //     path.resolve(__dirname, 'src'),
  //     path.resolve(__dirname, 'node_modules/react/lib'),
  //     path.resolve(__dirname, 'node_modules/react-native/Libraries/react-native'),
  //     path.resolve(__dirname, 'node_modules/react-native-navbar')
  //   ],
  //   loader: 'react-hot!babel-loader?presets[]=es2015,presets[]=react,plugins[]=transform-object-rest-spread'
  }
};

gulpTasks(gulp, opts);

gulp.task('dev', function () {
  console.error('Running "gulp dev" here is not supported. Please use "gulp dist".');
});
