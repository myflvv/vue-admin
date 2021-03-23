<template>
  <div class="goods-list">
    <el-card shadow="never">
      <div class="content">
        <div class="content-header">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-input v-model="keyword" placeholder="请输入商品信息"></el-input>
            </el-col>
            <el-col :span="4">
              <el-select v-model="typeVal" filterable placeholder="请选择">
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-button type="danger" @click="init">搜索</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="content-main">
          <el-tabs v-model="activeName">
            <el-tab-pane label="收款主体" name="first">
              <template #label>
                <span>收款主体</span>
              </template>
              <el-button
                type="primary"
                @click="openDialog"
                style="float:right;margin-bottom: 10px;"
              >新增</el-button>
              <Table
                :datas="data"
                v-if="data.tableData.length"
                :index="false"
                :operation="operation"
                :loading="loading"
                empty-text="暂无数据"
                @edit="edit"
              ></Table>
            </el-tab-pane>
            <el-tab-pane label="支付产品" name="second">
              <template #label>
                <span>支付产品</span>
              </template>
              <el-button
                type="primary"
                @click="openProDialog"
                style="float:right;margin-bottom: 10px;"
              >新增</el-button>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-card>

    <el-dialog :title="dialogTitle" v-model="dialogFormVisible" width="30%">
      <el-form :model="form" label-width="150px" :rules="rules" ref="formRef" status-icon>
        <el-form-item label="收款主体公司编码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="收款主体公司名称" prop="company">
          <el-input v-model="form.company"></el-input>
        </el-form-item>
        <el-form-item prop="id" hidden>
          <el-input v-model="form.id"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm">取 消</el-button>
          <el-button type="primary" @click="submitForm('formRef')">确 定</el-button>
        </span>
      </template>
    </el-dialog>


     <el-dialog :title="dialogTitlePro" v-model="dialogFormVisiblePro" width="40%">
      <el-form :model="formPro" label-width="150px" :rules="rulesPro" ref="formRefPro" status-icon>
         <el-form-item label="收款主体公司名称" prop="alipayselect">
                    <el-select v-model="formPro.alipayselect" placeholder="请选择">
                        <el-option
                                v-for="item in formPro.alioptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
        <el-form-item label="支付方式">
                         <el-radio-group v-model="formPro.paytype" @change="paytypeChange">
                            <el-radio label="微信Native支付"></el-radio>
                            <el-radio label="微信JSAPI支付"></el-radio>
                            <el-radio label="支付宝应用"></el-radio>
                        </el-radio-group>
        </el-form-item>
       <div v-if="formPro.paytype!='支付宝应用'">
            <el-form-item label="服务商模式">
                         <el-radio-group v-model="formPro.serviceType">
                            <el-radio label="是"></el-radio>
                            <el-radio label="否"></el-radio>
                        </el-radio-group>
        </el-form-item>
        <el-form-item label="APP_ID" prop="sp_app_id" v-if="formPro.serviceType=='是'">
          <el-input v-model="formPro.sp_app_id"></el-input>
        </el-form-item>
        <el-form-item label="SUB_APP_ID" prop="sub_app_id">
          <el-input v-model="formPro.sub_app_id"></el-input>
        </el-form-item>
        <el-form-item label="MCH_ID" prop="sp_mch_id" v-if="formPro.serviceType=='是'">
          <el-input v-model="formPro.sp_mch_id"></el-input>
        </el-form-item>
        <el-form-item label="SUB_MCH_ID" prop="sub_mch_id">
          <el-input v-model="formPro.sub_mch_id"></el-input>
        </el-form-item>
        <el-form-item label="证书序列号" prop="serial_no" v-if="formPro.paytype=='微信JSAPI支付'" >
          <el-input v-model="formPro.serial_no"></el-input>
        </el-form-item>
        <el-form-item label="API-V3-KEY" prop="api_v3_key" v-if="formPro.paytype=='微信JSAPI支付'">
          <el-input v-model="formPro.api_v3_key"></el-input>
        </el-form-item>
        <el-form-item label="APP_SECRET" prop="app_secret"  v-if="formPro.paytype=='微信Native支付'">
          <el-input v-model="formPro.app_secret"></el-input>
        </el-form-item>
        <el-form-item label="KEY" prop="key"  v-if="formPro.paytype=='微信Native支付'">
          <el-input v-model="formPro.key"></el-input>
        </el-form-item>
       </div>
        <div v-if="formPro.paytype=='支付宝应用'">
              <el-form-item label="应用APP_ID" prop="app_id">
                <el-input v-model="formPro.app_id"></el-input>
            </el-form-item>
            <el-form-item label="证书类型">
                         <el-radio-group v-model="formPro.aliPemType">
                            <el-radio label="RSA2"></el-radio>
                            <el-radio label="RSA"></el-radio>
                        </el-radio-group>
        </el-form-item>
        <el-form-item label="秘钥格式">
                         <el-radio-group v-model="formPro.aliKeyType">
                            <el-radio label="PKCS8(JAVA适用)"></el-radio>
                            <el-radio label="PKCS1(非JAVA适用)"></el-radio>
                        </el-radio-group>
        </el-form-item>
        <el-form-item label="应用公钥" prop="aliPublicKey">
                <el-input v-model="formPro.aliPublicKey"></el-input>
            </el-form-item>
            <el-form-item label="应用私钥" prop="aliPrivateKey">
                <el-input v-model="formPro.aliPrivateKey"></el-input>
            </el-form-item>
            <el-form-item label="支付宝公钥" prop="aliCommonPublicKey">
                <el-input v-model="formPro.aliCommonPublicKey"></el-input>
            </el-form-item>
        </div>
        <el-form-item prop="id" hidden>
          <el-input v-model="formPro.id"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetFormPro">取 消</el-button>
          <el-button type="primary" @click="submitFormPro">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, ref, unref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import Table from "@/components/Table";
