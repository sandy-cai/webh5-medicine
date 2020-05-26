<template>
  <div id="apply">
    <van-search
      id="search-div"
      v-model="searchValue"
      placeholder="请输入手册关键词"
      input-align="center"
      @input="onSearch"
    />
    <div class="content">
      <van-list :finished="finished" finished-text="没有更多了" @load="onLoad">
        <x-table :cell-bordered="false">
          <thead>
            <tr style="background-color: #F7F7F7">
              <th style=" padding-left: 12px;">名称</th>
              <th>剂型</th>
              <th>规格</th>
              <th>厂家</th>
              <th>一致性</th>
              <th style="padding-right: 12px;">配送商</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :key="index">
              <td style=" padding-left: 12px;">{{item.Name}}</td>
              <td>{{item.MedicalType}}</td>
              <td>{{item.Specs}}</td>
              <td>{{item.Manufactor}}</td>
              <td>{{item.Evaluate}}</td>
              <td style="padding-right: 12px;">{{item.Distribution}}</td>
            </tr>
          </tbody>
        </x-table>
      </van-list>
    </div>
    <div class="width100 text-align-center bottom">
      <van-button @click="addMedicine()">
        <span>新增药品</span>
      </van-button>
    </div>
    <van-dialog
      v-model="showEdit"
      show-cancel-button
      show-confirm-button
      confirm-button-color="#00982D"
      title="新增药品"
      :before-close="beforeClose"
    >
      <van-cell-group :border="false">
        <van-field
          class="redstar"
          v-model="medical.name"
          label="药品名称"
          placeholder="请输入药品名称"
          :error-message="errorMsg.name"
          @blur="myKeyup"
          @clear="myKeyup"
          clearable
        />
        <van-field
          class="redstar"
          v-model="medical.medicalType"
          label="药品剂型"
          placeholder="请输入药品剂型"
          :error-message="errorMsg.medicalType"
          @blur="myKeyup"
          @clear="myKeyup"
          clearable
        />
        <van-field
          class="redstar"
          v-model="medical.specs"
          label="药品规格"
          placeholder="请输入药品规格"
          :error-message="errorMsg.specs"
          @blur="myKeyup"
          @clear="myKeyup"
          clearable
        />
        <van-field
          class="redstar"
          v-model="medical.manufactor"
          label="生产厂家"
          placeholder="请输入生产厂家"
          :error-message="errorMsg.manufactor"
          @blur="myKeyup"
          @clear="myKeyup"
          clearable
        />
        <van-field
          class="redstar"
          label="一致性"
          input-align="right"
          :error-message="errorMsg.evaluate"
        >
          <template #input>
            <van-radio-group
              v-model="medical.evaluate"
              @change="myKeyup"
              class="flex"
              style="margin-right: 45%;"
            >
              <van-radio name="1" style="margin-right: 12px;">是</van-radio>
              <van-radio name="0">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          class="redstar"
          v-model="medical.distribution"
          label="配送商"
          placeholder="请输入配送商"
          :error-message="errorMsg.distribution"
          @blur="myKeyup"
          @clear="myKeyup"
          clearable
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { XTable } from "vux";
import validator from "@/utils/validator";

