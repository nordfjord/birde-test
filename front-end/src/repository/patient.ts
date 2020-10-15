export interface MoodObservation {
  visit_id: string
  id: string
  timestamp: string
  event_type: string
  care_recipient_id: string
  caregiver_id: string
  mood: string
}

export const PatientRepository = {
  async getAllPatients() {
    const data = await fetch('http://localhost:8000/patients').then((x) =>
      x.json()
    )
    const result = data.map(
      (x: { care_recipient_id: string }) => x.care_recipient_id
    )
    return result
  },
  async getAllMoodEventsForPatient(patient: string) {
    const observations = await fetch(
      `http://localhost:8000/patient/${patient}/mood_observation`
    ).then((x) => x.json())

    const eventPayloads = observations.map(
      (x: any) => JSON.parse(x.payload) as MoodObservation
    )

    return eventPayloads
  },
}
