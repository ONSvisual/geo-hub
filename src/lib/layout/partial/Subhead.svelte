<script>
	export let margin = false;
</script>

<p class="ons-page__container--narrow page-neutral-intro__content" class:bottom-margin={margin}>
	<slot/>
</p>

<style>
	.page-neutral-intro__content {
		font-size: 22px;
		padding: 2px 0 0;
		line-height: 1.4;
		max-width: 800px;
		margin: -8px auto -12px 0;
	}
	.bottom-margin {
		margin-bottom: 24px;
	}
</style>