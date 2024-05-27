<template>
    <FormDrawer ref="formDrawerRef" title="设置商品详情" @submit="submit" destory-on-close>
        <el-form :model="form">
            <el-form-item label="轮播图">
                <Editor v-model="form.content" />
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { readGoods, setGoodsBanner, updateGoods } from '~/api/goods.js'
import FormDrawer from '~/components/FormDrawer.vue'
import Editor from '~/components/Editor.vue'
import { toast } from "~/composables/util.js"
const formDrawerRef = ref(null)
const form = reactive({
    content: '',
})
const goodsId = ref(0)
const emit = defineEmits(['reloadData'])
const submit = () => {
    formDrawerRef.value.showLoading()
    updateGoods(goodsId.value, form).then((res) => {
        toast('设置商品详情成功')
        formDrawerRef.value.close()
        emit('reloadData')
    })
        .finally(() => {
            formDrawerRef.value.hideLoading()
        })
}
const open = (row) => {
    goodsId.value = row.id
    row.contentLoading = true

    readGoods(goodsId.value).then((res) => {
        form.content = res.content
        formDrawerRef.value.open()
        console.log(form.content)
    })
        .finally(() => {
            row.contentLoading = false
        })
}

defineExpose({
    open
})

</script>

<style lang='stylus' scoped></style>