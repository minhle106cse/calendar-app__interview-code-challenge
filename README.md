# My Calendar

My Calendar is a project developed using Vite and TypeScript, with ESLint integrated to ensure clean code. It leverages the Eventbrite API for event management and implements OAuth for authentication.

The technologies used in this project include React.js, Redux, and RTK Query. For the UI components and calendar functionalities, Ant Design and FullCalendar are utilized. The styling follows the 7-1 architecture pattern of Sass.

Key features of the project include CRUD operations for events through the Eventbrite API. Additionally, the project employs middleware techniques to automatically handle errors and implements route protection to ensure a fully functional application.

## Data structure to use for this screen

```
export interface Event {
  name: {
    html: string
  }
  description: {
    html: string
  }
  start: {
    timezone: string
    utc: string
    local: string
  }
  end: {
    timezone: string
    utc: string
    local: string
  }
  url: string
  currency: string
  id: string
}
```

I use this data structure because it follows the Eventbrite API request pattern. It’s clear that the event screen always includes the title, start time, and end time, which are crucial for any event. Additionally, the URL is necessary for linking to the event, and the event ID is mandatory. Currency is a property of the Eventbrite event. While it’s not needed for this demo app, it’s a required field by the API, so I’ve repurposed it as the client ID. The client structure is as follows:

```
interface Client {
  id: string
  name: string
  avatarLink: string
  profileLink: string
}
```

On the screen, we can see that the client will have an avatar, so the link to it is essential. Additionally, a link to their profile is needed, and their name and ID are mandatory.

## Recurring event

My idea for implementing the recurring event feature involves a data structure with properties for repeat mode such as "weekly," "daily," and "monthly." Additionally, there is a step interval to increase the flexibility of the recurrence feature. For example, if an event should repeat every 2 weeks, the repeat mode would be 'weekly' with a step interval of 2. Finally, an end date for the recurring event is mandatory because the event cannot be generated indefinitely.

```
 interface Recurrence{
    mode: 'daily' | 'weekly' | 'monthly' | 'yearly';
    step: number;
    endDate: string;
 }

type RecurringEvent = Event & {
  recurrence: Recurrence;
};
```

## Limitations of the Project

1. The Eventbrite API does not provide a direct way to create clients, or I have not yet found a solution to do so. Therefore, the project is still using fake data for clients.

2. Event links cannot be published because the publishing process is too complicated, as detailed below:

   Create event: https://www.eventbriteapi.com/v3/events/?token=mytoken

   Add tickets to the event: https://www.eventbriteapi.com/v3/events/aboveeventid/ticket_classes/?token=mytoken

   Publish the above event: https://www.eventbriteapi.com/v3/events/aboveeventid/publish/?token=mytoken

   After considering these steps, I believe it is beyond the scope of this small project, so I decided not to continue with publishing event links.

3. The Eventbrite API provides pagination for retrieving events, but it is not suitable for this case. What I need is to filter events by a specific time range. Although the API does offer this functionality, it is quite limited, allowing only filtering by past events, future events, or all events. This limitation forces me to fetch all events, which reduces the performance of the project.

## Lessons Learned from the Project

This project provided valuable insights into API integration and data management. I encountered challenges with the Eventbrite API's limitations, which taught me the importance of understanding API constraints and adjusting the project scope accordingly. Handling data when direct solutions are not available underscored the need for effective data management practices, while dealing with complex workflows, such as the multi-step process for event publishing, highlighted the necessity of thorough API documentation review.

Additionally, the project emphasized the importance of performance optimization. The limitations of the Eventbrite API's filtering capabilities forced me to consider efficient data handling techniques. This experience also enhanced my problem-solving skills, as I had to find creative solutions to various challenges. Using technologies like React.js, Redux, RTK Query, Ant Design, and FullCalendar improved my frontend development skills, and implementing TypeScript, Vite, and ESLint reinforced the significance of maintaining clean and scalable code.

## Future Development Plans

If I continue to develop this project, I plan to provide the service to the public. Here are the key features and enhancements I would work on:

1. Admin Board Management: Create a board for administrators to manage events and users effectively.

2. Event Sharing and Notifications: Enable users to share events with each other and receive notifications from those who share events.

3. Expand Event Types: Broaden the range of event types supported by the application to cater to diverse user needs.

4. Advanced Event Filtering: Implement advanced filtering options to allow users to filter events by type, making it easier to find specific events.

5. Auto-Generation of Important Dates: Add functionality to automatically generate important holidays, friends' birthdays, and other significant dates throughout the year, enhancing the user's calendar experience.
