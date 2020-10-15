import { PatientRepository } from '@App/repository/patient'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Select = styled.select`
  height: 2rem;
  padding: 0.5rem;
  vertical-align: middle;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  outline: 0;

  // appearance: none;
`

interface Props {
  onChangePatient: (id: string) => void
}
export function PatientSelector({ onChangePatient }: Props) {
  const [availablePatients, setAvailablePatients] = useState<string[]>([])

  useEffect(() => {
    let cancelled = false
    PatientRepository.getAllPatients().then(
      (patients) => !cancelled && setAvailablePatients(patients)
    )

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Select onChange={(ev) => onChangePatient(ev.currentTarget.value)}>
      <option value="">Select Patient</option>
      {availablePatients.map((x) => (
        <option key={x} value={x}>
          {x}
        </option>
      ))}
    </Select>
  )
}
