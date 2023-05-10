import "./datePicker.css";
export function DatePicker({
  onChange,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  function getTodayAsString(){
    const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
const day = currentDate.getDate().toString().padStart(2, '0'); 
return `${year}-${month}-${day}`;
  }
  const today = getTodayAsString();
  return (
    <input
      type="date"
      name="time"
      className="date-picker"
      onChange={onChange}
      defaultValue={today}
    ></input>
  );
}
