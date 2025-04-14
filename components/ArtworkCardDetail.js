import useSWR from 'swr';
import { Card, Container, Button } from 'react-bootstrap';
import Error from 'next/error';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from "@/lib/userData"; 

function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(
        objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
    );

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);


    useEffect(() => {
        setShowAdded(favouritesList?.includes(objectID));
    }, [favouritesList, objectID]);

    async function favouritesClicked() {
        if (showAdded) {
            const updatedList = await removeFromFavourites(objectID);
            setFavouritesList(updatedList);
            setShowAdded(false);
        } else {
            const updatedList = await addToFavourites(objectID);
            setFavouritesList(updatedList);
            setShowAdded(true);
        }
    }

    if (error) return <Error statusCode={404} />;
    if (!data || !data.title) {
        return (
            <Container className="mt-4 text-center">
                <h4>Artwork Not Found</h4>
                <p>This artwork may have been removed from the collection.</p>
            </Container>
        );
    }

    return (
        <Container className="d-flex justify-content-center mt-4">
            <Card style={{ maxWidth: "900px", border: "none" }}>
                <Card.Img
                    variant="top"
                    src={data.primaryImage}
                    alt={data.title}
                    style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                    }}
                />
                <Card.Body>
                    <Card.Title>{data.title || 'N/A'}</Card.Title>
                    <Card.Text>
                        <strong>Date:</strong> {data.objectDate || 'N/A'}<br />
                        <strong>Classification:</strong> {data.classification || 'N/A'}<br />
                        <strong>Medium:</strong> {data.medium || 'N/A'}<br /><br />
                        <strong>Artist:</strong> {data.artistDisplayName || 'N/A'}
                        {data.artistDisplayName && (
                            <> (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>)</>
                        )}<br />
                        <strong>Credit Line:</strong> {data.creditLine || 'N/A'}<br />
                        <strong>Dimensions:</strong> {data.dimensions || 'N/A'}<br /><br />

                        <Button 
                            variant={showAdded ? "primary" : "outline-primary"} 
                            onClick={favouritesClicked}
                        >
                            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ArtworkCardDetail;
