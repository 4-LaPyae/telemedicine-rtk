import {
    endOfDay,
    startOfYear,
    endOfYear,
    addYears,
    isSameDay,
} from "date-fns";
import {
    DateRangePicker,
    defaultStaticRanges,
} from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
// import "react-dates/initialize";

const DateRangePickerComponent = ({
    selectedDateRange,
    setSelectedDateRange,
    value,
}) => {
    const handleSelect = (ranges) => {
        setSelectedDateRange(ranges.selection);
    };
    return (
        <DateRangePicker
            onChange={handleSelect}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            ranges={[selectedDateRange]}
            months={2}
            direction="horizontal"
            staticRanges={
                value === 1
                    ? [...defaultStaticRanges]
                    : [
                          ...defaultStaticRanges,
                          {
                              label: "last year",
                              range: () => ({
                                  startDate: startOfYear(
                                      addYears(new Date(), -1)
                                  ),
                                  endDate: endOfYear(
                                      addYears(new Date(), -1)
                                  ),
                              }),
                              isSelected(range) {
                                  const definedRange = this.range();
                                  return (
                                      isSameDay(
                                          range.startDate,
                                          definedRange.startDate
                                      ) &&
                                      isSameDay(
                                          range.endDate,
                                          definedRange.endDate
                                      )
                                  );
                              },
                          },
                          {
                              label: "this year",
                              range: () => ({
                                  startDate: startOfYear(new Date()),
                                  endDate: endOfDay(new Date()),
                              }),
                              isSelected(range) {
                                  const definedRange = this.range();
                                  return (
                                      isSameDay(
                                          range.startDate,
                                          definedRange.startDate
                                      ) &&
                                      isSameDay(
                                          range.endDate,
                                          definedRange.endDate
                                      )
                                  );
                              },
                          },
                      ]
            }
        />
    );
};

export default DateRangePickerComponent;
