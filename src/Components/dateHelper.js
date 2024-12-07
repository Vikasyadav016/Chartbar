// import { startOfMonth, endOfMonth, eachWeekOfInterval, format } from 'date-fns';

// Helper to get weeks in the month
// export const getWeeksInMonth = (date) => {
//   const weeks = eachWeekOfInterval({
//     start: startOfMonth(date),
//     end: endOfMonth(date)
//   });
//   return weeks.map((weekStart) => ({
//     start: weekStart,
//     end: format(weekStart, 'yyyy-MM-dd')
//   }));
// };




import { startOfMonth, endOfMonth, eachWeekOfInterval, addDays } from 'date-fns';

// Helper to get weeks in the month
export const getWeeksInMonth = (date) => {
  const weeks = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date)
  });

  // Format the weeks into start and end date for easier use
  return weeks.map((weekStart) => {
    const weekEnd = addDays(weekStart, 6); // End of the week is 6 days after the start
    return {
      start: weekStart,
      end: weekEnd
    };
  });
};
