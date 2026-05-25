import React, { useEffect, useState } from 'react';

function App() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    notes: '',
    expiryDate: '',
    quantity: '',
    price: '',
    brand: ''
  });

  const fetchMedicines = async () => {
    try {
      const response = await fetch('https://fuzzy-waffle-7xpr9v59gqfvrx-5000.app.github.dev/api/Medicines');
      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const addMedicine = async (e) => {
    e.preventDefault();

    try {
      await fetch('https://fuzzy-waffle-7xpr9v59gqfvrx-5000.app.github.dev/api/Medicines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          price: Number(form.price)
        })
      });

      setForm({
        fullName: '',
        notes: '',
        expiryDate: '',
        quantity: '',
        price: '',
        brand: ''
      });

      fetchMedicines();
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = medicines.filter((m) =>
    m.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const getRowClass = (medicine) => {
    const expiryDate = new Date(medicine.expiryDate);
    const today = new Date();

    const daysLeft =
      (expiryDate - today) / (1000 * 60 * 60 * 24);

    if (daysLeft < 30) {
      return 'red';
    }

    if (medicine.quantity < 10) {
      return 'yellow';
    }

    return '';
  };

  return (
    <div className="container">
      <h1>ABC Pharmacy Medicines</h1>

      <input
        type="text"
        placeholder="Search medicine"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={addMedicine}>
        <input
          type="text"
          placeholder="Medicine Name"
          value={form.fullName}
          onChange={(e) =>
            setForm({ ...form, fullName: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) =>
            setForm({ ...form, notes: e.target.value })
          }
        />

        <input
          type="date"
          value={form.expiryDate}
          onChange={(e) =>
            setForm({ ...form, expiryDate: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
          required
        />

        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Brand"
          value={form.brand}
          onChange={(e) =>
            setForm({ ...form, brand: e.target.value })
          }
          required
        />

        <button type="submit">Add Medicine</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Expiry Date</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Brand</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((medicine) => (
            <tr
              key={medicine.id}
              className={getRowClass(medicine)}
            >
              <td>{medicine.fullName}</td>
              <td>
                {medicine.expiryDate?.split('T')[0]}
              </td>
              <td>{medicine.quantity}</td>
              <td>{medicine.price}</td>
              <td>{medicine.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;