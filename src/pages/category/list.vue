<template>
    <div>
        <el-card shadow="never" class="border-0">
            <ListHeader @create="handleCreate" @refresh="getData" />
            <el-tree :data="tableData" :props="{ label: 'name', children: 'child' }" v-loading="loading" node-key="id">
                <template #default="{ node, data }">
                    <div class="custom-tree-node">
                        <span>{{ data.name }}</span>
                        <div class="ml-auto">
                            <el-button type="primary" size="small" text :loading="data.goodsDrawerLoading"
                                @click="openGoodsDrawer(data)">推荐商品</el-button>
                            <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0"
                                @change="handleStatusChange($event, data)" />
                            <el-button type="primary" size="small" text @click.stop="handleEdit(data)">修改</el-button>
                            <el-popconfirm title="是否要删除该记录？" confirm-button-text="确认" cancel-button-text="取消"
                                @confirm="handleDelet(data.id)">
                                <template #reference>
                                    <el-button class=" px-1" text type="primary" size="small">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </div>
                </template>
            </el-tree>
            <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
                <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="form.name" placeholder="分类名称"></el-input>
                    </el-form-item>
                </el-form>
            </FormDrawer>
            <GoodsDrawer ref="GoodsDrawerRef"></GoodsDrawer>
        </el-card>
    </div>
</template>

<script setup>
import ListHeader from "~/components/ListHeader.vue"
import FormDrawer from "~/components/FormDrawer.vue"
import GoodsDrawer from "./components/GoodsDrawer.vue"
import { getCategoryList, createCategory, updateCategory, deleteCategory, updateCategoryStatus } from '~/api/category.js'
import { useInitTable, useInitForm } from "~/composables/useCommon.js"
import { ref } from "vue";

const GoodsDrawerRef = ref(null)

const {
    loading,
    tableData,
    getData,
    handleDelet,
    handleStatusChange,
} = useInitTable({
    getList: getCategoryList,
    //成功的回调
    onGetListSuccess: (res) => {
        tableData.value = res.map(o => {
            o.goodsDrawerLoading = false
            return o
        })

    },
    delete: deleteCategory,
    updateStatus: updateCategoryStatus
})

const {
    formDrawerRef,
    formRef,
    form,
    rules,
    drawerTitle,
    handleSubmit,
    handleCreate,
    handleEdit,
} = useInitForm({
    form: {
        rule_id: 0,
        menu: 0,
        name: "",
        condition: "",
        method: "GET",
        status: 1,
        order: 50,
        icon: "",
        frontpath: ""
    },
    getData,
    update: updateCategory,
    create: createCategory,
})

const openGoodsDrawer = (data) => {
    GoodsDrawerRef.value.open(data)
}

</script>

<style scoped>
.custom-tree-node {
    display: flex;
    flex: 1;
    align-items: center;
    font-size: 14px;
    padding-right: 8px;
}

.el-tree-node__content {
    padding: 20px 0;
}
</style>