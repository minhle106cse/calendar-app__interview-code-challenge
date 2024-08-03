const eventEndpoints = Object.freeze({
  event: (organization_id: string) =>
    `/organizations/${organization_id}/events/`,
  publish: (event_id: string) => `/events/${event_id}/publish/`,
  targetEvent: (event_id: string) => `/events/${event_id}/`
})

export default eventEndpoints
