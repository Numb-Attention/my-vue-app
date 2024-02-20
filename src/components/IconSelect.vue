<template>
    <div class="flex items-center">
        <el-icon v-if="modelValue" :size="20" class="mr-2">
            <component :is="modelValue"></component>
        </el-icon>
        <el-select :modelValue="modelValue" class="m-2" filterable placeholder="请选择请求方式" @change="handleChange">
            <el-option v-for="item in icons" :key="item" :label="item" :value="item" placeholder="请选择图标">
                <div class="flex items-center  justify-between">
                    <el-icon>
                        <component :is="item" />
                        <!-- 动态图标-->
                    </el-icon>
                    <span class="text-gray-500">{{ item }}</span>
                </div>

            </el-option>
        </el-select>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import * as iconList from '@element-plus/icons-vue'
defineProps({
    modelValue: String
})
// console.log(Object.keys(iconList))
const icons = ref(Object.keys(iconList))
const emit = defineEmits(["update:modelValue"])
const handleChange = (icon) => {
    emit("update:modelValue", icon)
}

</script>