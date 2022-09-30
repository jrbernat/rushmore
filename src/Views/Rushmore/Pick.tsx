import { getPickIndex } from "../../Utils/Snakedraft";

interface PickProps {
  pick: any;
  i: number;
  picker: string;
  color: string;
}

const Pick = (props: PickProps) => {
  const { pick, i, picker, color } = props;
  return (
    <table className="pick" style={{ outlineColor: color }}>
      <tbody>
        <tr>
          <td colSpan={1}>{getPickIndex(i)}</td>
          <td colSpan={3} style={{ color: color }}>
            {picker}
          </td>
          <td colSpan={6}>
            <div>{pick.pick}</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Pick;
