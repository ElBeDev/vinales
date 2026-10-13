"use client";

import Link from "next/link";
import { useOptimistic, useTransition } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  deleteSection,
  duplicateSection,
  reorderSections,
  setSectionVisible,
} from "@/app/admin/(protected)/actions";

export type SectionSummary = {
  id: number;
  type: string;
  typeLabel: string;
  summary: string;
  visible: boolean;
};

export function SectionList({ sections }: { sections: SectionSummary[] }) {
  const [, startTransition] = useTransition();
  const [items, setItems] = useOptimistic(sections);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const move = (next: SectionSummary[]) =>
    startTransition(async () => {
      setItems(next);
      await reorderSections(next.map((s) => s.id));
    });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const from = items.findIndex((s) => s.id === active.id);
    const to = items.findIndex((s) => s.id === over.id);
    move(arrayMove(items, from, to));
  };

  const toggle = (s: SectionSummary) =>
    startTransition(async () => {
      setItems(items.map((i) => (i.id === s.id ? { ...i, visible: !s.visible } : i)));
      await setSectionVisible(s.id, !s.visible);
    });

  const remove = (s: SectionSummary) => {
    if (!confirm(`¿Eliminar la sección «${s.summary || s.typeLabel}»? No se puede deshacer.`)) return;
    startTransition(async () => {
      setItems(items.filter((i) => i.id !== s.id));
      await deleteSection(s.id);
    });
  };

  return (
    <DndContext id="sections" sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={items.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <ul className="space-y-2">
          {items.map((s, i) => (
            <Row
              key={s.id}
              section={s}
              first={i === 0}
              last={i === items.length - 1}
              onUp={() => move(arrayMove(items, i, i - 1))}
              onDown={() => move(arrayMove(items, i, i + 1))}
              onToggle={() => toggle(s)}
              onDuplicate={() => startTransition(() => duplicateSection(s.id))}
              onDelete={() => remove(s)}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

function Row({
  section,
  first,
  last,
  onUp,
  onDown,
  onToggle,
  onDuplicate,
  onDelete,
}: {
  section: SectionSummary;
  first: boolean;
  last: boolean;
  onUp: () => void;
  onDown: () => void;
  onToggle: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`card flex items-center gap-3 p-3 ${isDragging ? "relative z-10 shadow-lg" : ""} ${
        section.visible ? "" : "bg-paper/60"
      }`}
    >
      <button
        className="touch-none cursor-grab px-1 text-lg text-ink/30 hover:text-ink active:cursor-grabbing"
        aria-label="Arrastrar para reordenar"
        {...attributes}
        {...listeners}
      >
        ⠿
      </button>

      <Link href={`/admin/secciones/${section.id}`} className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gold">{section.typeLabel}</p>
        <p className={`truncate text-sm font-medium ${section.visible ? "" : "text-ink/40"}`}>
          {section.summary || "Sin título"}
          {!section.visible && <span className="ml-2 text-xs font-normal">(oculta)</span>}
        </p>
      </Link>

      <div className="flex shrink-0 items-center gap-1">
        <button className="btn-icon hidden sm:inline-flex" onClick={onUp} disabled={first} aria-label="Subir">↑</button>
        <button className="btn-icon hidden sm:inline-flex" onClick={onDown} disabled={last} aria-label="Bajar">↓</button>
        <button
          className={`btn-icon w-auto px-2 text-xs font-semibold ${section.visible ? "text-green-700" : ""}`}
          onClick={onToggle}
          title={section.visible ? "Ocultar del sitio" : "Mostrar en el sitio"}
        >
          {section.visible ? "Visible" : "Oculta"}
        </button>
        <button className="btn-icon" onClick={onDuplicate} aria-label="Duplicar" title="Duplicar">⧉</button>
        <button className="btn-icon hover:border-red hover:text-red" onClick={onDelete} aria-label="Eliminar" title="Eliminar">
          ✕
        </button>
      </div>
    </li>
  );
}
