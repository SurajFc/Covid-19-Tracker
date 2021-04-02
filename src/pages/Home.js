import { CardDeck, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import VirusTable from "../components/VirusTable";
import NumberFormat from "../utils/formatnumber";

function Home() {
  const virSmry = useSelector((state) => state.virusReducer.global);

  if (!virSmry) {
    return <div>Loading.....</div>;
  }
  return (
    <>
      <CardDeck>
        <Card bg="info" text="white" className="mb-4">
          <Card.Body>
            <Card.Title>Confirmed</Card.Title>
            <Card.Text>{NumberFormat(virSmry["TotalConfirmed"])}</Card.Text>
          </Card.Body>
        </Card>
        <Card bg="dark" text="white" className="mb-4">
          <Card.Body>
            <Card.Title>Active</Card.Title>
            <Card.Text>
              {NumberFormat(
                virSmry["TotalConfirmed"] -
                  virSmry["TotalRecovered"] -
                  virSmry["TotalDeaths"]
              )}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card bg="success" text="white" className="mb-4">
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>{NumberFormat(virSmry["TotalRecovered"])}</Card.Text>
          </Card.Body>
        </Card>
        <Card bg="danger" text="white" className="mb-4">
          <Card.Body>
            <Card.Title>Deceased</Card.Title>
            <Card.Text>{NumberFormat(virSmry["TotalDeaths"])}</Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>

      <VirusTable />
    </>
  );
}

export default Home;
