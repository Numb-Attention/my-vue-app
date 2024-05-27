<template>
    <div v-if="modelValue && preview">
        <el-image v-if="typeof modelValue === 'string'" :src="modelValue" fit="cover"
            class="w-[100px] h-[100px] rounded border mr-2"></el-image>
        <div v-else class="flex flex-wrap">
            <div class="relative mx-1 mb-2 w-[100px] h-[100px]" v-for="(url, index) in modelValue" :key="index">
                <el-icon class="absolute right-[5px] top-[5px] rounded-full bg-white cursor-pointer"
                    style="z-index: 10; " @click="removeImage(url)">
                    <CircleClose />
                </el-icon>
                <el-image :src="url" fit="cover" class="w-[100px] h-[100px] rounded border mr-2"></el-image>
            </div>
        </div>
    </div>
    <div class="choose-img-btn" @click="open" v-if="preview">
        <el-icon :size="25" class="text-gray-500">
            <Plus />
        </el-icon>
    </div>
    <el-dialog title="选择图片" v-model="dialogVisible" width="80%" top="5vh">
        <el-container class="bg-white rounded " style="height: 70vh;">
            <el-header class="image-header">
                <el-button type="primary" size="small" style="margin-right: 20px;"
                    @click="handleOpenCreate">新增图片分类</el-button>
                <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
            </el-header>
            <el-container>
                <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
                <ImageMain :limit="limit" openChoose="true" ref="ImageMainRef" @choose="handleChoose" />
            </el-container>
        </el-container>
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
import ImageMain from '~/components/ImageMain.vue'
import ImageAside from '~/components/ImageAside.vue'
import { toast } from "~/composables/util.js"

const dialogVisible = ref(false)

const callbackFunction = ref(null)
const open = (callback = null) => {
    callbackFunction.value = callback
    dialogVisible.value = true
}
const close = () => {
    dialogVisible.value = false
    console.log(ImageMainRef.value.list)
    ImageMainRef.value.list.forEach(el => {
        el.checked = false
    });
}


const ImageAsideRef = ref(null)
const handleOpenCreate = () => ImageAsideRef.value.handleCreate()


const ImageMainRef = ref(null)
const handleAsideChange = (image_class_id) => ImageMainRef.value.loadData(image_class_id)
const handleOpenUpload = () => ImageMainRef.value.openUploadFile()

let urls = []
const props = defineProps({
    modelValue: [String, Array],
    limit: {
        type: Number,
        default: 1
    },
    preview: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(["update:modelValue"])
const handleChoose = (e) => {
    urls = e.map(o => o.url)
}

const removeImage = (url) => {
    const array = props.modelValue.filter((el) => {
        return el !== url
    })
    emit("update:modelValue", array)
}

const submit = () => {
    let value = []
    if (props.limit == 1) {
        value = urls[0]
    } else {
        value = props.preview ? [...props.modelValue, ...urls] : [...urls]
        if (value.length > props.limit) {
            let limit = props.preview ? (props.limit - props.modelValue.length) : props.limit
            return toast("最多还能选择" + limit + "张图片")
        }
    }
    if (value && props.preview) {
        emit("update:modelValue", value)
    }
    if (!props.preview && typeof callbackFunction.value === 'function') {
        callbackFunction.value(value)
    }
    close()
}

defineExpose({
    open
})
</script>

<style>
.image-header {
    border-bottom: 1px solid #eeeeee;
    @apply flex items-center
}

.choose-img-btn {
    @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover:(bg-gray-100);
}
</style>