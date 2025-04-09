/*********************************************************************************
* BTI425 – Assignment 5
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Jhaymie Aganon Student ID: 147114235  Date: March 23, 2024
*
********************************************************************************/
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Row, Col, Pagination, Card } from 'react-bootstrap';
import ArtworkCard from '../../components/ArtworkCard';
import validObjectIDList from '@/public/data/validObjectIDList.json';
import Error from 'next/error';

const PER_PAGE = 12; // Number of artworks per page

function ArtworkPage() {
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1]; // Extract query parameters

    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
    );

    const [artworkList, setArtworkList] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (data && data.objectIDs) {
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));

            let results = [];
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
              }
              
            setArtworkList(results);
            setPage(1);
        }
    }, [data]);

    if (error) return <Error statusCode={404} />;
    if (!artworkList.length) return <h4>No results found. Try searching for something else.</h4>;

    const previousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const nextPage = () => {
        if (page < artworkList.length) setPage(page + 1);
    };

    return (
        <>
            <Row className="gy-4">
                {artworkList.length > 0 ? (
                    artworkList[page - 1].map((objectID) => (
                        <Col lg={3} key={objectID}>
                            <ArtworkCard objectID={objectID} />
                        </Col>
                    ))
                ) : (
                    <Card>
                        <h4>Nothing Here</h4>
                        <p>Try searching for something else.</p>
                    </Card>
                )}
            </Row>

            {artworkList.length > 0 && (
                <Row className="mt-4">
                    <Col>
                        <Pagination>
                            <Pagination.Prev onClick={previousPage} disabled={page === 1} />
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={nextPage} disabled={page === artworkList.length} />
                        </Pagination>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default ArtworkPage;
