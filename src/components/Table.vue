<template>
    <div class="table">
        <el-table :data="tableData" border stripe style="width: 100%; margin: 1em 0"
                  v-loading="loading"
                  element-loading-text="拼命加载中..."
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)">
            <!-- <el-table-column v-if="index" label="ID" type="index" :index="onIndex" align="center" show-overflow-tooltip/> -->
            
            <el-table-column v-for="(title,t) in tableTitle" :key="t" show-overflow-tooltip
                             :prop="title.prop"
                             :label="title.label"
                             :align="title.align != null ? title.align : 'center'"
                             :width="title.width"
                             />
            <el-table-column v-if="operation.flag" label="操作" align="center" width="210">
                <template #default="scope">
                    <el-button v-if="operation.edit" type="primary" size="small"  @click="$emit('edit',scope.row)">编辑</el-button>
                    <el-button v-if="scope.row.status"  type="danger" size="small"  @click="del(scope.row)">停用</el-button>
                    <el-button v-if="!scope.row.status" type="danger" size="small"  @click="start(scope.row)">启用</el-button>
                </template>
            </el-table-column>
            
        </el-table>
        <el-pagination @size-change="sizeChange" @current-change="currentChange"
                       layout="total, sizes, prev, pager, next, jumper"
                       :current-page="currentPage"
                       :page-sizes="pageSizes"
                       :page-size="pageSize"
                  
                       :total="total"/>
    </div>
</template>

<script>
    import {onMounted, reactive, toRefs} from 'vue'
    // import {useRouter} from 'vue-router'
    import {ElMessageBox, ElNotification} from "element-plus";

    export default {
       
        props: {
            loading: Boolean,
            index: Boolean,
            operation: Object,
            datas: Object,
        },
        setup(props) {
            // const router = useRouter()

            const state = reactive({
                tableTitle: [],
                tableData: [],
                currentPage: 1,
                pageSizes: [10, 20, 50, 100],
                pageSize: 10,
                total: 0,
            })
            onMounted(()=>{
                
                if(props.datas != null){
                    state.tableTitle = props.datas.tableTitle
                    state.tableData = props.datas.tableData
                    state.currentPage = props.datas.currentPage
                    state.pageSize = props.datas.pageSize
                    state.total = props.datas.total
                }
                if(props.operation != null){
                    state.button_stop=props.operation.del
                    state.button_start=props.operation.isuser
                }
            
            })
            // const button_start_func=(val)=>{
            //      console.log("edit:"+ JSON.stringify(val))
            // }
            // const edit = (val) => {
            //     router.push({ path: 'goods-add', query:{value: val, type: 'edit'}})
            //     console.log("edit:"+ JSON.stringify(val))
            // }
            //启用
            const start=(val)=>{
                     ElMessageBox.confirm('启用此收款主体，与其关联的签约主体可以继续收款，是否继续操作？', '提示', {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                        type: 'warning',
                        callback: action =>{
                            if('confirm' == action){
                                console.log("del:"+ JSON.stringify(val))
                                ElNotification({
                                    title: '成功',
                                    message: '启用成功！',
                                    duration: 2000,
                                    type: 'success'
                                })
                                // state.tableData[index].show=1
                                this.$emit('getDataList')
                            }
                        }
                    })
            }
            const del = (val) => {
                ElMessageBox.confirm('停用此收款主体，与其关联的签约主体将无法收款，是否继续操作？', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: action =>{
                        if('confirm' == action){
                            console.log("del:"+ JSON.stringify(val))
                            ElNotification({
                                title: '成功',
                                message: '停用成功！',
                                duration: 2000,
                                type: 'success'
                            })
                            this.$emit('getDataList')
                        }
                    }
                })
            }

            const sizeChange = (val) => {
                state.pageSize = val
            }

            const currentChange = (val) => {
                state.currentPage = val
            }

            const onIndex = (index) => {
                return index + 1;
            }

            return {
                ...toRefs(state),
                // isuser,
                // edit,
                del,
                start,
                onIndex,
                sizeChange,
                currentChange,
            }
        }

    }
</script>

<style lang="less">

</style>