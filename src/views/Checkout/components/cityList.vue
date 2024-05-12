<script setup>
import { useCityListStore } from '@/stores/cityListStore'
const cityListStore = useCityListStore()
</script>

<template>
  <div class="addCityList">
    <el-form :model="cityListStore.changeResult">
      <el-form-item label-width="180px" label="收貨人">
        <el-input v-model="cityListStore.changeResult.receiver" />
      </el-form-item>
      <el-form-item label-width="180px" label="手機號碼">
        <el-input v-model="cityListStore.changeResult.contact" />
      </el-form-item>
      <el-form-item label-width="180px" label="地區">
        <el-input @click="cityListStore.isDone = !cityListStore.isDone" v-if="!cityListStore.changeResult.fullLocation"
          placeholder=" 請輸入地址" suffix-icon="ArrowDown"></el-input>
        <el-input v-else v-model="cityListStore.changeResult.fullLocation" suffix-icon="ArrowDown"></el-input>
        <div v-if="!cityListStore.isDone" class="citySpan">
          <span v-for="item in cityListStore.cityList" :key="item.id" @click="cityListStore.selectCity(item)">
            {{ item.name }}
          </span>
        </div>
      </el-form-item>
      <el-form-item label-width="180px" label="詳細地址">
        <el-input v-model="cityListStore.changeResult.address" />
      </el-form-item>
      <el-form-item label-width="180px" label="郵政編碼">
        <el-input v-model="cityListStore.changeResult.postalCode" />
      </el-form-item>
      <el-form-item label-width="180px" label="地址標籤">
        <el-input v-model="cityListStore.changeResult.addressTags" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.addCityList {
  width: 750px;
}

.el-input {
  width: 320px;
  height: 50px;
}

.citySpan {
  width: 542px;
  height: auto;
  border: 1px solid #e4e4e4;
  left: 0;
  top: 60px;
  background: #fff;
  min-height: 30px;
  line-height: 30px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  z-index: 999;
}

span {
  width: 130px;
  height: 30px;
  cursor: pointer;
  text-align: center;
  border-radius: 4px;
  padding: 0 3px;
  z-index: 999;

  &:hover {
    background: #bebbbb;
  }
}
</style>