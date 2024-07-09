<template>
    <el-card shadow="never" class="border-0">
        <!-- 搜索 -->
        <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
            <SearchItem label="关键词">
                <el-input v-model="searchForm.title" placeholder="商品标题" clearable></el-input>
            </SearchItem>
        </Search>
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column type="expand">
                <template #default="{ row }">
                    <div class="flex pl-18">
                        <el-avatar :size="50" shape="circle" :src="row.user.avatar" fit="fill" class="mr-3"></el-avatar>
                        <div class="flex-1">
                            <h6 class="flex items-center">
                                {{ row.user.nickname || row.user.username }}
                                <small class="text-gray-400 ml-2">{{ row.review_time }}</small>
                                <el-button class="ml-auto" v-if="!row.textareaEdit && !row.extra" size="small"
                                    @click="openTextarea(row)">回复</el-button>
                            </h6>
                            {{ row.review.data }}
                            <div class="py-2">
                                <el-image v-for="(item, index) in row.review.image" :key="index" :src="item" fit="fill"
                                    :lazy="true" style="width: 100px;height: 100px;" class="rounded"></el-image>

                            </div>
                            <div class="mt-3 bg-gray-100 p-3 rounded" v-for="(item, index) in row.extra" :key="index">
                                <h6 class="flex font-bold">
                                    客服
                                    <el-button type="info" size="small" class="ml-auto" @click="">修改</el-button>
                                </h6>
                                <p>{{ item.data }}</p>
                            </div>
                            <div v-if="row.textareaEdit">
                                <el-input v-model="textarea" placeholder="请输入评价内容" type="textarea" :rows="2"></el-input>
                                <div class="py-2">
                                    <el-button type="primary" class="mr-2" size="small" @click="">回复</el-button>
                                    <el-button size="small" @click="">取消</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="ID" width="70" prop="id"></el-table-column>
            <el-table-column label="商品" min-width="100">
                <template #default="{ row }">
                    <div class="flex items-center">
                        <el-image :src="row.goods_item ? row.goods_item.cover : ''" fit="fill" :lazy="true"
                            style="width: 50px ; height: 50px;" class="rounded"></el-image>

                        <div class="ml-3">
                            <h6>{{ row.goods_item?.title ?? '商品已被删除' }}</h6>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="评价信息" width="300">
                <template #default="{ row }">
                    <div>
                        <p>{{ row.user.nickname || row.user.nickname }}</p>
                        <p>
                            <el-rate v-model="row.rating" disabled show-score text-color="#ff9900" />
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="评价时间" width="180" align="center" prop="review_time"></el-table-column>
            <el-table-column label="状态" min-width="10%">
                <template #default="{ row }">
                    <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0"
                        @change="handleStatusChange($event, row)" :loading="row.statusLoading"
                        :disabled="row.super == 1">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev,pager, next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>
    </el-card>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { getGoodsCommentList, updateGoodsCommentStatus, reviewGoodsComment } from "~/api/goods_comment"
import ListHeader from "~/components/ListHeader.vue"
import { useInitTable } from '~/composables/useCommon.js'
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';
const roles = ref([])

const {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelet,
    handleStatusChange,
} = useInitTable({
    searchForm: {
        title: ""
    },
    getList: getGoodsCommentList,
    onGetListSuccess: (res) => {
        tableData.value = res.list.map(o => {
            o.statusLoading = false
            o.textareaEdit = false
            return o
        })
        total.value = res.totalCount
        roles.value = res.roles
    },
    updateStatus: updateGoodsCommentStatus
})

const textarea = ref("")

const openTextarea = (row) => {
    console.log('123')
    textarea.value = ""
    row.textareaEdit = true
}
</script>