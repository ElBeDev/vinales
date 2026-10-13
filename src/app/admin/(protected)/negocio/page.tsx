import { ContentEditor } from "@/components/admin/ContentEditor";
import { getSettings } from "@/lib/content";
import { SETTINGS_FIELDS } from "@/lib/settings";
import { saveSettings } from "../actions";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <h1 className="text-2xl font-semibold">Info del negocio</h1>
      <p className="mt-1 text-sm text-ink/60">
        Datos que se usan en todo el sitio: contacto, horario, redes, menú y cómo se ve en Google.
      </p>
      <div className="mt-6">
        <ContentEditor
          fields={SETTINGS_FIELDS}
          initial={settings as unknown as Record<string, unknown>}
          save={saveSettings}
          previewHref="/es#contacto"
        />
      </div>
    </div>
  );
}
