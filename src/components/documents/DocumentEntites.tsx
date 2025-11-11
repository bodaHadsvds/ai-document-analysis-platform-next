
interface Entity {
  value: string;
  type: string;
}

export default function DocumentEntities({ entities }: { entities: Entity[] }) {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-orange-700 text-sm">🏷️ Extracted Entities</h4>
      <div className="flex flex-wrap gap-2">
        {entities.map((e, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium"
          >
            {e.value} <span className="text-gray-800">({e.type})</span>
          </span>
        ))}
      </div>
    </div>
  );
}
