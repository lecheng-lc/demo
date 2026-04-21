<template>
    <div class="a-component">
    我是组件A
    </div>
</template>
<script>
export default {
    name: 'A',  
    created(){
        console.log('组件A创建了');
    }
}
</script>