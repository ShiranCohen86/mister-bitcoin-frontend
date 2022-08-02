import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";

export const Chart = ({ title, data, description }) => {
  return (
    <div className="chart">
      <Sparklines data={data}>
        <SparklinesLine color="red" />
        <SparklinesSpots size={1} />
      </Sparklines>
    </div>
  );
};
