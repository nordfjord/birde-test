import { createConnection } from 'mysql'

const connection = createConnection(process.env.MYSQL_CONN_STRING!)
connection.connect()

const query = (sql: string, vars: any[]) =>
  new Promise((resolve, reject) =>
    connection.query(sql, vars, (err, results) =>
      err ? reject(err) : resolve(results)
    )
  )

const eventsForPatientQuery = `
SELECT payload FROM events
WHERE care_recipient_id = ?
  AND event_type = ?
`

export function getAllEventsForPatient(id: string, event_type: string) {
  return query(eventsForPatientQuery, [id, event_type])
}

export const allPatientsQuery = `
SELECT care_recipient_id FROM events
GROUP BY care_recipient_id
`

export function getAllPatients() {
  return query(allPatientsQuery, [])
}
