import { parseCSV } from '../utils/csvParser.js';
import User from '../models/userModel.js';

export const uploadCSV = async (req, res) => {
  if (!req.files || !req.files.csv) {
    return res.status(400).send('No CSV file uploaded.');
  }

  const csvData = req.files.csv.data.toString('utf8');
  const records = await parseCSV(csvData);

  try {
    const bulkOps = records.map((record) => {
      const { name, age, address, ...additionalInfo } = record;
      const firstName = name.firstName;
      const lastName = name.lastName;

      return {
        updateOne: {
          filter: { name: `${firstName} ${lastName}` },
          update: {
            name: `${firstName} ${lastName}`,
            age,
            address,
            additional_info: additionalInfo,
          },
          upsert: true,
        },
      };
    });

    await User.bulkWrite(bulkOps);
    res.send('File successfully uploaded and data inserted.');
  } catch (error) {
    console.error('Error inserting data', error);
    res.status(500).send('Error uploading data');
  }
};
