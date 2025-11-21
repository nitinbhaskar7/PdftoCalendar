"use client";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import useRowsContext from "@/components/providers/RowsProvider";

export default function EditableTable() {
  const { rows, setExtractedData } = useRowsContext();
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    if (rows && rows.length > 0) {
      const cols = Object.keys(rows[0]);
      setColumns(cols);
    }
  }, [rows]);
  // Extract dynamic column names from the OCR rows
  
  const updateCell = (rowIndex: number, col: string, value: string) => {
    const updated = [...rows];
    updated[rowIndex][col] = value;
    setExtractedData(updated);
    console.log(rows)
  };

  const addRow = () => {
  let currentCols = columns;

  if (currentCols.length === 0) {
    currentCols = ["Activity", "Start Date", "End Date"];
    setColumns(currentCols);
  }

  const newRow: any = {};
  currentCols.forEach((col) => {
    newRow[col] = "";
  });

  setExtractedData([...rows, newRow]);
};


  const deleteRow = (index: number) => {
    setExtractedData(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 rounded-xl border shadow-sm min-h-full max-h-screen overflow-auto">
      {rows.length === 0 ? (
        <div className="text-center text-gray-500 my-10">
          No data found. Please upload a PDF to extract data or add rows manually.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col}>{col}</TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row: any, rowIndex: number) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => (
                  <TableCell key={col}>
                    <Input
                      type={col.toLowerCase().includes("date") ? "date" : "text"}
                      value={row[col] || ""}
                      onChange={(e) => updateCell(rowIndex, col, e.target.value)}
                      
                    />
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <Button variant="destructive" onClick={() => deleteRow(rowIndex)}>
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Button onClick={addRow} variant={"secondary"} className="flex gap-2 m-auto mt-4">
        <Plus size={16} /> Add Row
      </Button>
    </div>
  );
}
