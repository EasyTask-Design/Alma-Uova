import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Alma Uova | Strategia Video 2024',
    description: 'Documento Strategico',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="it">
            <body className="bg-slate-50 text-slate-900 leading-tight">
                {children}
            </body>
        </html>
    );
}
