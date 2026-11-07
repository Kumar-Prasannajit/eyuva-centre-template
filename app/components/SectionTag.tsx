export default function SectionTag({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-amber-500 text-[11px] font-bold tracking-[0.14em] uppercase mb-4">
      <span className="inline-block w-6 h-[2px] bg-amber-500" />
      {label}
    </div>
  );
}
