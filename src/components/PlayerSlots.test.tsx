import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlayerSlots from './PlayerSlots';

vi.mock('./EmptySlot', () => ({
    default: () => <div data-testid="empty-slot">EmptySlot</div>,
}));

vi.mock('./PlayerCard', () => ({
    default: ({ nick, description, modelSource }: any) => (
        <div data-testid="player-card">
            <span>{nick}</span>
            <span>{description}</span>
            <span>{modelSource}</span>
        </div>
    ),
}));

describe('PlayerSlots', () => {
    it('renders without crashing', () => {
        render(<PlayerSlots players={[]} />);
        expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('renders three empty slots', () => {
        render(<PlayerSlots players={[]} />);
        const emptySlots = screen.getAllByTestId('empty-slot');
        expect(emptySlots).toHaveLength(3);
    });

    it('renders player cards for each player', () => {
        const players = [
            { nick: 'Player1', description: 'Desc1', modelSource: 'Source1' },
            { nick: 'Player2', description: 'Desc2', modelSource: 'Source2' },
        ];
        render(<PlayerSlots players={players} />);
        const playerCards = screen.getAllByTestId('player-card');
        expect(playerCards).toHaveLength(2);
    });

    it('passes correct props to player cards', () => {
        const players = [
            { nick: 'TestPlayer', description: 'Test Desc', modelSource: 'Test Source' },
        ];
        render(<PlayerSlots players={players} />);
        expect(screen.getByText('TestPlayer')).toBeInTheDocument();
        expect(screen.getByText('Test Desc')).toBeInTheDocument();
        expect(screen.getByText('Test Source')).toBeInTheDocument();
    });

    it('renders with empty players array', () => {
        render(<PlayerSlots players={[]} />);
        expect(screen.queryAllByTestId('player-card')).toHaveLength(0);
    });
});