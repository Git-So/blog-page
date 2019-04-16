<template>
  <section class="view-search">
    <el-card>
      <el-input
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event)"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-card>
  </section>
</template>
<script>
export default {
  name: 'ViewSearch',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    }
  }
}
</script>