import { saveCollection, listCollection } from "../api/serviceApi";
export default {
  //   data() {
  //     return {
  //       dialogFormVisible: false,
  //       activeName: "first",
  //     };
  //   },

  methods: {
      paytypeChange(val){
          console.log(val)
      }
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // }
  },
  components: {
    Table
  },
  setup() {
    const dialogFormVisible = ref(false);
    const dialogFormVisiblePro = ref(false);
    const activeName = ref("first");
    const formRef = ref(null);
    const formRefPro= ref(null);
    const form = reactive({
      code: "",
      company: "",
      id: 0
    });
    const formPro = reactive({
        paytype:'微信Native支付',
      app_id: "",
      sub_app_id: "",
      aliPemType:'RSA2',
aliKeyType:'PKCS8(JAVA适用)',
serviceType:'是',
      id: 0
    });
    const rules = {
      code: [
        { required: true, message: "请输入收款主体公司编码", trigger: "blur" },
        { min: 3, max: 50, message: "长度在 3 到 5 个字符", trigger: "blur" }
      ],
      company: [
        { required: true, message: "请输入收款主体公司名称", trigger: "blur" },
        { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
      ]
    };
    const rulesPro = {
      code: [
        { required: true, message: "请输入收款主体公司编码", trigger: "blur" },
        { min: 3, max: 50, message: "长度在 3 到 5 个字符", trigger: "blur" }
      ],
      company: [
        { required: true, message: "请输入收款主体公司名称", trigger: "blur" },
        { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
      ]
    };
    const resetForm = () => {
      dialogFormVisible.value = false;
      //  formRes.value.resetFields();
    };
    const resetFormPro = () => {
      dialogFormVisiblePro.value = false;
    };
    const submitFormPro=async()=>{

    }
    const submitForm = async () => {
      const vform = unref(formRef);
      if (!vform) return;
      try {
        await vform.validate();
        // const { code, name } = form
        saveCollection(form)
          .then(res => {
            if (res.code == 200) {
              //  ElMessageBox.alert(res.msg)
              ElMessage.success({
                message: "保存成功",
                type: "success"
              });
              dialogFormVisible.value = false;
              var t;
              clearTimeout(t);
              t = setTimeout(function() {
                state.data.tableData = "";
                state.data.currentPage = 1;
                state.data.pageSize = 10;
                state.data.total = 0;
                getDataList();
              }, 2000);
            } else {
              ElMessageBox.alert(res.msg);
              return false;
            }
          })
          .catch(e => {
            ElMessageBox.alert(e);
            return false;
          });
      } catch (error) {
        console.log(error);
      }
    };
    const openDialog = () => {
      state.dialogTitle = "新增收款主体";
      (form.code = ""), (form.company = ""), (dialogFormVisible.value = true);
    };
     const openProDialog = () => {
      state.dialogTitlePro = "新增支付产品";
      (form.code = ""), (form.company = ""), (dialogFormVisiblePro.value = true);
    };
    const edit = params => {
      state.dialogTitle = "编辑收款主体";
      form.id = params.id;
      form.code = params.code;
      form.company = params.company;
      dialogFormVisible.value = true;
    };
    const state = reactive({
      keyword: "",
      loading: true,
      typeVal: "",
      types: [],
      data: {
        tableTitle: [
          { prop: "id", label: "ID" },
          { prop: "code", label: "收款主体公司编码" },
          { prop: "company", label: "收款主体公司名称" },
          { prop: "updatetime", label: "创建时间" },
          { prop: "birthday", label: "微信收款产品" },
          { prop: "sex", label: "支付宝收款产品" },
          { prop: "status_text", label: "收款主体状态" }
        ],
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: ""
      },
      operation: {
        flag: true,
        edit: true,
        del: true,
        isuser: false
      },
      dialogTitle: "新增收款主体",
      dialogTitlePro: "新增支付产品"
    });
    onMounted(() => {
      state.types = [
        { value: "1", label: "黄金糕" },
        { value: "2", label: "双皮奶" }
      ];
      init();
      state.loading = false;
    });

    let typeVal = state.typeVal;
    if (typeVal == null || typeVal == 0) {
      typeVal = null;
    }
    // 初始化数据
    const init = () => {
      let keyword = state.keyword;
      if (keyword == null || keyword == "") {
        keyword = null;
      }
      getDataList();
    };
    const getDataList = () => {
      listCollection().then(res => {
        res.data.list.forEach(function(item) {
          if (item.status == 1) {
            item.status_text = "启用";
          } else {
            item.status_text = "停用";
          }
        });
        state.data.tableData = res.data.list;
        state.data.currentPage = res.data.page;
        state.data.pageSize = res.data.size;
        state.data.total = res.data.total;
      });

      
    };
    return {
      ...toRefs(state),
      init,
      submitForm,
      form,
      rules,
      edit,
      formRef,
      resetForm,
      activeName,
      dialogFormVisible,
      openDialog,
      openProDialog,
      formPro,
      formRefPro,
      dialogFormVisiblePro,
      rulesPro,
      resetFormPro,
      submitFormPro
    };
  }
};
</script>

<style lang="less">
@import "../common/style/common";

.goods-list {
  .content-main {
    .table-image {
      width: 45px;
      height: 45px;
    }
  }
}
</style>