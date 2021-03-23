<template>
    <div class="order-list">
        <el-card shadow="never">
            <div class="content">
                <div class="content-header">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-input v-model="keyword" placeholder="请输入订单信息"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="danger" @click="init">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="content-main">
                    <el-button type="primary" @click="opens">新增</el-button>
                    <Table :datas="data" v-if="data.tableData.length" :index="false" :operation="operation" :loading="loading"></Table>
                </div>
            </div>
        </el-card>

        <el-dialog title="新增" v-model="formVisible" width="50%">
            <el-form ref="vform" :model="form" :rules="rules" label-width="180px">
                <el-form-item label="签约主体公司编码" prop="code">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="签约主体公司名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="微信收款主体公司名称" prop="wxselect">
                    <el-select v-model="form.wxselect" placeholder="请选择">
                        <el-option
                                v-for="item in form.wxoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付宝收款主体公司名称" prop="alipayselect">
                    <el-select v-model="form.alipayselect" placeholder="请选择">
                        <el-option
                                v-for="item in form.alioptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="resetForm">取 消</el-button>
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import {onMounted, reactive, ref, toRefs,unref} from 'vue'
    import Table from '@/components/Table'

    export default {
        components: {
            Table
        },
        setup() {
            const vform = ref(null)
            const rules={
                code: [
                    {required: true, message: '请输入签约主体公司编码', trigger: 'blur'},
                ],
                name: [
                    {required: true, message: '请输入签约主体公司名称', trigger: 'blur'},
                ],
                wxselect: [
                    {required: true, message: '请选择微信收款主体公司名称', trigger: 'blur'},
                ],
                alipayselect: [
                    {required: true, message: '请选择支付宝收款主体公司名称', trigger: 'blur'},
                ],
            }
            const submitForm = async () => {
                const form = unref(vform)
                if (!form) {
                    return
                }
                await form.validate()

                console.log(state.form)
            }
            const resetForm = () => {
                const form = unref(vform)
                form.resetFields()
                state.formVisible=false
            }
            const state = reactive({
                loading: true,
                keyword: '',
                data: {
                    tableTitle: [
                        {prop:'username',label:'编码'},
                        {prop:'nickname',label:'名称'},
                        {prop:'phone',label:'微信主体公司名称'},
                        {prop:'openId',label:'支付宝主体公司名称'},
                    ],
                    tableData:[],
                    currentPage: 1,
                    pageSize: 10,
                    total: ''
                },
                operation: {
                    flag: true,
                    detail: true,
                    edit: false,
                    del: true
                },
                formVisible:false,
                form:{
                    code:'',
                    name:'',
                    wxoptions:'',
                    wxselect:'',
                    alioptions:'',
                    alipayselect:''
                }
            })

            onMounted(() => {
                init()
                state.loading = false
            })

            // 初始化数据
            const init = () =>{
                let keyword = state.keyword
                if(keyword == null || keyword == ''){
                    keyword = null
                }
                state.data.tableData=[
                    {username:'zahngsan',nickname:'张三',phone:'18850022005',openId:'15sdg5dsfb',birthday:'2001-12-12',sex:'男',email:'zhangsan@163.com',status:'正常',updateTime:'2021-01-20 12:52:12'},
                    {username:'zahngsan',nickname:'张三',phone:'18850022005',openId:'15sdg5dsfb',birthday:'2001-12-12',sex:'男',email:'zhangsan@163.com',status:'正常',updateTime:'2021-01-20 12:52:12'},
                    {username:'zahngsan',nickname:'张三',phone:'18850022005',openId:'15sdg5dsfb',birthday:'2001-12-12',sex:'男',email:'zhangsan@163.com',status:'正常',updateTime:'2021-01-20 12:52:12'},
                    {username:'zahngsan',nickname:'张三',phone:'18850022005',openId:'15sdg5dsfb',birthday:'2001-12-12',sex:'男',email:'zhangsan@163.com',status:'正常',updateTime:'2021-01-20 12:52:12'},
                ]
                state.data.currentPage = 1
                state.data.pageSize = 1
                state.data.total = 4
            }
            const opens =()=>{
                state.formVisible=true
            }
            return {
                ...toRefs(state),
                init,
                vform,
                rules,
                submitForm,
                resetForm,
                opens
            }
        }
    }
</script>

<style lang="less">
    @import '../common/style/common';

    .order-list {

    }
</style>