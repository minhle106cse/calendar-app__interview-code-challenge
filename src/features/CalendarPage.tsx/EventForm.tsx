import { Form, Modal, Input, DatePicker, Radio, notification } from 'antd'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { selectSystem, setOpen } from '../../store/systemSlice'
import { useEffect, useState } from 'react'
import AntdFormItem from '../../components/AntdFormItem'
import AntdInput from '../../components/AntdInput'
import AntdSelect from '../../components/AntdSelect'
import clients from '../../db/clients'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useEditEventMutation, usePostEventMutation } from '../../api/eventApi'
import { EventFormData } from '../../types/event'
import { selectEvent, targetEvent } from '../../store/eventSlice'

dayjs.extend(utc)
dayjs.extend(timezone)

interface FormValues {
  title: string
  type: 'EVENT' | 'APPOINTMENT'
  description: string
  rangeTime: [Dayjs, Dayjs]
  client?: string
}

const EventForm = () => {
  const [isAppointment, setIsAppointment] = useState(false)
  const systemState = useAppSelector(selectSystem)
  const eventState = useAppSelector(selectEvent)

  const [form] = Form.useForm()

  const dispatch = useAppDispatch()

  const [postEvent, { isLoading }] = usePostEventMutation()
  const [editEvnet, { isLoading: isLoadingEdit }] = useEditEventMutation()

  const options = clients.map((item) => ({
    value: item.id,
    label: item.name
  }))

  const handleFormSubmit = (values: FormValues) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const eventData: EventFormData = {
      name: {
        html: values.title
      },
      description: {
        html: values.description
      },
      start: {
        timezone: userTimeZone,
        utc: values.rangeTime[0].tz(userTimeZone).utc().format()
      },
      end: {
        timezone: userTimeZone,
        utc: values.rangeTime[1].tz(userTimeZone).utc().format()
      },
      currency: values.client ?? 'HKD'
    }

    if (eventState.targetedEvent) {
      editEvnet({
        event: eventData,
        id: eventState.targetedEvent.id
      })
        .unwrap()
        .then(() => {
          notification.success({
            message: 'Success',
            description: 'Edit event successfully!'
          })

          dispatch(setOpen(false))
          form.resetFields()
          dispatch(targetEvent(null))
        })
    } else {
      postEvent({
        event: eventData
      })
        .unwrap()
        .then(() => {
          notification.success({
            message: 'Success',
            description: 'Create event successfully!'
          })

          dispatch(setOpen(false))
          form.resetFields()
        })
    }
  }

  useEffect(() => {
    if (eventState.targetedEvent) {
      const event = eventState.targetedEvent
      form.setFieldsValue({
        title: event.name.html,
        type: event.currency === 'HKD' ? 'EVENT' : 'APPOINTMENT',
        description: event.description.html,
        rangeTime: [dayjs(event.start.local), dayjs(event.end.local)],
        client: event.currency
      })

      setIsAppointment(event.currency !== 'HKD')
    }
  }, [eventState.targetedEvent])

  return (
    <Modal
      className='event-modal'
      open={systemState.isOpen}
      onCancel={() => {
        dispatch(setOpen(false))
        dispatch(targetEvent(null))
        form.resetFields()
      }}
      closable={false}
      title={eventState.targetedEvent ? 'Edit event' : 'Create event'}
      width={600}
      okText={eventState.targetedEvent ? 'Edit' : 'Create'}
      onOk={() => {
        form.submit()
      }}
      confirmLoading={isLoading}
    >
      <Form
        name='event-form'
        layout='vertical'
        form={form}
        onFinish={handleFormSubmit}
      >
        <AntdFormItem
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Please enter event title!' }]}
        >
          <AntdInput placeholder='Enter event title' />
        </AntdFormItem>

        <AntdFormItem
          label='Range time'
          name='rangeTime'
          rules={[
            { required: true, message: 'Please select event range time!' }
          ]}
        >
          <DatePicker.RangePicker
            className='antd-date-picker'
            showTime={{
              hideDisabledOptions: true,
              defaultValue: [
                dayjs('00:00:00', 'HH:mm'),
                dayjs('11:59:59', 'HH:mm')
              ]
            }}
            format='YYYY-MM-DD HH:mm'
            disabledDate={(current) =>
              current && current < dayjs().startOf('day')
            }
          />
        </AntdFormItem>

        <AntdFormItem
          layout='horizontal'
          label='Type'
          name='type'
          initialValue={isAppointment ? 'APPOINTMENT' : 'EVENT'}
        >
          <Radio.Group
            onChange={(e) => setIsAppointment(e.target.value === 'APPOINTMENT')}
          >
            <Radio value='EVENT'>Normal event</Radio>
            <Radio value='APPOINTMENT'>Appointment</Radio>
          </Radio.Group>
        </AntdFormItem>
        {isAppointment && (
          <AntdFormItem
            label='Client'
            name='client'
            rules={[{ required: true, message: 'Please select your client!' }]}
          >
            <AntdSelect placeholder='Select your client' options={options} />
          </AntdFormItem>
        )}

        <AntdFormItem label='Description' name='description'>
          <Input.TextArea
            className='antd-input'
            placeholder='Enter description'
            rows={4}
            maxLength={250}
            count={{ show: true }}
          />
        </AntdFormItem>
      </Form>
    </Modal>
  )
}

export default EventForm
