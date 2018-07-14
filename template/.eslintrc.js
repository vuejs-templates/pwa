// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  {{#if_eq lintConfig "standard"}}
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ['plugin:vue/essential', 'standard'],
  {{/if_eq}}
  {{#if_eq lintConfig "airbnb"}}
  extends: ['plugin:vue/essential', 'airbnb-base'],
  {{/if_eq}}
  {{#if_eq lintConfig "none"}}
  extends: ['plugin:vue/essential'],
  {{/if_eq}}
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  {{#if_eq lintConfig "airbnb"}}
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  {{/if_eq}}
  // add your custom rules here
  'rules': {
    {{#if_eq lintConfig "standard"}}
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    {{/if_eq}}
    {{#if_eq lintConfig "airbnb"}}
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    {{/if_eq}}
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
