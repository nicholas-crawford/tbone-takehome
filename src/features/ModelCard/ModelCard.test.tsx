import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import content from '../../../public/content/bz4x.json'
import { pageContentSchema } from '../../content/schema'
import { ModelCard } from './ModelCard'

const [touring, bz4x] = pageContentSchema.parse(content).models.items

describe('ModelCard', () => {
    it('names the card with the model name as a level 3 heading', () => {
        render(<ModelCard model={touring} />)

        expect(screen.getByRole('heading', { level: 3, name: 'bZ4X Touring' })).toBeInTheDocument()
        expect(screen.getByRole('article', { name: 'bZ4X Touring' })).toBeInTheDocument()
    })

    it('shows the NEW tag only for new models', () => {
        const { unmount } = render(<ModelCard model={touring} />)
        expect(screen.getByText('NEW')).toBeInTheDocument()
        unmount()

        render(<ModelCard model={bz4x} />)
        expect(screen.queryByText('NEW')).not.toBeInTheDocument()
    })

    it('renders the tagline', () => {
        render(<ModelCard model={touring} />)

        expect(screen.getByText('Your greatest escape.')).toBeInTheDocument()
    })

    it('lists every available colour', () => {
        render(<ModelCard model={touring} />)

        const colours = screen.getByRole('list', { name: 'Available in:' })
        expect(within(colours).getAllByRole('listitem')).toHaveLength(touring.colours.length)
    })

    it('renders each spec with its footnote marker as a superscript', () => {
        render(<ModelCard model={touring} />)

        const range = screen.getByText(/Up to 488km range/)
        expect(range).toHaveTextContent('Up to 488km range[G69]')
        expect(range.querySelector('sup')).toHaveTextContent('[G69]')
        expect(screen.getByText('280kW AWD · 603L boot')).toBeInTheDocument()
        expect(screen.getByText(/1,500kg braked towing/)).toHaveTextContent(
            '1,500kg braked towing[G6] · V2L power',
        )
    })

    it('formats the price as whole Australian dollars', () => {
        render(<ModelCard model={touring} />)

        expect(screen.getByText(/\$69,990/)).toHaveTextContent('$69,990*')
    })

    it('renders the bonus note as a link', () => {
        render(<ModelCard model={touring} />)

        expect(
            screen.getByRole('link', { name: 'Eligible for $5,000 Deposit Bonus[F30]' }),
        ).toBeInTheDocument()
    })

    it('links the CTA to the model page', () => {
        render(<ModelCard model={touring} />)

        expect(screen.getByRole('link', { name: 'Personalise' })).toHaveAttribute(
            'href',
            touring.cta.href,
        )
    })
})
