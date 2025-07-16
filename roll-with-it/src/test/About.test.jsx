import { render, screen } from '@testing-library/react'
import About from '../pages/About'

describe('About Component', () => {
  test('renders main heading', () => {
    render(<About />)
    expect(
      screen.getByRole('heading', { name: /about roll with it/i })
    ).toBeInTheDocument()
  })

  test('emphasized "roll with it" is wrapped in a <strong> tag', () => {
    render(<About />)
    const allMatches = screen.getAllByText(/roll with it/i)
    const strongText = allMatches.find((el) => el.tagName === 'STRONG')
    expect(strongText).toBeInTheDocument()
  })
})
