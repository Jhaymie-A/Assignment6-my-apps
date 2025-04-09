import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Row, Col, Card, Container } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  return (
    <Container className="mt-4">
      <h2>My Favourite Artworks</h2>
      <br />

      {favouritesList.length === 0 ? (
        <Card>
          <Card.Body>
            <h5>Nothing Here</h5>
            <p>Try adding some new artwork to the list.</p>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {favouritesList.map((objectID) => (
            <Col lg={3} key={objectID} className="mb-4">
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Favourites;
