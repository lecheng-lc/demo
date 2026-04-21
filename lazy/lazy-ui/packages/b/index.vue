<template>
    <div class="b-component">
        我是组件B
    </div>
</template>
<script>
export default {
    name: 'B',  
    created(){
        console.log('组件B创建了');
    }
}
</script>
