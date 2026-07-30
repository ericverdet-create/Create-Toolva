import { Suspense } from 'react';
import SearchResults from './SearchResults';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buscar herramientas',
  robots: { index: false },
};

export default function BuscarPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Buscando...</div>}>
      <SearchResults />
    </Suspense>
  );
}
