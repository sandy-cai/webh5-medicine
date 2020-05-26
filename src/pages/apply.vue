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
      <van-button @click="add()">
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
          v-model="medical.evaluate"
          label="一致性"
          placeholder="请选择一致性"
          :error-message="errorMsg.evaluate"
          @blur="myKeyup"
          @clear="myKeyup"
          clearable
        />
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
import { XTable, LoadMore } from "vux";
import validator from "@/utils/validator";

export default {
  components: {
    XTable,
    LoadMore
  },
  data() {
    return {
      searchValue: "",
      showEdit: "",
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
      // this.$router.push("/login");
    }
    this.$nextTick(() => {
      document.getElementsByClassName("content")[0].style.height =
        document.body.clientHeight - 60 - 44 + "px";
    });
  },
  mounted() {
    this.onRefresh();
  },
  methods: {
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
          return;
        }
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
              done();
            }
          })
          .catch(res => {
            this.$widget.toast(res.mes);
            done(false);
          });
      }
    },
    myKeyup() {},
    //关键字搜索
    onSearch(val) {},
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
    add() {
      this.showEdit = true;
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