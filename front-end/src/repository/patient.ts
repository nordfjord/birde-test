export interface MoodObservation {
  visit_id: string
  id: string
  timestamp: string
  event_type: string
  care_recipient_id: string
  caregiver_id: string
  mood: string
}
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

const baseUrl = isLocalhost ? 'http://localhost:8000' : ''

export const PatientRepository = {
  async getAllPatients() {
    const data = await fetch(`${baseUrl}/api/patients`).then((x) => x.json())
    const result = data.map(
      (x: { care_recipient_id: string }) => x.care_recipient_id
    )
    return result
  },
  async getAllMoodEventsForPatient(patient: string) {
    const observations = await fetch(
      `${baseUrl}/api/patient/${patient}/mood_observation`
    ).then((x) => x.json())

    const eventPayloads = observations.map(
      (x: any) => JSON.parse(x.payload) as MoodObservation
    )

    return eventPayloads
  },
}
