<template>
	<div class="hello">
		<h1>{{msg}}</h1>
	</div>
</template>

<script>
export default {
	name: 'home',
	data{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
		return {
			msg: 'Welcome to Your Vue.js PWA'{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
		}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
	}{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
	color: map-get($colors, red);
	font-size: em(32);
}
</style>
