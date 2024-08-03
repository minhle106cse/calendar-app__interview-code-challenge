import BigCalendar from '../features/CalendarPage.tsx/BigCalendar'
import EventForm from '../features/CalendarPage.tsx/EventForm'
import SmallCalendar from '../features/CalendarPage.tsx/SmallCalendar'
import UpcomingEvents from '../features/CalendarPage.tsx/UpcomingEvents'

const CalendarPage = () => {
  return (
    <div className='calendar-page'>
      <aside>
        <article>
          <SmallCalendar />
        </article>
        <article>
          <UpcomingEvents />
        </article>
      </aside>
      <main>
        <BigCalendar />
      </main>
      <EventForm />
    </div>
  )
}

export default CalendarPage
