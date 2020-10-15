import React from 'react'
import WeekdayMood from '.'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const server = setupServer(
  rest.get(
    'http://localhost:8000/patient/Patient1/mood_observation',
    (req, res, ctx) => {
      return res(
        ctx.json(
          [
            // NOTE: we purposefully omit timezone information
            // NOTE: this is because our build machine might be in the US
            // NOTE: While our development might be happening in another time zone
            // NOTE: and we want our tests to work on both machines

            // Sundays
            { timestamp: '2020-10-11T00:00:00.000', mood: 'happy' },
            { timestamp: '2020-10-04T00:00:00.000', mood: 'sad' },
            { timestamp: '2020-10-18T00:00:00.000', mood: 'sad' },

            // Mondays
            { timestamp: '2020-10-12T00:00:00.000', mood: 'happy' },
            { timestamp: '2020-10-05T00:00:00.000', mood: 'happy' },
            { timestamp: '2020-10-19T00:00:00.000', mood: 'happy' },

            // Tuesdays
            { timestamp: '2020-10-13T00:00:00.000', mood: 'okay' },
            { timestamp: '2020-10-06T00:00:00.000', mood: 'okay' },
          ].map((payload) => ({ payload: JSON.stringify(payload) }))
        )
      )
    }
  )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Shows the patients favourite day', async () => {
  const { getAllByText, getByText } = render(<WeekdayMood patient="Patient1" />)
  await waitFor(() => getAllByText(/okay/i))
  getByText(/favourite day of the week is monday/i)
})

test('Shows a table with the mood distribution', async () => {
  const { getByText } = render(<WeekdayMood patient="Patient1" />)
  await waitFor(() => getByText(/tue/i))

  // Sunday distribution
  getByText(/sad \(2\), happy \(1\)/i)

  // Monday distribution
  getByText(/happy \(3\)/i)

  // Tuesday distribution
  getByText(/okay \(2\)/i)
})
