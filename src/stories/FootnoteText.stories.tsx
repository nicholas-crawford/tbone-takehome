import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { FootnoteText } from '../components/FootnoteText/FootnoteText'

const meta = {
    title: 'Components/FootnoteText',
    component: FootnoteText,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <p className="text-[12.5px]">
                <Story />
            </p>
        ),
    ],
} satisfies Meta<typeof FootnoteText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { text: 'Up to 488km range[G69]' },
    play: async ({ canvasElement }) => {
        await expect(canvasElement.querySelector('sup')).toHaveTextContent('[G69]')
    },
}

export const MultipleMarkers: Story = {
    args: { text: '1,500kg braked towing[G6] · Up to 591km range[G66]' },
}

export const NoMarkers: Story = {
    args: { text: '280kW AWD · 603L boot' },
}
