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

const sceneImages = [
    '1. Un_uovo_al_centro_della_immagine_si_vedono_bene_le_delpmaspu.png',
    '2. Corridore-3.png',
    '3 Frusta.png',
    '4. ciclista.png',
    '5. 12 Vitamine 12 proteine padella.png',
    '6.2 Un_bambino_in cucina.png',
    '7. Dodici Vitamine con padre e figlio.png',
    '8. Preparazione in cucina.png',
    '9. Uova alla bassanese.png',
    '10. morso al paninopng.png',
    '11. Primo_piano_di_un_bambino_veneto_che_ride.png',
    '12. inscatolamento.png',
    '13. Confezioni su tavolo.png',
    '14. Logo e claim.png'
];

function PresentationContent() {
    const [data, setData] = useState<AppData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    const isAdmin = searchParams.get('admin') === 'alma';

    const fetchData = async () => {
        try {
            const response = await fetch('/data/data.json'); // Fetch the static JSON file directly
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
                        PRESENTAZIONE <span className="amber-text">OFFERTA</span>
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

                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-none tracking-tighter">
        ALMA UOVA <br/><span className="amber-accent italic uppercase text-3xl md:text-5xl">Eccellenza Veneta, Energia Quotidiana.</span>
    </h1>

                <div className="text-sm md:text-base text-slate-600 font-medium max-w-3xl mx-auto text-left leading-relaxed space-y-4">
    <p>Ho iniziato facendo ricerca, raccogliendo tutti gli spot commerciali per le uova e simili, italiani e stranieri. I migliori concorrenti del settore hanno altri budget ma possiamo comunque estrarre le cose migliori dai loro e vedere come comunicano i Big del settore.</p>
    <p><strong>Osservazioni:</strong> 30 secondi per una pubblicitÃ  sono tanti, trattenere l'attenzione e raccontare una storia che non ci si annoia ad ascoltare sono i nostri due punti fondamentali, cosÃ¬ come veicolare il nostro messaggio nel modo giusto. Il ritmo del video Ã¨ dato dalla Musica e voiceover che con le diverse scene e stacchi trasportano l'osservatore fino alla fine del video.</p>
</div>
            </header>

            
                        <section className="px-4 mb-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-black mb-6 italic uppercase tracking-tighter text-center">SU COSA PUNTARE</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            'LO SPORT',
                            'POTENZIALITÃ€',
                            'LA NUTRIZIONE (PROTEINE)',
                            'LA SELEZIONE E CURA (LAVORO E IMPEGNO)',
                            'LA FAMIGLIA',
                            'IL VENETO'
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-center text-center h-full">
                                <h3 className="font-black uppercase text-sm tracking-tighter amber-text">{item}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sezione Competitor Slider */}
            <section className="px-4 mb-20">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-black mb-10 italic uppercase tracking-tighter text-center">Analisi Competitor</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: 'AIA Uova', info: 'Una storia di famiglia', videoId: 'KPiQ6K4VNWM' },
                            { title: 'CoccodÃ¬', info: 'ASMR Sound EGGsperience', videoId: 'YwQfE5fV724' },
                            { title: 'Australian Eggs', info: 'Powered by Eggs', videoId: 'fP6F2XP57xY' },
                            { title: "Eggland's Best", info: 'Make Gatherings Great', videoId: 'NJo8oeEL7eM' },
                            { title: 'AIA Uova', info: 'Per ogni occasione speciale', videoId: '-Cdv3vNcjyg' },
                            { title: 'le Naturelle', info: 'Uovo alla coque', videoId: 'czeq7d3_znw' },
                            { title: 'le Naturelle', info: 'Passione in ogni gesto', videoId: 'Vwk0svfChbc' },
                            { title: 'le Naturelle', info: 'Uova buone dal 1950', videoId: 'kvo0ociJdnQ' },
                            { title: 'Spot Uova Lago', info: '', videoId: 'PX7-GYCXEH8' },
                            { title: 'Ovito', info: "L'Uovo Fresco a Casa Tua", videoId: 'ay6Q5jWGdok' },
                        ].map((comp, idx) => (
                            <div key={idx} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-5">
                                <div className="aspect-[16/9] bg-slate-200 rounded-[2rem] mb-4 overflow-hidden">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${comp.videoId}`}
                                        title={comp.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                                <div className="px-2 text-center">
                                    <h4 className="font-black uppercase italic text-sm tracking-tight">{comp.title}</h4>
                                    {comp.info && <p className="text-xs text-slate-500 mt-1">{comp.info}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sezione Storyboard Spot 30" */}
            <section className="px-4 mb-20">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-black mb-10 italic uppercase tracking-tighter text-center">Storyboard Spot 30"</h2>

                    <div className="space-y-6">
                        {[
                            { time: '00-02 SEC', label: 'SCENA 1', desc: "Uovo, dritto, sul tavolo della cucina di casa./ viene preso dalla mano del papÃ .", voice: "L'uovo." },
                            { time: '02-04 SEC', label: 'SCENA 2', desc: "Un corridore prende fiato e si mette una cuffietta prima di ricominciare a correre.", voice: "Forza... intatta." },
                            { time: '04-06 SEC', label: 'SCENA 3', desc: "Frusta che sbatte e uovo che bolle. (Stacco netto su nuotatore che rompe la superficie di una piscina con un tuffo)", voice: "Pronta... a farsi gusto." },
                            { time: '06-08 SEC', label: 'SCENA 4', desc: "Un ciclista pedala sulle colline del Valdobbiadene/ zoom out sul panorama veneto.", voice: "Pronta... a darti lo scatto." },
                            { time: '08-10 SEC', label: 'SCENA 5', desc: "macchine che trasportano le uova. E si passa all'operaio che inscatola le uova con cura una ad una.", voice: "13 vitamine." },
                            { time: '10-12 SEC', label: 'SCENA 6', desc: "L'operaio mette l'uovo dentro la confezione sul banco di metallo. si passa alla stessa confezione ma a casa della famiglia. il bambino prende la confezione e la porta dal papÃ  ai fornelli.", voice: "Ricchezza... naturale." },
                            { time: '12-15 SEC', label: 'SCENA 7', desc: "Il papÃ  sta preparando la colazione, prende un'uovo e lo rompe al centro della padella.", voice: "Oltre 12 grammi... di proteine nobili." },
                            { time: '15-17 SEC', label: 'SCENA 8', desc: "Preparazioni varie fatte in casa con farine e mattarello e uova.", voice: "Il cuore... di mille sapori." },
                            { time: '17-20 SEC', label: 'SCENA 9', desc: "piatti completi (in ristorante e a casa) con rotazione della fotocamera, ogni secondo un piatto diverso (tutti piatti della tradizione veneta).", voice: "Dalla sfoglia fatta in casa... alla crema pasticcera." },
                            { time: '20-22 SEC', label: 'SCENA 10', desc: "Un ragazzo gioca a calcio con gli amici, poi mangia un tramezzino con l'uovo.", voice: "Per arrivare piÃ¹ lontano." },
                            { time: '22-24 SEC', label: 'SCENA 11', desc: "Bambino che ride con la bocca sporca, nello sfondo si intravede venezia.", voice: "Serve un equilibrio che dura." },
                            { time: '24-26 SEC', label: 'SCENA 12', desc: "ritorno alla cura e selezione delle uova da parte degli operatori.", voice: "Selezionato con rigore... uovo dopo uovo." },
                            { time: '26-28 SEC', label: 'SCENA 13', desc: "Tutte le confezioni delle uova Alma Uova posizionate sul tavolo.", voice: "Corriamo al tuo fianco... ogni giorno." },
                            { time: '28-30 SEC', label: 'SCENA 14', desc: "stacco finale con logo centrale e claim dello spot al centro, con panorama veneto sfuocato come sfondo.", voice: "Alma Uova. Eccellenza Veneta... Energia Quotidiana." }
                        ].map((step, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row gap-6 items-center bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
                                <div className="w-full md:w-1/3 aspect-video bg-slate-200 rounded-2xl flex items-center justify-center overflow-hidden">
                                    <MediaUploader
                                    initialUrl={data.media[`storyMedia${idx}`] || `/storyboard/${sceneImages[idx]}`}
                                    onUploadSuccess={(url) => handleMediaUpload(`storyMedia${idx}`, url)}
                                    isEditing={isEditing}
                                    placeholderText={`[Scena ${idx + 1} - ${step.label}]`}
                                />
                                </div>
                                <div className="w-full md:w-2/3 pr-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-amber-500 font-black">{step.time}</span>
                                        <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded uppercase">{step.label}</span>
                                    </div>
                                    <EditableText
                                        tagName="p"
                                        initialValue={data.texts[`storyVoice${idx}`] || `"${step.voice}"`}
                                        onSave={(val) => handleSaveText(`storyVoice${idx}`, val)}
                                        isEditing={isEditing}
                                        className="text-sm font-bold mb-1 italic"
                                    />
                                    <EditableText
                                        tagName="p"
                                        initialValue={data.texts[`storyDesc${idx}`] || step.desc}
                                        onSave={(val) => handleSaveText(`storyDesc${idx}`, val)}
                                        isEditing={isEditing}
                                        className="text-xs text-slate-500"
                                        multiline={true}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-4 mb-20 bg-slate-50 py-16 rounded-[3rem] border border-slate-100">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-black mb-6 italic uppercase tracking-tighter text-center">Music & Sound Selection</h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        {[
                            { file: 'Groovey.mp3', title: 'GROOVEY' },
                            { file: 'Drums.mp3', title: 'DRUMS' },
                            { file: 'L’uovo-Crescendo.mp3', title: 'CRESCENDO' },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 flex flex-col items-center">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3 text-amber-600">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 3v11.138A3.001 3.001 0 005 13H4a2 2 0 100 4h1a3 3 0 003-3V5.784l8-1.6V16.138A3.001 3.001 0 0015 15h-1a2 2 0 100 4h1a3 3 0 003-3V3z" />
                                    </svg>
                                </div>
                                <h4 className="font-black uppercase text-xs mb-3 tracking-tight text-center">{item.title}</h4>
                                <audio controls className="w-full">
                                    <source src={`/music/${item.file}`} type="audio/mpeg" />
                                </audio>
                            </div>
                        ))}
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
