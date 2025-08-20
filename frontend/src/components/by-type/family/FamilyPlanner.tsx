'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import EmpathyCard from '@/components/by-type/family/EmpathyCard';
import TravelerGroupCard from '@/components/by-type/family/TravelerGroupCard';
import PhotoTileCard from '@/components/by-type/family/PhotoTileCard';
import { usePlannerStore } from '@/stores/planner';

type Step = 'Intro' | 'Presupuesto' | 'Tipo de viaje' | 'Tipo de escapada';

export default function FamilyPlanner() {
  const router = useRouter();
  const { budgetTier, familyType, setBudgetTier, setFamilyType, setEscapeType } = usePlannerStore();
  const [step, setStep] = useState<Step>('Intro');

  // lee ?step del hash (#planner?step=budget)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const h = window.location.hash;
    const q = new URLSearchParams(h.split('?')[1] || '');
    if (q.get('step') === 'budget') setStep('Presupuesto');
  }, []);

  // gating
  useEffect(() => {
    if (step === 'Tipo de viaje' && !budgetTier) setStep('Presupuesto');
    if (step === 'Tipo de escapada' && !familyType) setStep('Tipo de viaje');
  }, [step, budgetTier, familyType]);

  // ---------- Presupuesto ----------
  const tiers = useMemo(
    () => [
      {
        key: 'essenza',
        title: 'Essenza — Lo esencial con estilo.',
        cta: 'Reserven fácil →',
        bullets: [
          'Hasta 350 USD · por persona',
          'Duración: Máximo 2 noches.',
          'Transporte: Low cost (buses o vuelos off-peak). Asientos, carry-on y bodega no incluidos.',
          'Fechas: Menor disponibilidad, con restricciones y bloqueos.',
          'Alojamiento: Midscale (3★ o equivalentes).',
          'Extras: Guía esencial con tips familiares (restaurantes kids-friendly, espacios de juego).',
        ],
      },
      {
        key: 'explora',
        title: 'Modo Explora — Viaje activo y flexible.',
        cta: 'Activen su modo →',
        bullets: [
          'Hasta 500 USD · por persona',
          'Duración: Hasta 3 noches.',
          'Transporte: Multimodal, horarios flexibles. En vuelos: asientos, carry-on y bodega no incluidos.',
          'Fechas: Mayor disponibilidad, con algunos bloqueos en feriados/puentes.',
          'Alojamiento: Mid-to-Upscale.',
          'Extras: Guía curada “Randomtrip Decode” con actividades para todas las edades.',
        ],
      },
      {
        key: 'exploraPlus',
        title: 'Explora+ — Más capas, más descubrimientos.',
        cta: 'Suban de nivel →',
        bullets: [
          'Hasta 850 USD · por persona',
          'Duración: Hasta 4 noches.',
          'Transporte: Multimodal. En vuelos: asientos, carry-on y bodega no incluidos.',
          'Fechas: Alta disponibilidad, incluso en feriados (con bloqueos festivos). ',
          'Alojamiento: Upscale asegurado.',
          'Extras: Decode personalizado + 1 experiencia curada familiar.',
        ],
      },
      {
        key: 'bivouac',
        title: 'Bivouac — Curaduría que se siente artesanal.',
        cta: 'Viajen distinto →',
        bullets: [
          'Hasta 1200 USD · por persona',
          'Duración: Hasta 5 noches.',
          'Transporte: Multimodal. En vuelos: asientos y carry-on incluidos; bodega no incluida.',
          'Fechas: Sin fechas bloqueadas.',
          'Alojamiento: Upper-Upscale (boutique, diseño, experiencias locales).',
          'Extras: Concierge Advisors + 1 experiencia premium familiar + perks.',
        ],
      },
      {
        key: 'atelier',
        title: 'Atelier Getaway — Distinción, sin esfuerzo.',
        cta: 'A un clic de lo inolvidable →',
        bullets: [
          'Desde 1200 USD · por persona',
          'Duración: A medida.',
          'Alojamiento: Luxury / de autor / cadenas A1.',
          'Extras: Co-creación con Luxury Travel Advisor + equipo 24/7.',
          'Incluye: 2+ experiencias premium a medida.',
          'Perks: Traslados privados, salas VIP, reservas prioritarias, regalos de marcas asociadas.',
        ],
      },
    ],
    [] // <- DEP ARRAY correcto
  );

  // ---------- Tipo de viaje ----------
  const familyItems = [
    {
      key: 'toddlers',
      title: 'Con los más chicos',
      tagline:
        'Cuando todavía hay cochecitos, mamaderas y siestas obligadas, todo cuenta… lo transformamos en juego y calma.',
      icon: '/images/placeholder/Toddlers.svg',
    },
    {
      key: 'teens',
      title: 'Con adolescentes',
      tagline: 'Secretos para que dejen el celular: primero viven, después publican.',
      icon: '/images/placeholder/Teens.svg',
    },
    {
      key: 'adults',
      title: 'Con hijos grandes',
      tagline: 'Aventuras más intensas: trekking, surf, cultura local.',
      icon: '/images/placeholder/Adult.svg',
    },
    {
      key: 'multigen',
      title: 'Con toda la familia',
      tagline: 'Nadie queda afuera. Logística y actividades para cada edad.',
      icon: '/images/placeholder/Multi-Gen.svg',
    },
  ];

  // ---------- Tipo de escapada ----------
  const escapes = [
    { key: 'aventura', title: 'Aventura en familia', img: '/images/journey-types/aventura-familiar.jpg' },
    { key: 'naturaleza', title: 'Naturaleza & fauna', img: '/images/journey-types/naturaleza-y-fauna.jpg' },
    { key: 'cultura', title: 'Cultura & tradiciones', img: '/images/journey-types/cultura-y-tradiciones.jpg' },
    { key: 'playas', title: 'Playas & Dunas', img: '/images/journey-types/playas-y-medanos.jpg' },
    { key: 'graduaciones', title: 'Graduaciones & celebraciones', img: '/images/journey-types/graduaciones-y-celebraciones.jpg' },
    { key: 'duos', title: 'Escapadas Madre-hij@ / Padre-hij@', img: '/images/journey-types/Escapadas%20madre-hija%20-%20padre-hijo.jpg' },
  ];

  // ---------- Header fijo (título + subtítulo + indicadores) ----------
  const Header = () => (
    <div className="text-center">
      <h2 className="font-display text-3xl md:text-4xl text-neutral-900">
        Comencemos a diseñar el Family Randomtrip
      </h2>
      <p className="mt-2 text-sm text-neutral-600">
        3 pasos cortos, para crear la mejor experiencia.
      </p>

      {step !== 'Intro' && (
        <ol className="mt-4 flex justify-center gap-3 text-sm text-neutral-500">
          <li
            className={
              step === 'Presupuesto'
                ? 'font-semibold text-neutral-900'
                : budgetTier
                ? 'text-neutral-900'
                : ''
            }
          >
            Presupuesto
          </li>
          <li>·</li>
          <li
            className={
              step === 'Tipo de viaje'
                ? 'font-semibold text-neutral-900'
                : familyType
                ? 'text-neutral-900'
                : ''
            }
          >
            Tipo de viaje
          </li>
          <li>·</li>
          <li className={step === 'Tipo de escapada' ? 'font-semibold text-neutral-900' : ''}>
            Tipo de escapada
          </li>
        </ol>
      )}
    </div>
  );

  // ---------- Secciones ----------
  const Intro = () => (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <Header />

      <h3 className="mt-8 text-center text-lg font-semibold text-neutral-900">
        Viajar en familia tiene sus códigos (y los entendemos)
      </h3>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 place-items-center">
        <EmpathyCard
          label="Peques"
          headline="Traslados simples, más descubrimiento."
          support="Menos horas de auto, más “¿y esto qué es?”. Ritmo pensando para los más chicos."
          color="bg-[#C77248]"
        />
        <EmpathyCard
          label="Adolescentes"
          headline="Experiencias que compiten con el WiFi."
          support="Actividades hands-on, locales y memorables. Publican después; primero viven."
          color="bg-[#2E7D73]"
        />
        <EmpathyCard
          label="Toda la familia"
          headline="Logística es nuestro superpoder."
          support="Horarios, traslados y reservas sin peleas. Todos llegan, todos disfrutan."
          color="bg-[#203643]"
        />
        <EmpathyCard
          label="Tiempo libre"
          headline="Días que fluyen sin culpas."
          support="Espacios para siestas, charlas y nada. Porque descansar también es viajar."
          color="bg-[#BE9D77]"
        />
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="#planner?step=budget"
          className="btn-primary"
          onClick={(e) => {
            e.preventDefault();
            setStep('Presupuesto');
          }}
        >
          Empezar a diseñar nuestro Family Randomtrip →
        </a>
      </div>
    </section>
  );

  // ---------- Presupuesto (CTA al fondo de cada tarjeta) ----------
  const Presupuesto = () => (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10" data-testid="tab-presupuesto">
      <Header />
      <h3 className="mt-8 text-center text-lg font-semibold text-neutral-900">
        Lo único que definen acá es el presupuesto por persona. Ese será su techo. Del resto… nos ocupamos nosotros.
      </h3>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {tiers.map((t) => (
          <div
            key={t.key}
            role="group"
            aria-labelledby={`h-${t.key}`}
            className="h-full flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition will-change-transform"
          >
            <h4 id={`h-${t.key}`} className="font-semibold text-neutral-900">
              {t.title}
            </h4>

            {/* La lista se estira para empujar el CTA al fondo */}
            <ul className="mt-3 text-sm text-neutral-700 leading-relaxed list-disc pl-5 space-y-1 flex-1">
              {t.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            {/* (opcional) línea fija igual para todas las cards */}
            <div className="mt-2 text-xs text-neutral-600">
              👨👩👧 Precio por persona (base familiar, mínimo 3 pax).
            </div>

            {/* CTA pegado al fondo + buen contraste */}
            <div className="mt-6 pt-4 border-t border-neutral-200 md:mt-auto">
              <button
                className="w-full inline-flex items-center justify-center rounded-full bg-neutral-900 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 focus:ring-offset-white"
                onClick={() => {
                  setBudgetTier(t.key);
                  setStep('Tipo de viaje');
                  document
                    .getElementById('planner')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {t.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer: Volver */}
      <div className="mt-10 flex justify-center">
        <button
          className="text-neutral-800 underline decoration-neutral-400 hover:decoration-neutral-800"
          onClick={() => setStep('Intro')}
        >
          ← Volver
        </button>
      </div>
    </section>
  );

  const TipoDeViaje = () => (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10" data-testid="tab-tipo-viaje">
      <Header />
      <h3 className="mt-8 text-center text-lg font-semibold text-neutral-900">
        De flotadores a tablas de surf: el viaje crece con tu familia.
      </h3>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {familyItems.map((it) => (
          <TravelerGroupCard
            key={it.key}
            title={it.title}
            tagline={it.tagline}
            iconSrc={it.icon}
            active={familyType === it.key}
            onSelect={() => {
              setFamilyType(it.key as any);
              setStep('Tipo de escapada');
            }}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          className="text-neutral-800 underline decoration-neutral-400 hover:decoration-neutral-800"
          onClick={() => setStep('Presupuesto')}
        >
          ← Volver
        </button>
      </div>
    </section>
  );

  const TipoDeEscapada = () => (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10" data-testid="tab-tipo-escapada">
      <Header />
      <h3 className="mt-8 text-center text-lg font-semibold text-neutral-900">
        Viajamos por muchas razones, ¿cuál los mueve hoy?
      </h3>
      <p className="mt-1 text-center text-neutral-500">
        Toda escapada tiene su “porque sí”.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {escapes.map((e) => (
          <PhotoTileCard
            key={e.key}
            title={e.title}
            src={e.img}
            onClick={() => {
              setEscapeType(e.key);
              const q = new URLSearchParams({
                from: 'families',
                budgetTier: budgetTier ?? '',
                familyType: familyType ?? '',
                escapeType: e.key,
              }).toString();
              router.push(`/journey/experience-level?${q}`);
            }}
          />
        ))}
      </div>

      {/* Footer: Volver */}
      <div className="mt-10 flex justify-center">
        <button className="text-neutral-900 underline" onClick={() => setStep('Tipo de viaje')}>
          ← Volver
        </button>
      </div>
    </section>
  );

  // ---------- Render ----------
  return (
    <div className="bg-white">
      {step === 'Intro' && <Intro />}
      {step === 'Presupuesto' && <Presupuesto />}
      {step === 'Tipo de viaje' && <TipoDeViaje />}
      {step === 'Tipo de escapada' && <TipoDeEscapada />}
    </div>
  );
}
