import React from "react";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { CalendarDate } from "@internationalized/date";

// Conversiones seguras
function calendarDateToJSDate(calendarDate) {
  if (!calendarDate) return null;
  return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day);
}

function jsDateToCalendarDate(date) {
  if (!date) return null;
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
}

export const CustomDatePicker = ({ value, onChange, error }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-semibold text-[#666] mb-1">
        Fecha de entrega (*)
      </label>
      <div
        className={`
        relative bg-[#f5f5f5] rounded-xl ${
          error ? "border border-red-400" : "border-none"
        }
        `}
      >
        <CalendarDays
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#888]"
          size={20}
        />
        <DatePicker
          selected={calendarDateToJSDate(value)}
          onChange={(date) => onChange(jsDateToCalendarDate(date))}
          locale={es}
          minDate={new Date()}
          placeholderText="dd/mm/aaaa"
          dateFormat="dd/MM/yyyy"
          className={`w-full rounded-xl cursor-pointer bg-[#f5f5f5] text-[#666] px-4 py-2 pr-10 focus:outline-none 
          `}
        />
      </div>
      {error && <span className="text-sm text-inactive mt-1">{error}</span>}
    </div>
  );
};
