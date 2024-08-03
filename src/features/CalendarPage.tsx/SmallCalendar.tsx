import { PlusCircle } from '@phosphor-icons/react'
import { Calendar } from 'antd'
import { Dayjs } from 'dayjs'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { setOpen, targetDate } from '../../store/systemSlice'

const SmallCalendar = () => {
  const dispatch = useAppDispatch()

  const header = (value: Dayjs) => (
    <div className='small-calendar__header'>
      <span>{value.format('MMMM YYYY')}</span>
      <button type='button' onClick={() => dispatch(setOpen(true))}>
        <PlusCircle /> <span>New event</span>
      </button>
    </div>
  )

  return (
    <>
      <Calendar
        className='small-calendar'
        fullscreen={false}
        headerRender={({ value }) => header(value)}
        onSelect={(date) => {
          dispatch(targetDate(date.toDate().toDateString()))
        }}
      />
    </>
  )
}

export default SmallCalendar
