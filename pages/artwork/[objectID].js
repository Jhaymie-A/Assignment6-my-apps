import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import ArtworkCardDetail from '../../components/ArtworkCardDetail';

function ArtworkByIdPage() {
    const router = useRouter();
    const { objectID } = router.query; // Get objectID from URL

    return (
        <Row>
            <Col>
                <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>
    );
}

export default ArtworkByIdPage;
