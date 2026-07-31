import type { Metadata } from 'next';
import Link from 'next/link';
import { toolRegistry } from '@/lib/tools/registry';

export const metadata: Metadata = {
  title: 'Sobre Toolva',
  description: 'Toolva es una plataforma gratuita de herramientas online para calcular, convertir y resolver tareas del día a día. Sin registro, sin publicidad intrusiva.',
};

export default function SobreNosotrosPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-xl">T</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sobre Toolva</h1>
      </div>

      <div className="space-y-8 text-gray-700 dark:text-gray-300">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">¿Qué es Toolva?</h2>
          <p>Toolva es una colección de <strong>{toolRegistry.length} herramientas online gratuitas</strong> diseñadas para ayudarte con cálculos, conversiones y tareas del día a día. Calculadoras de porcentajes, conversores de unidades, generadores de contraseñas, calculadoras de hipoteca y mucho más.</p>
          <p className="mt-3">Todo funciona directamente en tu navegador, <strong>sin necesidad de registro</strong>, sin guardar tus datos y sin publicidad intrusiva.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Nuestra misión</h2>
          <p>Creemos que las herramientas útiles deberían ser accesibles para todo el mundo, gratis y sin barreras. Por eso Toolva es 100% gratuito, funciona en cualquier dispositivo y no requiere crear una cuenta.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">¿Por qué Toolva?</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span><span><strong>Gratuito y sin registro</strong> — Usa todas las herramientas sin crear cuenta.</span></li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span><span><strong>Privado</strong> — Tus datos nunca salen de tu navegador.</span></li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span><span><strong>Rápido</strong> — Resultados instantáneos, sin esperas.</span></li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span><span><strong>PWA</strong> — Funciona sin conexión a internet una vez cargado.</span></li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span><span><strong>Sin anuncios intrusivos</strong> — Publicidad discreta para mantener el servicio gratuito.</span></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Contacto</h2>
          <p>¿Tienes una sugerencia para una nueva herramienta? ¿Has encontrado un error? Escríbenos:</p>
          <a href="mailto:hola@toolva.com" className="inline-block mt-3 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
            hola@toolva.com
          </a>
        </section>

        <section className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link href="/herramientas" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
            → Ver todas las herramientas ({toolRegistry.length})
          </Link>
        </section>

      </div>
    </main>
  );
}
