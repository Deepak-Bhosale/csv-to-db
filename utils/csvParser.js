import fs from 'fs';
import readline from 'readline';

export const parseCSV = async (filePath) => {
  const stream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: stream });

  const headers = [];
  const data = [];

  for await (const line of rl) {
    const values = line.split(',');

    if (headers.length === 0) {
      headers.push(...values);
    } else {
      const record = {};
      const additionalInfo = {};
      const address = {};

      headers.forEach((header, index) => {
        const value = values[index];

        if (header.startsWith('name.')) {
          record.name = record.name || {};
          record.name[header.split('.')[1]] = value;
        } else if (header.startsWith('address.')) {
          address[header.split('.')[1]] = value;
        } else {
          additionalInfo[header] = value;
        }
      });

      record.name = `${record.name.firstName} ${record.name.lastName}`;
      record.age = parseInt(additionalInfo.age);
      record.address = address;
      record.additional_info = additionalInfo;

      data.push(record);
    }
  }

  return data;
};
