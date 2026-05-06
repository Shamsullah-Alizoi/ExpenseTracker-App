import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ModernForm() {
  const [item, setItem] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [catagory, setCatagory] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [data, setData] = useState<
    { item: string; amount: number; catagory: string }[]
  >([]);

  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    if (!item || amount === "" || !catagory) {
      setError("⚠ Please fill all fields");
      return;
    }

    setError("");

    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = { item, amount, catagory };
      setData(updatedData);
      setEditIndex(null);
    } else {
      setData([...data, { item, amount, catagory }]);
    }

    setItem("");
    setAmount("");
    setCatagory("");
  };

  const handleEdit = (index: number) => {
    const selected = data[index];
    setItem(selected.item);
    setAmount(selected.amount);
    setCatagory(selected.catagory);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const filtered = data.filter((_, i) => i !== index);
    setData(filtered);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded-4">
        <h3 className="text-center mb-4">💼 Expense Tracker</h3>

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        <div className="row g-3">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={catagory}
              onChange={(e) => setCatagory(e.target.value)}
            >
              <option value="">Category</option>
              <option value="technology">Technology</option>
              <option value="education">Education</option>
              <option value="business">Business</option>
              <option value="design">Design</option>
            </select>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-primary px-4 py-2 rounded-pill"
            onClick={handleSubmit}
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
      </div>

      <div className="card shadow mt-4 rounded-4">
        <div className="card-body">
          <table className="table table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Item</th>
                <th>Amount</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={4}>No data</td>
                </tr>
              ) : (
                data.map((d, index) => (
                  <tr key={index}>
                    <td>{d.item}</td>
                    <td>${d.amount}</td>
                    <td>
                      <span className="badge bg-secondary">{d.catagory}</span>
                    </td>

                    <td>
                      <button
                        className="action-btn edit-btn me-1"
                        onClick={() => handleEdit(index)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(index)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
