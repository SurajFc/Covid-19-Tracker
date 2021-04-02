import { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import API from "../utils/axios";
import { Pie } from "react-chartjs-2";

function Country() {
  let slug = useParams("slug");
  const location = useLocation();
  console.log(location);

  let history = useHistory();
  const loadCountry = () => {
    API.get(`country/${slug.slug}`).then((res) => {
      console.log("country data", res.data);
      setCountry(res.data);
    });
  };
  useEffect(() => {
    if (location.data) {
      loadCountry();
    }
    return () => setCountry([]);
  }, []);

  const [country, setCountry] = useState([]);

  if (location.data === undefined) {
    console.log("in heree");
    return <> {history.push("/")} </>;
  }

  const state = {
    labels: ["Active", "Deaths", "Recovered"],
    datasets: [
      {
        backgroundColor: ["#343A40", "#DE4E46", "#62A945"],
        hoverBackgroundColor: ["#501800", "#2FDE00", "#4B5000"],
        data: [
          location.data["TotalConfirmed"] -
            location.data["TotalDeaths"] -
            location.data["TotalRecovered"],
          location.data["TotalDeaths"],
          location.data["TotalRecovered"],
        ],
      },
    ],
  };

  // const redirectAccess = () => {
  //   console.log;
  //   history.replace("/");
  // };

  return (
    <div>
      <p className="text-capitalize">{slug.slug}</p>
      <Pie
        data={state}
        options={{
          title: {
            display: true,
            text: "Total Covid Cases",
            fontSize: 22,
          },
          legend: {
            display: true,
            position: "right",
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                var total = meta.total;
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = parseFloat(
                  ((currentValue / total) * 100).toFixed(1)
                );
                return currentValue + " (" + percentage + "%)";
              },
            },
          },
        }}
      />
    </div>
  );
}

export default Country;
