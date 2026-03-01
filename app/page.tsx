'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EditableText from '../components/ui/EditableText';
import MediaUploader from '../components/ui/MediaUploader';

interface AppData {
    texts: {
        title: string;
        subtitle: string;
        [key: string]: string; // Fallback
    };
    media: {
        step1: string;
        step2: string;
        step3: string;
        step4: string;
        step5: string;
        step6: string;
        [key: string]: string; // Fallback
    };
}

function PresentationContent() {
    const [data, setData] = useState<AppData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    const isAdmin = searchParams.get('admin') === 'alma';

    const fetchData = async () => {
        try {
            const response = await fetch('/api/data');
            if (response.ok) {
                const jsonData = await response.json();
                setData(jsonData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSaveText = async (key: string, value: string) => {
        if (!data) return;

        const newData = {
            ...data,
            texts: {
                ...data.texts,
                [key]: value,
            },
        };

        setData(newData);
        await saveToBackend(newData);
    };

    const handleMediaUpload = async (key: string, url: string) => {
        if (!data) return;

        const newData = {
            ...data,
            media: {
                ...data.media,
                [key]: url,
            },
        };

        setData(newData);
        await saveToBackend(newData);
    };

    const saveToBackend = async (newData: AppData) => {
        try {
            await fetch('/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    if (isLoading || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
                <p className="font-bold text-amber-500 animate-pulse">Caricamento...</p>
            </div>
        );
    }

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4">
                <div className="max-w-3xl mx-auto flex justify-between items-center relative">
                    <span className="font-black text-xl tracking-tighter uppercase italic">
                        Alma <span className="amber-text">Uova</span>
                    </span>
                    <div className="text-[10px] font-bold bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-widest">
                        Documento Strategico
                    </div>

                    {/* Edit Mode Toggle */}
                    {isAdmin && (
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`absolute -right-20 top-0 text-xs font-bold px-4 py-2 rounded-full transition-colors ${isEditing
                                ? 'bg-amber-500 text-white shadow-lg'
                                : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                                }`}
                        >
                            {isEditing ? 'Esci Modifica' : 'Modifica'}
                        </button>
                    )}
                </div>
            </nav>

            <header className="px-6 py-16 text-center max-w-3xl mx-auto">
                <div className="inline-block px-4 py-1 mb-6 border border-amber-200 bg-amber-50 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-700">
                    Analisi di Mercato & Strategia Creativa
                </div>

                <EditableText
                    tagName="h1"
                    initialValue={data.texts.title}
                    onSave={(val) => handleSaveText('title', val)}
                    isEditing={isEditing}
                    multiline={true}
                    className="text-4xl md:text-6xl font-black mb-6 leading-none tracking-tighter"
                />

                <EditableText
                    tagName="p"
                    initialValue={data.texts.subtitle}
                    onSave={(val) => handleSaveText('subtitle', val)}
                    isEditing={isEditing}
                    multiline={true}
                    className="text-lg text-slate-600 font-medium max-w-xl mx-auto"
                />
            </header>

            <section className="px-4 mb-16">
                <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
                    {/* Pillar 1 */}
                    <div className="bg-white p-8 rounded-custom shadow-sm border border-slate-100 text-center">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </div>
                        <h3 className="font-black uppercase text-sm mb-2 tracking-tighter">L'Uovo Veneto</h3>
                        <p className="text-xs text-slate-500">Il legame indissolubile con la nostra terra come garanzia di origine e qualità superiore.</p>
                    </div>

                    {/* Pillar 2 */}
                    <div className="bg-white p-8 rounded-custom shadow-sm border border-slate-100 text-center">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h3 className="font-black uppercase text-sm mb-2 tracking-tighter">Sport & Proteine</h3>
                        <p className="text-xs text-slate-500">Un pilastro moderno che attira chi cerca energia naturale per uno stile di vita attivo.</p>
                    </div>

                    {/* Pillar 3 */}
                    <div className="bg-white p-8 rounded-custom shadow-sm border border-slate-100 text-center">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="font-black uppercase text-sm mb-2 tracking-tighter">Lavoro & Impegno</h3>
                        <p className="text-xs text-slate-500">La dedizione di persone esperte che si prendono cura di ogni fase, senza banalità.</p>
                    </div>
                </div>
            </section>

            
            {/* Sezione Competitor Slider */}
            <section className="px-4 mb-20">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-black mb-6 italic uppercase tracking-tighter text-center">Analisi Competitor</h2>
                    <p className="text-center text-slate-500 text-xs mb-10 uppercase tracking-widest">Riferimenti e benchmark del settore</p>
                    
                    <div className="flex overflow-x-auto pb-8 gap-6 snap-x scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <div key={num} className="min-w-[300px] md:min-w-[350px] snap-center bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-5">
                                <div className="aspect-[9/16] bg-slate-200 rounded-[2rem] mb-4 overflow-hidden flex items-center justify-center">
                                    <MediaUploader
                                        initialUrl={data.media[`compVideo${num}`] || ''}
                                        onUploadSuccess={(url) => handleMediaUpload(`compVideo${num}`, url)}
                                        isEditing={isEditing}
                                        placeholderText={`[Video Competitor ${num}]`}
                                    />
                                </div>
                                <div className="px-2">
                                    <EditableText
                                        tagName="h4"
                                        initialValue={data.texts[`compTitle${num}`] || `Competitor ${num}`}
                                        onSave={(val) => handleSaveText(`compTitle${num}`, val)}
                                        isEditing={isEditing}
                                        className="font-black uppercase italic text-sm tracking-tight text-center"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-2 md:hidden">
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Scorri lateralmente →</span>
                    </div>
                </div>
            </section>
<section className="px-4 mb-20">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-black mb-10 italic uppercase tracking-tighter text-center">Storyboard Spot 30"</h2>

                    <div className="space-y-8">
                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row gap-6 items-center bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
                            <div className="w-full md:w-1/3 aspect-video bg-slate-200 rounded-2xl flex items-center justify-center overflow-hidden">
                                <MediaUploader
                                    initialUrl={data.media.step1}
                                    onUploadSuccess={(url) => handleMediaUpload('step1', url)}
                                    isEditing={isEditing}
                                    placeholderText="[Immagine Macro Uovo]"
                                />
                            </div>
                            <div className="w-full md:w-2/3 pr-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-amber-500 font-black">0-5 SEC</span>
                                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded uppercase">Location: Azienda</span>
                                </div>
                                <p className="text-sm font-bold mb-1 italic">"Ogni mattina, la nostra terra ci dà il meglio."</p>
                                <p className="text-xs text-slate-500">Dettaglio macro di un uovo Alma. Una mano esperta di un professionista lo seleziona con cura millimetrica tra gli altri.</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col md:flex-row gap-6 items-center bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
                            <div className="w-full md:w-1/3 aspect-video bg-slate-200 rounded-2xl flex items-center justify-center overflow-hidden">
                                <MediaUploader
                                    initialUrl={data.media.step2}
                                    onUploadSuccess={(url) => handleMediaUpload('step2', url)}
                                    isEditing={isEditing}
                                    placeholderText="[Dettaglio Mani & Lavoro]"
                                />
                            </div>
                            <div className="w-full md:w-2/3 pr-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-amber-500 font-black">5-10 SEC</span>
                                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded uppercase">Location: Packaging</span>
                                </div>
                                <p className="text-sm font-bold mb-1 italic">"Un'attenzione che è passione pura, di chi questo mestiere lo vive."</p>
                                <p className="text-xs text-slate-500">Inquadratura delle mani di un professionista che controlla le confezioni. Ripresa di tutte le tipologie di packaging schierate.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col md:flex-row gap-6 items-center bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
                            <div className="w-full md:w-1/3 aspect-video bg-slate-200 rounded-2xl flex items-center justify-center overflow-hidden">
                                <MediaUploader
                                    initialUrl={data.media.step3}
                                    onUploadSuccess={(url) => handleMediaUpload('step3', url)}
                                    isEditing={isEditing}
                                    placeholderText="[Sport & Energia]"
                                />
                            </div>
                            <div className="w-full md:w-2/3 pr-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-amber-500 font-black">10-15 SEC</span>
                                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded uppercase">Location: Cucina Moderna</span>
                                </div>
                                <p className="text-sm font-bold mb-1 italic">"Proteine nobili per chi non si ferma mai. Forza naturale."</p>
                                <p className="text-xs text-slate-500">Un giovane sportivo prepara una colazione proteica. Il tuorlo è di un arancione vivo, perfetto. Movimenti veloci e dinamici.</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex flex-col md:flex-row gap-6 items-center bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
                            <div className="w-full md:w-1/3 aspect-video bg-slate-200 rounded-2xl flex items-center justify-center overflow-hidden">
                                <MediaUploader
                                    initialUrl={data.media.step4}
                                    onUploadSuccess={(url) => handleMediaUpload('step4', url)}
                                    isEditing={isEditing}
                                    placeholderText="[Allevatore & Natura]"
                                />
                            </div>
                            <div className="w-full md:w-2/3 pr-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-amber-500 font-black">15-20 SEC</span>
                                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded uppercase">Location: Allevamento</span>
                                </div>
                                <p className="text-sm font-bold mb-1 italic">"Rispettiamo i tempi della natura, per portarvi solo il meglio."</p>
                                <p className="text-xs text-slate-500">Un allevatore raccoglie le uova in una location suggestiva. Atmosfera calda e realistica (Ripresa reale o integrazione AI di alta qualità).</p>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="flex flex-col md:flex-row gap-6 items-center bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
                            <div className="w-full md:w-1/3 aspect-video bg-slate-200 rounded-2xl flex items-center justify-center overflow-hidden">
                                <MediaUploader
                                    initialUrl={data.media.step5}
                                    onUploadSuccess={(url) => handleMediaUpload('step5', url)}
                                    isEditing={isEditing}
                                    placeholderText="[Preparazione Gourmet]"
                                />
                            </div>
                            <div className="w-full md:w-2/3 pr-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-amber-500 font-black">20-25 SEC</span>
                                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded uppercase">Location: Studio</span>
                                </div>
                                <p className="text-sm font-bold mb-1 italic">"Dall'esperienza alla vostra tavola. Ogni singolo giorno."</p>
                                <p className="text-xs text-slate-500">Rallenty di un uovo che viene aperto. La consistenza è perfetta. Si vede la gamma completa delle confezioni Alma Uova.</p>
                            </div>
                        </div>

                        {/* Step 6 */}
                        <div className="flex flex-col md:flex-row gap-6 items-center bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
                            <div className="w-full md:w-1/3 aspect-video bg-slate-200 rounded-2xl flex items-center justify-center overflow-hidden">
                                <MediaUploader
                                    initialUrl={data.media.step6}
                                    onUploadSuccess={(url) => handleMediaUpload('step6', url)}
                                    isEditing={isEditing}
                                    placeholderText="[Logo & Jingle]"
                                />
                            </div>
                            <div className="w-full md:w-2/3 pr-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-amber-500 font-black">25-30 SEC</span>
                                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded uppercase">Chiusura</span>
                                </div>
                                <p className="text-sm font-bold mb-1 italic">"Alma Uova. L'anima veneta in ogni guscio."</p>
                                <p className="text-xs text-slate-500">Logo a tutto schermo. Jingle musicale personalizzato creato con sistemi vocali e sonori avanzati.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4 mb-20 bg-slate-900 py-16 text-white overflow-hidden">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-black mb-10 italic uppercase tracking-tighter amber-accent">Tecnologia & Tempi</h2>

                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <span className="w-1.5 h-6 amber-bg rounded-full"></span>
                                Professional Tools & AI
                            </h3>
                            <ul className="text-xs text-slate-400 space-y-4">
                                <li><strong className="text-white uppercase">Visivo:</strong> Utilizzo di AI generativa per ricreare scenari naturali complessi e ottimizzare il Color Grading per un risultato "food" irresistibile.</li>
                                <li><strong className="text-white uppercase">Audio & Jingle:</strong> Creazione di una colonna sonora ad-hoc e di un jingle distintivo tramite sistemi di sintesi sonora avanzati.</li>
                                <li><strong className="text-white uppercase">Voice Over:</strong> Opzione voce originale della titolare per massima autenticità o voce professionale via AI per perfezione tecnica.</li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <span className="w-1.5 h-6 amber-bg rounded-full"></span>
                                Timeline di Produzione
                            </h3>
                            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                                <p className="text-xs font-bold uppercase text-amber-500 mb-2 tracking-widest">Durata: 3 Settimane</p>
                                <p className="text-sm leading-relaxed text-slate-300">
                                    <strong>Inizio: Metà Aprile</strong><br />
                                    <strong>Consegna: Metà Maggio</strong>
                                </p>
                                <p className="text-[10px] mt-4 text-slate-500 italic">Prevede due sessioni di ripresa in azienda per catturare l'anima reale del lavoro.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="offerta" className="px-4 pb-20">
                <div className="max-w-xl mx-auto bg-white p-10 rounded-[2.5rem] border-2 border-slate-900 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-black px-6 py-2 uppercase tracking-tighter rotate-0">Offerta Finale</div>
                    <h2 className="text-3xl font-black text-center mb-10 italic uppercase tracking-tighter">Investimento Progetto</h2>

                    <div className="space-y-5 mb-10 text-sm">
                        <div className="flex justify-between border-b border-slate-100 pb-3 font-medium">
                            <span className="text-slate-500">Strategia, Regia e Comunicazione</span>
                            <span className="font-bold">700 €</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-3 font-medium">
                            <span className="text-slate-500">Shooting e Realizzazione Video</span>
                            <span className="font-bold">1.400 €</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-3 font-medium">
                            <span className="text-slate-500">Post-produzione, Sound Design e Voiceover</span>
                            <span className="font-bold">1.400 €</span>
                        </div>
                    </div>

                    <div className="text-center bg-slate-50 p-8 rounded-3xl mb-10">
                        <div className="text-6xl font-black text-slate-900 tracking-tighter">3.500 €</div>
                        <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Prezzo Finito (Escluso IVA)</p>
                    </div>

                    <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl active:scale-95 transition-transform">
                        Inizia il Progetto
                    </button>
                </div>
            </section>

            <footer className="py-10 text-center text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                Alma Uova | Vita Genuina | 2024
            </footer>
        </>
    );
}

export default function PresentationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900"><p className="font-bold text-amber-500 animate-pulse">Caricamento...</p></div>}>
            <PresentationContent />
        </Suspense>
    );
}
