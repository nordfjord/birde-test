import { PatientRepository, MoodObservation } from '@App/repository/patient'
import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'

interface Props {
  items: MoodObservation[]
}

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
const daysShort = days.map((x) => x.slice(0, 3))

const Container = styled.div`
  max-width: 30rem;
  margin: 1rem auto;
`

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`
const TableHead = styled.thead`
  vertical-align: bottom;
`
const TableBody = styled.tbody``
const TableRow = styled.tr`
  tbody > &:nth-of-type(odd) {
    background: rgba(0, 0, 0, 0.05);
  }
`
const TableHeading = styled.th<{ align: 'left' | 'right' }>`
  text-align: ${(x) => x.align};

  border-bottom: 2px solid #ddd;
  border-top: 1px solid #ddd;
  padding: 0.5rem;
  vertical-align: middle;
`
const TableCell = styled.td<{ align: 'left' | 'right' }>`
  text-align: ${(x) => x.align};
  border-bottom: 1px solid #ddd;
  padding: 0.5rem;
  vertical-align: middle;
`

const Title = styled.h1``

export function WeekdayMood({ items }: Props) {
  const mood = useMemo(
    () =>
      items.reduce((p, v) => {
        const dayOfWeek = new Date(v.timestamp).getDay()
        if (!p[dayOfWeek]) p[dayOfWeek] = {}
        p[dayOfWeek][v.mood] = (p[dayOfWeek][v.mood] || 0) + 1
        return p
      }, {} as Record<string, Record<string, number>>),
    [items]
  )

  const happiestDayOfTheWeek = useMemo(() => {
    return Object.entries(mood).sort(
      ([, value1], [, value2]) => (value2.happy || 0) - (value1.happy || 0)
    )[0]
  }, [mood])

  return (
    <Container>
      <Title>
        {happiestDayOfTheWeek
          ? `The patients favourite day of the week is ${
              days[happiestDayOfTheWeek[0]]
            }`
          : `Select a patient to see their favourite day of the week`}
      </Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeading align="left">Day</TableHeading>
            <TableHeading align="right">Mood</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(mood).map(([key, value]) => {
            const moods = Object.entries(value).sort((a, b) => b[1] - a[1])
            return (
              <TableRow key={key}>
                <TableCell align="left">{daysShort[key]}</TableCell>
                <TableCell align="right">
                  {moods
                    .map(([mood, count]) => `${mood} (${count})`)
                    .join(', ')}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Container>
  )
}

export default function Mood({ patient }: { patient: string }) {
  const [items, setItems] = useState<MoodObservation[]>([])

  useEffect(() => {
    setItems([])
    if (!patient) return
    let cancelled = false
    PatientRepository.getAllMoodEventsForPatient(patient).then(
      (items) => !cancelled && setItems(items)
    )

    return () => {
      cancelled = true
    }
  }, [patient])

  return <WeekdayMood items={items} />
}
