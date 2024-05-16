import { useEffect, useState } from "react";
import { Form, Link, useNavigate, useOutletContext } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, Input, InputGroup, Row } from "reactstrap";


export const Materials = () => {

    const { devMode } = useOutletContext();
    const [wood, setWood] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        var url = `${process.env.REACT_APP_BACKEND}`;
        if (devMode) {
            url = `https://robotlab-residualwood-dev.onrender.com`;
        }
        fetch(`${url}/wood`, {
            method: "GET"
        }).then((response) => response.json()).then((data) => {
            setWood(data);
            setLoading(false);
        }).catch((error) => console.error(error.message));
    }, [devMode, loading]);

    return (
        <>
            {loading ?
                <div className="row justify-content-center" style={{ height: 500, backgroundColor: "#5500ff" }}>
                    <h1 className="fonts mt-5 mb-5 text-center" style={{ color: 'white', fontSize: 45, fontWeight: 700, textAlign: 'center' }}>Loading ...</h1>

                </div>

                :

                <div className="row justify-content-center" style={{ height: 'fit-content', backgroundColor: "#5500ff" }}>
                    <h1 className="fonts mt-5 mb-5 text-center" style={{ color: 'white', fontSize: 45, fontWeight: 700, textAlign: 'center' }}>Material passport library</h1>
                    <Form>
                        
                        <InputGroup>
                            <Input
                                title="Search"
                                type="text"
                                placeholder="Search ..."
                                className="mb-4 mt-3 custom-input ms-2 d-flex"
                                style={{ height: 45, maxWidth: 300, border: '2px solid #fff', backgroundColor: 'transparent', borderRadius: 35, color: '#fff', fontSize: 14, fontWeight: 700, alignItems: 'center' }}
                            />
                            {/* <button className="d-flex ms-4 mt-4 btn btn-light px-5" style={{height: 30, alignItems: "center"}}></button> */}
                        </InputGroup>
                        
                    </Form>


                    <div style={{ overflowY: 'auto', height: 600 }}>
                        <Container fluid className="" style={{ height: 'fit-content', backgroundColor: '#50f' }}>
                            {
                                wood.map((w) => (
                                    <Link key={w.id} className="material-card mt-2 btn m-2" style={{ width: '', backgroundColor: 'white'}}  onClick={(e) => navigate(`/passport/${w.id}`)}>
                                        <Row className="justify-content-center">
                                            <Col>
                                                <Card style={{ backgroundColor: 'transparent', border: '0px' }}>
                                                    <CardHeader style={{ border: '0px', backgroundColor: 'transparent' }}>
                                                        <label className="text-start" style={{ fontSize: 20, fontWeight: 700, color: '#888', minWidth: 300 }}>Wood ID: #{w.id}</label><br />
                                                        <label className="text-start" style={{ fontSize: 12, fontWeight: 500, color: '#444' }}>{w.name}</label><br />
                                                        <label className="text-start" style={{ fontSize: 12, fontWeight: 500, color: '#444', width: 'fit-content' }}>Created at: {w.timestamp}</label><br />
                                                        <label className="text-start" style={{ fontSize: 12, fontWeight: 500, color: '#444' }}>Source location: {w.source}</label>
                                                        
                                                    </CardHeader>
                                                    <CardBody>
                                                        <div className="px-0">
                                                            <Row className="justify-content-center" >
                                                                <hr />
                                                                <Col sm={12} md={9}>
                                                                    <label className="text-start me-2" style={{ fontSize: 12, fontWeight: 700, color: '#444' }}>{w.length} mm x</label>
                                                                    <label className="text-start me-2" style={{ fontSize: 12, fontWeight: 700, color: '#444' }}>{w.width} mm x</label>
                                                                    <label className="text-start" style={{ fontSize: 12, fontWeight: 700, color: '#444' }}>{w.height} mm</label>
                                                                    <br />
                                                                    <label className="text-start" style={{ fontSize: 12, fontWeight: 700, color: '#444' }}>{w.weight} grams</label><br />
                                                                    <label className="text-start" style={{ fontSize: 12, fontWeight: 700, color: '#444' }}>{parseFloat(w.density).toFixed(2)} g/cm3</label>

                                                                </Col>
                                                                <Col>
                                                                    <img
                                                                        className="material-card"
                                                                        style={{ width: 200 }}
                                                                        src="https://t4.ftcdn.net/jpg/03/10/50/83/360_F_310508338_CJsJ66AkZYmbcOknfHbPAqq9OBxQCQ9F.jpg"></img></Col>
                                                            </Row>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Link>
                                ))
                            };
                        </Container >
                    </div>

                </div>
            }
        </>
    );
};