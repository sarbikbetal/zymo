<template functional>
  <div class="is-divider-vertical" data-content="Or"></div>
</template>

<script>
export default {
    name: "Divider",
    functional: true,
}
</script>

<style>
.is-divider,
.is-divider-vertical {
  display: block;
  width: 100%;
  position: relative;
  border-top: 0.1rem solid #dbdbdb;
  height: 0.1rem;
  margin: 2rem 0;
  text-align: center;
}

.is-divider[data-content]::after,
.is-divider-vertical[data-content]::after {
  background: white;
  color: #b5b5b5;
  content: attr(data-content);
  display: inline-block;
  font-size: 0.75rem;
  padding: 0.4rem 0.8rem;
  -webkit-transform: translateY(-1.1rem);
  -ms-transform: translateY(-1.1rem);
  transform: translateY(-1.1rem);
  text-align: center;
}

@media screen and (min-width: 769px), print {
  .is-divider-vertical {
    display: block;
    flex: none;
    width: auto;
    height: auto;
    padding: 2rem;
    margin: 0;
    position: relative;
    border-top: none;
    min-height: 2rem;
  }
  .is-divider-vertical::before {
    border-left: 0.1rem solid #dbdbdb;
    bottom: 1rem;
    content: "";
    display: block;
    left: 50%;
    position: absolute;
    top: 1rem;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .is-divider-vertical[data-content]::after {
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 0.1rem;
    -webkit-transform: translateY(-50%) translateX(-50%);
    -ms-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
  }
}
</style>