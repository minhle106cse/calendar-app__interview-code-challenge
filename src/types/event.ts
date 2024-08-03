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
  currency?: string
  id: string
}

export interface EventFormData {
  name: {
    html: string
  }
  description: {
    html: string
  }
  start: {
    timezone: string
    utc: string
  }
  end: {
    timezone: string
    utc: string
  }
  currency: string
}
