export default {
  type: 'object',
  properties: {
    name: {
      name: 'name',
      title: '节点名称',
      type: 'string',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}
