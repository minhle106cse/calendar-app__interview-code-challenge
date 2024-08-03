import { Input, InputProps } from 'antd'

const AntdInput = ({ className, ...props }: InputProps) => {
  return <Input className={`antd-input ${className}`} {...props} />
}

export default AntdInput
