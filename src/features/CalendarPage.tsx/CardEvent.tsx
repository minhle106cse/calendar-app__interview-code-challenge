import dayjs from 'dayjs'
import { Event } from '../../types/event'
import clients from '../../db/clients'

interface CardEventProps {
  event: Event
}

const CardEvent = ({ event }: CardEventProps) => {
  const utcStart = dayjs.utc(event.start.utc)
  const localStart = utcStart.tz(event.start.timezone)
  const timeStart = localStart.format('hh:mmA')
  const utcOffsetStart = localStart.format('UTCZ')

  /*   const utcEnd = dayjs.utc(event.end.utc)
  const localEnd = utcEnd.tz(event.end.timezone)
  const timeEnd = localEnd.format('hh:mmA') */

  const client = clients.find((client) => client.id === event.currency)

  return (
    <div
      onClick={() => {
        const url = event.url
        window.open(url)
      }}
      className={`event-card ${event.currency === 'HKD' ? 'event-card--event' : 'event-card--appointment'}`}
    >
      <div className='event-card__title'>{event.name.html}</div>
      <div className='event-card__time'>
        {timeStart} {utcOffsetStart}
      </div>

      {client && client.id !== 'HKD' && (
        <div className='popover-event__avatar'>
          <img src={client?.avatarLink} />
          <a href={client?.profileLink} onClick={(e) => e.stopPropagation()}>
            {client?.name}
          </a>
        </div>
      )}
    </div>
  )
}

export default CardEvent
