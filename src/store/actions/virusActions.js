import { GLOBALALL } from "../constants";
import API from "../../utils/axios";

//Actions
const getVirusGloballAll = () => async (dispatch) => {
  const result = await API.get("summary");
  console.log("in action", result.data);

  dispatch({
    type: GLOBALALL,
    virusGlobal: result.data.Global,
    countries: result.data.Countries,
  });
};

// const getVirusGloballAll = () => {
//   return (dispatch) => {
//     API.get("summary").then((resp) => {
//       console.log("in action", resp.data);
//       dispatch({
//         type: GLOBALALL,
//         payload: resp.data,
//       });
//     });
//   };
// };

export default getVirusGloballAll;
