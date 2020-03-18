<template>
    <div id="container">
        <h1>{{initData}}</h1>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                initData: 'Hola, vue!'
            }
        }
    }
</script>
<style scoped>
#container {
    color: red;
    text-align: center;
}
</style>