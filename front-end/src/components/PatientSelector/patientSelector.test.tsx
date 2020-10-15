import React from 'react'
import { PatientSelector } from '.'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const server = setupServer(
  rest.get('http://localhost:8000/patients', (req, res, ctx) => {
    return res(
      ctx.json([
        { care_recipient_id: 'Patient1' },
        { care_recipient_id: 'Patient2' },
        { care_recipient_id: 'Patient3' },
      ])
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Loads and displays data from the /patients endpoint', async () => {
  const callback = jest.fn()
  const { getByText } = render(<PatientSelector onChangePatient={callback} />)
  await waitFor(() => getByText(/patient1/i))
  getByText(/patient2/i)
  getByText(/patient3/i)
})

test('Calls the onChangePatient callback when a patient is selected', async () => {
  const callback = jest.fn()
  const { getByText, getByDisplayValue } = render(
    <PatientSelector onChangePatient={callback} />
  )
  await waitFor(() => getByText(/patient1/i))
  fireEvent.change(getByDisplayValue(/select patient/i), {
    target: { value: 'Patient1' },
  })
  expect(callback).toHaveBeenCalledWith('Patient1')
})
