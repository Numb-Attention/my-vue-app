<template>
    <div>
        {{ d.num.toFixed(0) }}
    </div>
</template>
<script setup>
    import { reactive,watch } from "vue";
    import gsap from "gsap"

    const props = defineProps({
        value:{
            type:Number,
            default:0
        }
    })
    //收到父组件的值
    const d =reactive({
        num : 0
    })
    function dataLoading(){
        gsap.to(d,{
            duration:0.5,
            num:props.value
        })
    }
    dataLoading()
    watch(()=> props.value,()=>dataLoading())
    //若数据发生变化，则重新执行
</script>