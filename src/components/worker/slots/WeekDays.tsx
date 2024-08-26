import React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'; // Ensure this is imported correctly
import toast from 'react-hot-toast'; // Ensure react-hot-toast is installed and imported correctly

const WeekDays = () => {
  // Dummy data for the table
  const weekdaysData = [
    { date: '2024-08-26', reason: 'Public Holiday' },
    { date: '2024-08-27', reason: 'Sick Leave' },
    { date: '2024-08-28', reason: 'Personal Leave' },
  ];

  // Function to handle delete action
  const handleDelete = (index: number) => {
    // For now, we'll just show a toast message
    toast.success(`Deleted entry for ${weekdaysData[index].date}`);
    // Actual deletion logic will go here, such as updating state or making API calls
  };

  return (
    <div className="w-full h-3/4 flex flex-col bg-white rounded-lg shadow-2xl">
      <div className="px-3 flex bg-blue-100 w-full justify-between rounded-t-lg items-center py-2">
        <h3 className="font-semibold text-custom_navyBlue">Leaves</h3>
      </div>
      <hr />
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-sm text-gray-700">
              <th className="border-b px-4 py-2 font-medium text-left">Date</th>
              <th className="border-b px-4 py-2 text-left font-medium">Reason</th>
              <th className="border-b px-4 py-2 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {weekdaysData.map((weekday, index) => (
              <tr
                key={index}
                className="border-b text-sm text-gray-600 hover:bg-blue-100"
              >
                <td className="px-4 py-2">{weekday.date}</td>
                <td className="px-4 py-2">{weekday.reason}</td>
                <td className="flex items-center px-4 py-2">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteOutlinedIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeekDays;