export default {
  components: {
    XTable
  },
  data() {
    return {
      searchValue: "",
      showEdit: false,
      page: 1,
      pageSize: 10,
      list: [],
      finished: true,
      token: "",
      medical: {
        name: "",
        medicalType: "",
        specs: "",
        manufactor: "",
        evaluate: "",
        distribution: ""
      },
      errorMsg: {
        name: "",
        medicalType: "",
        specs: "",
        manufactor: "",
        evaluate: "",
        distribution: ""
      },
      rules: {
        name: [{ required: true, message: "请输入药品名称" }],
        medicalType: [{ required: true, message: "请输入药品剂型" }],
        specs: [{ required: true, message: "请输入药品规格" }],
        manufactor: [{ required: true, message: "请输入生产厂家" }],
        evaluate: [{ required: true, message: "请选择一致性" }],
        distribution: [{ required: true, message: "请输入配送商" }]
      }
    };
  },
  created() {
    this.validator = validator(this.rules, this.medical);
  },
  beforeMount() {
    if (this.$store.state.userInfo) {
      this.token = this.$store.state.userInfo.Token;
    }
    if (!this.token) {
      this.$router.push("/login");
    }
    this.$nextTick(() => {
      document.getElementsByClassName("content")[0].style.height =
        document.body.clientHeight - 126 + "px";
      document.getElementsByClassName("content")[0].style.maxHeight =
        document.body.clientHeight - 126 + "px";
    });
  },
  mounted() {
    this.getPublicSet().then(res => {
      this.onRefresh();
    });
  },
  methods: {
    //关键字搜索
    onSearch(val) {},
    myKeyup() {
      if (this.medical.name) {
        this.errorMsg.name = "";
      }
      if (this.medical.medicalType) {
        this.errorMsg.medicalType = "";
      }
      if (this.medical.specs) {
        this.errorMsg.specs = "";
      }
      if (this.medical.manufactor) {
        this.errorMsg.manufactor = "";
      }
      if (this.medical.evaluate) {
        this.errorMsg.evaluate = "";
      }
      if (this.medical.distribution) {
        this.errorMsg.distribution = "";
      }
    },
    onRefresh() {
      this.page = 1;
      this.finished = true;
      this.list = [];
      this.getData();
    },
    onLoad() {
      this.page++;
      this.getData({ loadmore: true });
    },
    //获取列表
    getData(e) {
      this.$get({
        isLoading: true,
        url: this.$apis.getList,
        header: {
          token: this.token
        },
        query: {
          pageIndex: this.page,
          pageSize: this.pageSize
        }
      }).then(res => {
        if (e && e.loadmore) {
          res.rows.forEach(element => {
            element.Evaluate = element.Evaluate == 0 ? "否" : "是";
            this.list.push(element);
          });
        } else {
          res.rows.forEach(element => {
            element.Evaluate = element.Evaluate == 0 ? "否" : "是";
          });
          this.list = res.rows;
        }
        if (res.rows.length < 10) {
          this.finished = true;
        } else {
          this.finished = false;
        }
      });
    },
    //新增药品
    addMedicine() {
      this.clearForm();
      this.showEdit = true;
    },
    //Dialog异步关闭
    beforeClose(action, done) {
      if (action === "cancel") {
        done();
      } else if (action === "confirm") {
        //数据校验
        const isReturn = false;
        this.validate((value, fields) => {
          this.isReturn = value;
        });
        if (this.isReturn) {
          done(false);
          return;
        }
        //在开放时间段内才能提交
        this.getPublicSet()
          .then(res => {
            this.$post({
              isLoading: true,
              url: this.$apis.save,
              header: {
                token: this.token
              },
              param: this.medical
            })
              .then(res => {
                if (res.suc) {
                  this.$widget.toast("操作成功");
                  done();
                  this.onRefresh();
                }
              })
              .catch(res => {
                this.$widget.toast(res.mes);
                done(false);
              });
          })
          .catch(res => {
            done(false);
          });
      }
    },
    //获取开放时间段
    getPublicSet() {
      return new Promise((resolve, reject) => {
        this.$post({
          isLoading: true,
          url: this.$apis.getPublicSet
        })
          .then(res => {
            resolve(res);
          })
          .catch(res => {
            reject();
          });
      });
    },
    //清空
    clearForm() {
      this.medical.name = "";
      this.medical.medicalType = "";
      this.medical.specs = "";
      this.medical.manufactor = "";
      this.medical.evaluate = "";
      this.medical.distribution = "";
      this.errorMsg.name = "";
      this.errorMsg.medicalType = "";
      this.errorMsg.specs = "";
      this.errorMsg.manufactor = "";
      this.errorMsg.evaluate = "";
      this.errorMsg.distribution = "";
    },
    //验证方法
    validate(callback, data) {
      this.validator.validate((errors, fields) => {
        this.resetField();
        if (errors) {
          fields.forEach(item => {
            this.errorMsg[item.field] = item.message;
          });
        }
        callback && callback(errors, fields);
      }, data);
    },

    //清除验证提示
    resetField(attrs) {
      attrs = !attrs
        ? Object.keys(this.errorMsg)
        : Array.isArray(attrs)
        ? attrs
        : [attrs];
      attrs.forEach(attr => {
        this.errorMsg[attr] = "";
      });
    }
  }
};
</script>

<style lang="scss">
#apply {
  .content {
    background: #ffff;
    overflow: auto;
    thead {
      tr {
        font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif,
          PingFangSC-Regular;
        font-size: 16px;
        color: #333333;
        letter-spacing: -0.39px;
      }
    }

    tbody {
      tr {
        font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif,
          PingFangSC-Regular;
        font-size: 15px;
        color: #666666;
        letter-spacing: -0.36px;
      }
    }
  }
  .van-dialog__content {
    padding: 12px;
  }
  .bottom {
    border-top: 1px solid #e2e2e2;
    height: 58px;
    background: #fff;
    line-height: 58px;
    .van-button {
      height: 48px;
      line-height: 48px;
      width: 85%;
      color: #fff;
      background-color: #00c691;
      border: 1px solid #00c691;
      letter-spacing: 2.2px;
    }
  }
  //星号
  .redstar {
    .van-cell__title::after {
      content: "*";
      color: #db524b;
    }
  }
}
</style>