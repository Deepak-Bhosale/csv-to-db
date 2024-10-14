import { parseCSV } from '../utils/csvParser.js';
import User from '../models/User.js';

export const uploadCSVHandler = async (req, res) => {
  try {
    const data = await parseCSV(process.env.CSV_PATH);

    await User.insertMany(data);
    console.log('Data uploaded successfully!');

    // Generate Age Distribution Report
    const totalUsers = await User.countDocuments();
    const ageGroups = [
      { range: '< 20', count: await User.countDocuments({ age: { $lt: 20 } }) },
      {
        range: '20 to 40',
        count: await User.countDocuments({ age: { $gte: 20, $lt: 40 } }),
      },
      {
        range: '40 to 60',
        count: await User.countDocuments({ age: { $gte: 40, $lt: 60 } }),
      },
      { range: '> 60', count: await User.countDocuments({ age: { $gt: 60 } }) },
    ];

    console.log('Age-Group % Distribution');
    ageGroups.forEach((group) => {
      const percentage = (group.count / totalUsers) * 100;
      console.log(`${group.range}: ${percentage.toFixed(2)}%`);
    });

    res.status(200).json({ message: 'Data processed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to process data.' });
  }
};
