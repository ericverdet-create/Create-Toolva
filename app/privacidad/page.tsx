import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Toolva. Información sobre el uso de datos y cookies.',
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Política de Privacidad</h1>
      <p className="text-sm text-gray-400 mb-8">Última actualización: julio 2026</p>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">1. Responsable</h2>
          <p>Toolva es un proyecto web de herramientas online gratuitas disponible en <strong>toolva.com</strong>. Para cualquier consulta relacionada con privacidad, puedes contactar en: <a href="mailto:hola@toolva.com" className="text-indigo-600 hover:underline">hola@toolva.com</a></p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">2. Datos que recopilamos</h2>
          <p>Toolva <strong>no requiere registro</strong> y no recopila datos personales identificables. Las herramientas funcionan completamente en tu navegador.</p>
          <p className="mt-2">Podemos recopilar datos anónimos de uso a través de:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Google Analytics</strong> (si está activado): visitas, páginas vistas y datos de sesión anónimos.</li>
            <li><strong>Google AdSense</strong>: puede usar cookies para mostrar anuncios relevantes según tus intereses.</li>
            <li><strong>Datos técnicos</strong>: dirección IP, tipo de navegador, sistema operativo (logs del servidor, anónimos).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">3. Cookies</h2>
          <p>Toolva usa cookies técnicas necesarias para el funcionamiento de la web (preferencias de tema, etc.) y puede usar cookies de terceros para publicidad (Google AdSense) y analítica (Google Analytics).</p>
          <p className="mt-2">Puedes desactivar las cookies en la configuración de tu navegador en cualquier momento.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">4. Uso de los datos</h2>
          <p>Los datos anónimos de uso se utilizan exclusivamente para:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Mejorar las herramientas y la experiencia de usuario.</li>
            <li>Analizar qué herramientas son más utilizadas.</li>
            <li>Mostrar publicidad relevante a través de Google AdSense.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">5. Publicidad</h2>
          <p>Toolva puede mostrar anuncios de Google AdSense. Google usa cookies para mostrar anuncios basados en visitas anteriores a este u otros sitios web. Puedes optar por no recibir anuncios personalizados en <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Configuración de anuncios de Google</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">6. Tus derechos</h2>
          <p>Conforme al RGPD y la LOPDGDD tienes derecho a acceder, rectificar y suprimir tus datos. Al no recopilar datos personales identificables, no aplicamos tratamientos de datos personales. Para cualquier consulta, escríbenos a <a href="mailto:hola@toolva.com" className="text-indigo-600 hover:underline">hola@toolva.com</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">7. Cambios en esta política</h2>
          <p>Podemos actualizar esta política ocasionalmente. Te recomendamos revisarla periódicamente. Los cambios entran en vigor en el momento de su publicación.</p>
        </section>

      </div>
    </main>
  );
}
