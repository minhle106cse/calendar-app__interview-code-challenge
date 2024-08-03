import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import dayjs from 'dayjs'
import EventPopover from './EventPopover'
import { useGetEventsQuery } from '../../api/eventApi'
import { Spin } from 'antd'
import { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { saveEvents } from '../../store/eventSlice'

const BigCalendar = () => {
  const { data, isFetching } = useGetEventsQuery()

  const dispatch = useAppDispatch()

  const handleDateClick = (arg: DateClickArg) => {
    alert(arg.dateStr)
  }

  const events: EventSourceInput =
    data?.events?.map((item, index) => {
      return {
        title: item.name.html,
        description: item.description.html,
        start: item.start.utc,
        end: item.end.utc,
        url: item.url,
        type: item.currency === 'HKD' ? 'EVENT' : 'APPOINTMENT',
        index: index
      }
    }) ?? []

  useEffect(() => {
    if (data?.events) dispatch(saveEvents(data?.events))
  }, [data])

  return (
    <div className='big-calendar'>
      <Spin spinning={isFetching}>
        <FullCalendar
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listYear'
          }}
          events={events}
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin
          ]}
          initialView='dayGridMonth'
          dateClick={handleDateClick}
          eventContent={(eventInfo) => {
            const { event } = eventInfo
            const time = dayjs(event.start).format('hh:mm a')

            return (
              <EventPopover event={data?.events[event.extendedProps.index]}>
                <div
                  className={`event-content ${event.extendedProps.type === 'EVENT' ? 'event-content--event' : 'event-content--appointment'}`}
                >
                  <span>{time}</span>
                  <span className='event-content__title'>{event.title}</span>
                </div>
              </EventPopover>
            )
          }}
        />
      </Spin>
    </div>
  )
}

export default BigCalendar
