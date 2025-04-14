import Link from 'next/link';
import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate"; // ✅ new

function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false); 
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const token = readToken(); 
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const query = searchField.trim();
    if (query !== "") {
      const queryString = `title=true&q=${query}`;
      setSearchHistory(await addToHistory(queryString));
      router.push(`/artwork?${queryString}`);
      setIsExpanded(false); 
      setSearchField("");
    }
  };

  const logout = () => {
    setIsExpanded(false);
    removeToken(); // ✅ remove token
    router.push("/login"); // ✅ redirect
  };

  return (
    <>
      <Navbar expanded={isExpanded} expand="lg" className="fixed-top navbar-dark bg-dark">
        <Container>
          <Navbar.Brand>Jhaymie Aganon</Navbar.Brand>

          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={() => setIsExpanded(prev => !prev)} 
          />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link 
                  onClick={() => setIsExpanded(false)} 
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>

              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link 
                    onClick={() => setIsExpanded(false)} 
                    active={router.pathname === "/search"}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>

            {token && (
              <>
                <Form className="d-flex" onSubmit={handleSubmit}>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                  />
                  <Button type="submit" variant="outline-light">Search</Button>
                </Form>

                <Nav>
                  <NavDropdown title={token.userName} id="basic-nav-dropdown">
                    <Link href="/favourites" passHref legacyBehavior>
                      <NavDropdown.Item onClick={() => setIsExpanded(false)}>
                        Favourites
                      </NavDropdown.Item>
                    </Link>

                    <Link href="/history" passHref legacyBehavior>
                      <NavDropdown.Item onClick={() => setIsExpanded(false)}>
                        Search History
                      </NavDropdown.Item>
                    </Link>

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            )}

            {!token && (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/register"}
                  >
                    Register
                  </Nav.Link>
                </Link>

                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/login"}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default MainNav;
