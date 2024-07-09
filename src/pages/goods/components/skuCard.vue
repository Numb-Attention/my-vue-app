<template>
    <el-form-item label="规格选项" v-loading="bodyLoading">
        <el-card shadow="never" class="w-full mb-3" v-for="(item, index) in sku_card_list" :key="item.id"
            v-loading="item.loading">
            <template #header>
                <div class="flex justify-center items-center">
                    <el-input v-model="item.text" placeholder="规格名称" style="width: 200px;" @change="handleUpdate(item)">
                        <template #append>
                            <el-icon>
                                <more @click="handleChooseSku(item)" class="cursor-pointer" />
                            </el-icon>
                        </template>
                    </el-input>
                    <el-button class="ml-auto" size="small" @click="sortCard('up', index)">
                        <el-icon>
                            <Top />
                        </el-icon>
                    </el-button>
                    <el-button size="small" @click="sortCard('down', index)">
                        <el-icon>
                            <Bottom />
                        </el-icon>
                    </el-button>
                    <el-popconfirm title="是否要删除该选项?" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(item)">
                        <template #reference>
                            <el-button size="small">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-popconfirm>
                </div>
            </template>
            <skuCardItem :skuCardId="item.id" />
        </el-card>
        <el-button type="success" size="small" :loading="buttonLoading" @click="addSkuCardEvent">
            添加规格
        </el-button>

    </el-form-item>
    <ChooseSku ref="chooseSkuRef" />
</template>

<script setup>
import skuCardItem from './skuCardItem.vue';
import ChooseSku from '~/components/ChooseSku.vue';
import { ref } from 'vue';
import {
    sku_card_list,
    addSkuCardEvent,
    buttonLoading,
    handleUpdate,
    sortCard,
    handleDelete,
    bodyLoading,
    handleChooseSetGoodsSkusCard,
} from '~/composables/useSku.js'
const chooseSkuRef = ref(null)
// onMounted(() => {
//     console.log(sku_card_list.value)
// })
const handleChooseSku = (item) => {
    chooseSkuRef.value.open((value) => {
        console.log(value)
        handleChooseSetGoodsSkusCard(item.id, {
            name: value.name,
            value: value.list
        })
    })
}
</script>

<style scoped>
.el-card__header {
    @apply !p-2 bg-gray-50;
}
</style>