import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { searchHistoryAtom } from "@/store";
import { removeFromHistory } from "@/lib/userData"; // ✅ NEW
import { Card, Button, ListGroup, Container } from "react-bootstrap";

function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  // ✅ Prevent showing empty page during loading
  if (!searchHistory) return null;

  // ✅ Async removal from DB
  const removeHistoryClicked = async (index) => {
    const historyItem = searchHistory[index];
    setSearchHistory(await removeFromHistory(historyItem));
  };

  return (
    <Container className="mt-4">
      <h2>Search History</h2>
      <br />
      {searchHistory.length === 0 ? (
        <Card>
          <Card.Body>
            <h5>Nothing Here</h5>
            <p>No searches recorded yet.</p>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {searchHistory.map((item, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              {item}
              <Button variant="outline-danger" size="sm" onClick={() => removeHistoryClicked(index)}>
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default History;
