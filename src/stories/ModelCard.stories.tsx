import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import content from '../content/bz4x.json'
import { pageContentSchema } from '../content/schema'
import { ModelCard } from '../features/ModelCard/ModelCard'

const [touring, bz4x] = pageContentSchema.parse(content).models.items

const meta = {
    title: 'Features/ModelCard',
    component: ModelCard,
    parameters: { layout: 'padded' },
    tags: ['autodocs'],
} satisfies Meta<typeof ModelCard>

export default meta
type Story = StoryObj<typeof meta>

export const Touring: Story = {
    args: { model: touring },
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('heading', { level: 3, name: 'bZ4X Touring' })).toBeInTheDocument()
        await expect(canvas.getByText('NEW')).toBeInTheDocument()
        await expect(canvas.getByRole('link', { name: 'Personalise' })).toHaveAttribute(
            'href',
            touring.cta.href,
        )
    },
}

export const Bz4x: Story = {
    args: { model: bz4x },
    play: async ({ canvas }) => {
        await expect(canvas.queryByText('NEW')).not.toBeInTheDocument()
    },
}

export const Mobile: Story = {
    args: { model: touring },
    globals: { viewport: { value: 'mobile1' } },
}
