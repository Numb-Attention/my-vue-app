<template>
    <el-dialog title="商品选择" v-model="dialogVisiable" width="80%" destory-on-close>
        <el-table :data="tableData" stripe style="width: 100%;height: 300px;" v-loading="loading" ref="multipleTableRef"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="商品" min-width="20%">
                <template #default="{ row }">
                    <div class="flex items-center">
                        <el-image class="mr-3 rounded" :src="row.cover" style="width: 50px; height: 50px" fit="cover"
                            :lazy="true"></el-image>
                        <div class="flex-1">
                            <p>{{ row.title }}</p>
                            <p class="text-gray-400 mb-1 text-xs">
                                分类：{{ row.category?.name || '未分类' }}
                            </p>
                            <p class="text-gray-400 mb-1">
                                创建时间：{{ row.create_time }}
                            </p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="总库存" width="90" min-width="10%" prop="stock" align="center">
            </el-table-column>
            <el-table-column label="价格（元）" width="150" align="center">
                <template #default="{ row }">
                    <span class="text-rose-500">￥{{ row.min_price }}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="text-gray-500 text-xs">{{ row.min_oprice }}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev,pager, next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>
        <template #footer>
            <span>
                <el-button @click="close" style="margin-right: 10px;">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { getGoodsList } from '~/api/goods';
import { useInitTable } from '~/composables/useCommon.js';
const dialogVisiable = ref(false);

const {
    searchForm,
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleSelectionChange,
    multipleTableRef,
    multiSelectionIds,
} = useInitTable({
    searchForm: {
        title: '',
        tab: 'all',
        category_id: null,
    },
    getList: getGoodsList,
    onGetListSuccess: (res) => {
        tableData.value = res.list
        console.log(tableData.value);
        total.value = res.totalCount;
    },
});


const callBackFunction = ref(null)
const open = (callback = null) => {
    callBackFunction.value = callback
    dialogVisiable.value = true;
}

const close = () => {
    dialogVisiable.value = false;
}
const submit = () => {
    if (typeof callBackFunction.value === 'function') {
        callBackFunction.value(multiSelectionIds.value)
    }
    close()
}


defineExpose({
    open
})

</script>

<style scoped></style>