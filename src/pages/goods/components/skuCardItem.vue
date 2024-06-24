<template>
    <div class="flex gap-2" v-loading="loading">
        <el-tag v-for="(tag, index) in item.goodsSkusCardValue" :key="index" closable :disable-transitions="false"
            @close="handleClose(tag)" effect="plain">
            <el-input class="w-20 ml-[-10px]" v-model="tag.text" placeholder="选项值" size="small"
                @change="handleChange($event, tag)"></el-input>
        </el-tag>
        <el-input class="w-20" v-if="inputVisible" ref="InputRef" v-model="inputValue" size="small"
            @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
        <el-button v-else class="button-new-tag" size="small" @click="showInput">
            添加选项值
        </el-button>
    </div>
</template>

<script setup>
import { goodsId, initSkuCardList, initSkusCardItem } from '~/composables/useSku.js'
import { ElInput } from 'element-plus'

const props = defineProps({
    skuCardId: [Number, String]
})
const {
    item,
    inputValue,
    inputVisible,
    InputRef,
    handleClose,
    showInput,
    handleInputConfirm,
    loading,
    handleChange,
} = initSkusCardItem(props.skuCardId)
console.log(item)
</script>

<style lang='stylus' scoped></style>