import React from "react";

const Table = ({ columns, renderRow, data }) => {
    return (
      <table className="w-full mt-4">
        <thead>
          <tr className="text-left text-gray-500 text-sm">
            {columns.map((col) => (
              <th key={col.accessor} className={col.className}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <React.Fragment key={item.id || idx}>
              {renderRow(item)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;
  