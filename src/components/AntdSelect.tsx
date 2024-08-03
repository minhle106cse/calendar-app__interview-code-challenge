import { Select, SelectProps } from 'antd'

const AntdSelect = (props: SelectProps) => {
  return <Select className='antd-select' {...props} />
}

export default AntdSelect
