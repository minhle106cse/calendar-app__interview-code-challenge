import { Form, FormItemProps } from 'antd'

const AntdFormItem = (props: FormItemProps) => {
  return (
    <div className='antd-form-item'>
      <Form.Item {...props}>{props.children}</Form.Item>
    </div>
  )
}

export default AntdFormItem
