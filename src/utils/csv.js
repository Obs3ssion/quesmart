function parseCsvText(text) {
  const lines = text
    .split(/\r?\n|\r|\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    throw new Error("CSV must include a header row and at least one data row.");
  }

  const header = lines[0]
    .split(/,|\t|;/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (header.length < 2 || header[0] !== "hour" || header[1] !== "customers") {
    throw new Error(`Invalid header. Expected: hour,customers. Detected: ${lines[0]}`);
  }

  const errors = [];
  const rows = [];

  for (let i = 1; i < lines.length; i += 1) {
    const parts = lines[i]
      .split(/,|\t|;/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (parts.length < 2) {
      errors.push(`Row ${i + 1}: Incorrect number of columns.`);
      continue;
    }

    const hour = parts[0];
    const customers = Number.parseInt(parts[1], 10);

    if (!hour) {
      errors.push(`Row ${i + 1}: Missing hour value.`);
      continue;
    }

    if (!Number.isFinite(customers) || customers < 0 || customers > 1000) {
      errors.push(`Row ${i + 1}: Customers must be an integer between 0 and 1000.`);
      continue;
    }

    rows.push({ hour, customers });
  }

  if (errors.length) {
    throw new Error(`Validation failed:\n${errors.join("\n")}`);
  }

  if (!rows.length) {
    throw new Error("No valid rows found. Expected columns: hour, customers.");
  }

  return rows;
}

export async function parseCsvFile(file) {
  const text = await file.text();
  return parseCsvText(text);
}