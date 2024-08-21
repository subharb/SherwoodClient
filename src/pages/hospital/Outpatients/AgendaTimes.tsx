import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import LinkTo from '@storybook/addon-links/react'

const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'MS training',
    allDay: true,
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: [2, 3],
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
  {
    id: 12,
    title: 'Birthday Party',
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 10,
  },
]

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 11' },
  { resourceId: 5, resourceTitle: 'Meeting room 2' },
  { resourceId: 6, resourceTitle: 'Meeting room 31' },
  { resourceId: 7, resourceTitle: 'Meeting room 31' },
  { resourceId: 8, resourceTitle: 'Meeting room 4' },
  { resourceId: 9, resourceTitle: 'Meeting room 5' },
  { resourceId: 10, resourceTitle: 'Meeting room 6' },
  { resourceId: 11, resourceTitle: 'Meeting room 7' },
  { resourceId: 12, resourceTitle: 'Meeting room 8' },

]

export default function MultiAgenda({ localizer, appointments, agendas }) {

    
        
    const { defaultDate, views } = useMemo(
        () => ({
        defaultDate: new Date(2018, 0, 29),
        views: ['day', 'work_week'],
        }),
        []
    )

  return (
    <>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.DAY}
          events={events}
          localizer={localizer}
          resourceIdAccessor="resourceId"
          resources={resourceMap}
          resourceTitleAccessor="resourceTitle"
          step={60}
          views={views}
        />
      </div>
    </>
  )
}
Resource.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}