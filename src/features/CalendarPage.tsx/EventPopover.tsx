import { Modal, notification, Popover, PopoverProps } from 'antd'
import React, { useState } from 'react'
import { Event } from '../../types/event'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import {
  ArrowRight,
  CalendarBlank,
  Clock,
  Link,
  Pencil,
  TextAlignLeft,
  Trash,
  Warning
} from '@phosphor-icons/react'
import clients from '../../db/clients'
import { useDeleteEventMutation } from '../../api/eventApi'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { targetEvent } from '../../store/eventSlice'
import { setOpen } from '../../store/systemSlice'

dayjs.extend(utc)
dayjs.extend(timezone)

interface EventPopoverProps extends PopoverProps {
  children: React.ReactNode
  event?: Event
}

const EventPopover = ({ event, children }: EventPopoverProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const dispatch = useAppDispatch()

  const [deleteEvent, { isLoading }] = useDeleteEventMutation()

  const utcStart = dayjs.utc(event?.start.utc)
  const localStart = utcStart.tz(event?.start.timezone)
  const dayStart = localStart.format('M/D/YYYY')
  const timeStart = localStart.format('hh:mmA')
  const utcOffsetStart = localStart.format('UTCZ')

  const utcEnd = dayjs.utc(event?.end.utc)
  const localEnd = utcEnd.tz(event?.end.timezone)
  const dayEnd = localEnd.format('M/D/YYYY')
  const timeEnd = localEnd.format('hh:mmA')

  const client = clients.find((client) => client.id === event?.currency)

  const handleEventDelete = () => {
    if (event) {
      deleteEvent({ id: event.id })
        .unwrap()
        .then(() => {
          notification.success({
            message: 'Success',
            description: 'Delete event successfully!'
          })
          setIsOpenModal(false)
        })
    }
  }

  const content = (
    <div className='popover-event__body'>
      {dayStart !== dayEnd && (
        <div className='popover-event__time'>
          <CalendarBlank className='popover-event__body-icon' />
          <span className='popover-event__time-text'>{dayStart}</span>
          <Clock className='popover-event__body-icon' />
          <span className='popover-event__time-text'>{timeStart}</span>
          <ArrowRight className='popover-event__arr-icon' />

          <CalendarBlank className='popover-event__body-icon' />
          <span className='popover-event__time-text'>{dayEnd}</span>
          <Clock className='popover-event__body-icon' />
          <span className='popover-event__time-text'>{timeEnd}</span>
          <span className='popover-event__time-utc'>{utcOffsetStart}</span>
        </div>
      )}
      {dayStart === dayEnd && (
        <div className='popover-event__time'>
          <CalendarBlank className='popover-event__body-icon' />
          <span className='popover-event__time-text'>{dayStart}</span>
          <Clock className='popover-event__body-icon' />
          <span className='popover-event__time-text'>{timeStart}</span>
          <ArrowRight className='popover-event__arr-icon' />
          <Clock className='popover-event__body-icon' />
          <span className='popover-event__time-text'>{timeEnd}</span>
          <span className='popover-event__time-utc'>{utcOffsetStart}</span>
        </div>
      )}

      {client && (
        <div className='popover-event__avatar'>
          <img src={client?.avatarLink} />
          <a href={client?.profileLink}>{client?.name}</a>
        </div>
      )}

      <div className='popover-event__description'>
        <TextAlignLeft /> <span>Description</span>
      </div>
      <div
        className='inner-html'
        dangerouslySetInnerHTML={{
          __html: event?.description.html ?? ''
        }}
      ></div>
      <div className='popover-event__description'>
        <Link /> <span>Link: &nbsp;</span>
        <a href={event?.url}>{event?.url}</a>
      </div>
    </div>
  )

  return (
    <Popover
      overlayClassName='popover-event'
      content={content}
      title={
        <div className='popover-event__header'>
          <span>{event?.name.html}</span>
          <div>
            <Pencil
              onClick={() => {
                dispatch(setOpen(true))
                if (event) dispatch(targetEvent(event))
              }}
            />
            <Trash onClick={() => setIsOpenModal(true)} />
          </div>
        </div>
      }
    >
      {children}
      <Modal
        className='event-modal event-modal--delete'
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        closable={false}
        title={
          <div className='delete-header'>
            <Warning /> Delete
          </div>
        }
        onOk={handleEventDelete}
        okText='Delete'
        confirmLoading={isLoading}
      >
        <p>Do you want delete this event?</p>
      </Modal>
    </Popover>
  )
}

export default EventPopover
