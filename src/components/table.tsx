export default function Table({ columns, rows }:{ columns: string[], rows: (string|number)[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            {columns.map((c,i)=>(<th key={i} className="text-left py-2 px-3 text-zinc-400">{c}</th>))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((r,ri)=>(
            <tr key={ri} className="hover:bg-white/5">
              {r.map((cell,ci)=>(<td key={ci} className="py-2 px-3">{cell}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
