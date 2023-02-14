<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增和刷新 -->
        <ListHeader @create="handleCreate" @refresh="getData"/>
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="公告标题" />
            <el-table-column prop="create_time" label="Name" width="380" />
            <el-table-column prop="address" label="操作" width="180" align="center" >
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="handleEdit(scope.row)" >修改</el-button>
                    <el-popconfirm title="是否要删除该公告" 
                    confirm-button-text="确认" 
                    cancel-button-text="取消" 
                    @confirm="handleDelet(scope.row.id)">
                        <template #reference>
                            <el-button class=" px-1" text type="primary" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev,pager, next" :total="total" 
            :current-page="currentPage" 
            :page-size="limit"
            @current-change="getData"
            />
        </div>

        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false" >
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="form.title" placeholder="公告标题"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
                </el-form-item>
            </el-form>  
        </FormDrawer>


        
    </el-card>
    
</template>

<script setup>
    import { ref,reactive,computed } from 'vue';
    import { getNoticeList,createNotice,updateNotice,deleteNotice } from "~/api/notice"
    import FormDrawer from "~/components/FormDrawer.vue"
    import { useInitTable,useInitForm } from '~/composables/useCommon.js'
    import ListHeader from "~/components/ListHeader.vue"
    // const tableData = ref([])
    // const loading = ref(false)
    // //分页
    // const currentPage = ref(1)
    // const total = ref(0)
    // const limit = ref(10)

    // function getData(p = null){
    //     if(typeof p == "number"){
    //         currentPage.value = p
    //     }
    //     loading.value = true
    //     getNoticeList(currentPage.value)
    //     .then(res=>{
    //         console.log(res)
    //         tableData.value = res.list
    //         total.value = res.totalCount

    //     })
    //     .finally(()=>{
    //         loading.value=false
    //     })
    // }
    // getData()
    //列表分页和搜索
    const {
        tableData,
        loading,
        currentPage,
        total,
        limit,
        getData,
        handleDelet,
    } =  useInitTable(
        {
            getList:getNoticeList,
            delete:deleteNotice
        },
        
    )
    //新增和修改
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
        form:{           
            title:"",
            content:""
        },
        rules: {
            title: [{
                required: true,
                message: '公告标题不能为空',
                trigger: 'blur'
            }],
            content: [{
                required: true,
                message: '公告内容不能为空',
                trigger: 'blur'
            }]
        },
        getData,
        update:updateNotice,
        create:createNotice,
    })

    

</script>