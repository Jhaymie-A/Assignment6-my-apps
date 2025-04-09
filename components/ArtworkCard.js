import useSWR from 'swr';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';

function ArtworkCard({ objectID }) {
    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    );

    if (error) return <Error statusCode={404} />;
    if (!data) return null;

    return (
        <Card style={{ width: '18rem', margin: '10px', overflow: 'hidden' }}> 
            <Card.Img
                variant="top"
                src={data.primaryImageSmall || 'https://placehold.co/375x375?text=Not+Available'}
                alt={data.title || 'N/A'}
                style={{
                    width: "100%",       
                    height: "auto",      
                    objectFit: "contain", 
                }}
            />
            <Card.Body>
                <Card.Title>{data.title || 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {data.objectDate || 'N/A'}
                    <br />
                    <strong>Classification:</strong> {data.classification || 'N/A'}
                    <br />
                    <strong>Medium:</strong> {data.medium || 'N/A'}
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
                    <Button
                        style={{
                            backgroundColor: "white",
                            color: "black",
                            border: "2px solid black",
                            transition: "all 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "black";
                            e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "white";
                            e.target.style.color = "black";
                        }}
                    >
                        View Details
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default ArtworkCard;
