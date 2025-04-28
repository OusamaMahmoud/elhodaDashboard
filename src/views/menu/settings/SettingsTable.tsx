import { Settings } from "../../api/settingsApi";

interface ProjectsTableProps {
  headers: string[];
  lang: "en" | "ar";
  data: Settings[];
  onEdit: (id: number) => void;
}

const SettingsTable = ({ data, headers, lang, onEdit }: ProjectsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title[lang]}</td>
                <td>{item.address[lang]}</td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={() => onEdit(item.id)}
                    className="btn btn-xs bg-bruColorLight3 "
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SettingsTable;
