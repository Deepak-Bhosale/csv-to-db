export const parseCSV = (csvData) => {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',').map((h) => h.trim());
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const record = {};
    const values = lines[i].split(',').map((v) => v.trim());

    headers.forEach((header, index) => {
      const keys = header.split('.');
      let current = record;

      keys.forEach((key, idx) => {
        if (idx === keys.length - 1) {
          current[key] = values[index];
        } else {
          current[key] = current[key] || {};
          current = current[key];
        }
      });
    });

    records.push(record);
  }
  return records;
};
