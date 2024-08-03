import CardEvent from './CardEvent'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectEvent } from '../../store/eventSlice'
import dayjs from 'dayjs'
import getDaySuffix from '../../utils/getDaySuffix'
import { selectSystem } from '../../store/systemSlice'

const UpcomingEvents = () => {
  const eventState = useAppSelector(selectEvent)
  const systemState = useAppSelector(selectSystem)

  const todayEvent = eventState.events.filter((item) =>
    dayjs(item.start.local).isSame(dayjs(), 'day')
  )

  const targetEvent = eventState.events.filter((item) =>
    dayjs(item.start.local).isSame(dayjs(systemState.targetedDate), 'day')
  )

  return (
    <div className='upcoming-events'>
      <h3 className='upcoming-events__title'>Upcomming Events</h3>

      <div className='upcoming-events__container'>
        <div>
          <h5 className='upcoming-events__subtitle'>
            Today, {dayjs().format('DD')}
            {getDaySuffix(dayjs().date())} {dayjs().format('MMMM')}
          </h5>

          <div className='upcoming-events__box'>
            {todayEvent.map((item) => (
              <CardEvent event={item} key={item.id} />
            ))}
            {todayEvent.length === 0 && (
              <div className='upcoming-events__empty'>No events available.</div>
            )}
          </div>
        </div>

        {systemState.targetedDate && (
          <div>
            <h5 className='upcoming-events__subtitle'>
              {dayjs(systemState.targetedDate).format('DD')}
              {getDaySuffix(dayjs(systemState.targetedDate).date())}{' '}
              {dayjs(systemState.targetedDate).format('MMMM')}
            </h5>

            <div className='upcoming-events__box'>
              {targetEvent.map((item) => (
                <CardEvent event={item} key={item.id} />
              ))}
              {targetEvent.length === 0 && (
                <div className='upcoming-events__empty'>
                  No events available.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UpcomingEvents
