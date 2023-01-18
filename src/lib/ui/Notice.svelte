<script>
  import Icon from "$lib/ui/Icon.svelte";
</script>

<div class="notice-container">
  <div class="notice-icon">
    <Icon type="error"/>
  </div>
  <slot/>
</div>

<style>
  .notice-container {
    position: relative;
    display: block;
    padding: 12px 12px 12px 44px;
    background-color: rgb(245,245,246);
    border-left: 4px solid rgb(112,112,113);
    margin: 30px 0 4px;
    font-size: 1rem;
  }
  .notice-icon {
    position: absolute;
    font-size: 1.2em;
    transform: translate(-30px, 3px);
  }
</style>