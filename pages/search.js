import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData'; 
import { Form, Row, Col, Button, Container } from 'react-bootstrap';

function AdvancedSearch() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  
  const submitForm = async (data) => {
    let queryString = `${data.searchBy}=true`;

    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    queryString += `&isOnView=${data.isOnView ? "true" : "false"}`;
    if (data.isHighlight) queryString += `&isHighlight=${data.isHighlight ? "true" : "false"}`;
    if (data.q) queryString += `&q=${data.q}`;

    
    setSearchHistory(await addToHistory(queryString));

    router.push(`/artwork?${queryString}`);
  };

  return (
    <Container className="mt-4">
      <h2>Advanced Search</h2>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Search Query </Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter keyword" 
                {...register("q", { required: true })} 
                className={errors.q ? "is-invalid" : ""}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Search By</Form.Label>
              <Form.Select {...register("searchBy")}>
                <option value="title">Title</option>
                <option value="artist">Artist</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control type="text" placeholder="Enter location" {...register("geoLocation")} />
              <Form.Text className="text-muted">
                Case Sensitive String (e.g. &quot;Europe&quot;, &quot;Paris&quot;, &quot;New York&quot;), with multiple values separated by |
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control type="text" placeholder="Enter medium" {...register("medium")} />
              <Form.Text className="text-muted">
                Case Sensitive String (e.g. &quot;Paintings&quot;, &quot;Sculpture&quot;), with multiple values separated by |
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Highlighted" {...register("isHighlight")} />
              <Form.Check type="checkbox" label="Currently on View" {...register("isOnView")} />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="dark">Submit</Button>
      </Form>
    </Container>
  );
}

export default AdvancedSearch;
