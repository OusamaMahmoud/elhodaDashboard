import { Fqs } from "../../api/fqsApi";

interface FqsTableProps {
  headers: string[];
  lang: "en" | "ar";
  data: Fqs[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const FqsTable = ({ data, headers, lang, onDelete, onEdit }: FqsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((fq: Fqs) => (
              <tr key={fq.id}>
                <td>{fq.answer[lang]}</td>
                <td>{fq.question[lang]}</td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={() => onDelete(fq.id)}
                    className="btn btn-xs bg-bruColorLight2 "
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onEdit(fq.id)}
                    className="btn btn-xs bg-bruColorLight3 "
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 1}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FqsTable;
