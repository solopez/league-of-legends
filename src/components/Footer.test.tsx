import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
    it('renders footer with buttons and attribution text', () => {
        const mockSetShowWallpaper = vi.fn();
        render(<Footer setShowWallpaper={mockSetShowWallpaper} />);
        
        expect(screen.getByText('Buscar Partida')).toBeInTheDocument();
        expect(screen.getByText(/Models provided by/)).toBeInTheDocument();
        expect(screen.getByText('modelviewer.lol')).toBeInTheDocument();
        expect(screen.getByText('League of Legends')).toBeInTheDocument();
    });

    it('calls setShowWallpaper with true when "Buscar Partida" button is clicked', () => {
        const mockSetShowWallpaper = vi.fn();
        render(<Footer setShowWallpaper={mockSetShowWallpaper} />);
        
        const button = screen.getByText('Buscar Partida');
        fireEvent.click(button);
        
        expect(mockSetShowWallpaper).toHaveBeenCalledWith(true);
    });

    it('renders modelviewer.lol link with correct attributes', () => {
        const mockSetShowWallpaper = vi.fn();
        render(<Footer setShowWallpaper={mockSetShowWallpaper} />);
        
        const link = screen.getByText('modelviewer.lol');
        expect(link).toHaveAttribute('href', 'https://modelviewer.lol/');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders close button with X icon', () => {
        const mockSetShowWallpaper = vi.fn();
        render(<Footer setShowWallpaper={mockSetShowWallpaper} />);
        
        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();
        expect(footer.querySelector('svg')).toBeInTheDocument();
    });
});