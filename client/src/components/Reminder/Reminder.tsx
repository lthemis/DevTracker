
import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import moment from "moment";
import { Job } from './../../interfaces';
import COLORS from '../../styles/styled.constants';

const ReminderWrapper = styled.div`
height: 100%;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;

const CalendarContainer = styled.div`
display: flex;
flex-direction: column;
width: 80%;
height: 100%;
.fc-toolbar-chunk {
  display: flex;
}
.fc-col-header-cell-cushion  {
  color: ${COLORS.textSecondary};
}
.fc-daygrid-day-number {
  color: ${COLORS.textSecondary};
}
.fc-toolbar-title {
  color: ${COLORS.textSecondary};
}
margin: 1rem;
`;

const TitleContainer = styled.div`
display: flex;
width: 80%;
justify-content: center;
align-items: center;
color: white;
`;

const Title = styled.h2`
margin-bottom: 0;
margin-left: 1rem;
`;


const Reminder = ({ jobs }: { jobs: Job[] }) => {
  useEffect(() =>
    setEvents(jobs), [jobs])

  const [events, setEvents] = useState(jobs && [
    ...jobs.filter((job) => job.date_interview && job),
  ]);

  const interviews = events && [...events].map((event) => ({
    title: event.company,
    start: moment(event["date_interview"]).toDate(),
    end: moment(event["date_interview"]).toDate(),
  }));

  return (
    <>
      <ReminderWrapper>
        <TitleContainer>
          <FaIcons.FaCalendarAlt />
          <Title>
            Interview Reminders
          </Title>
        </TitleContainer>

        <CalendarContainer>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={interviews}
            height='80%'
          />
        </CalendarContainer>
      </ReminderWrapper>
    </>
  );
};

export default Reminder;
