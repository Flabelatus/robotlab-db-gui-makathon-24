import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"

export const DBPage = () => {

    const { devMode } = useOutletContext();
    const [wood, setWood] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    <h1 className="fonts mt-5 mb-5 text-center" style={{ color: 'white', fontSize: 45, fontWeight: 700, textAlign: 'center' }}>Table viewer</h1>

                    <Container className="" style={{ height: 'fit-content' }}>
                        <Row className="justify-content-center mt-5" >
                            <Col>
                                <Card>
                                    <CardHeader>
                                        Wood table
                                    </CardHeader>
                                    <CardBody>
                                        <div style={{ overflowX: 'auto', height: 600, overflowY: 'auto' }}>
                                            <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '10px' }} className='table table-striped table-hover'>
                                                <thead>
                                                    <tr style={{ fontSize: 12 }}>
                                                        <th scope='col'>ID</th>
                                                        <th className='px-2 py-2' scope='col'>Name</th>
                                                        <th className='px-2 py-2' scope='col'>Length mm</th>
                                                        <th scope='col'>Width mm</th>
                                                        <th scope='col'>Height mm</th>
                                                        <th scope='col'>Weight (grams)</th>
                                                        <th scope='col'>Source</th>
                                                        <th scope='col'>Color</th>
                                                        <th scope='col'>Reserved</th>
                                                        <th scope='col'>Reserved at</th>
                                                        <th scope='col'>Reserved by</th>
                                                        <th scope='col'>Created at</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {wood.filter(w => !w.deleted).map((w) => (

                                                        <tr
                                                            key={w.id}
                                                            scope="row"
                                                            className='px-2'
                                                            style={{
                                                                fontSize: 12,
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            <td className='px-2'>{w.id}</td>
                                                            <td className='px-2'>{w.name}</td>
                                                            <td className='px-2'>{w.length}</td>
                                                            <td className='px-2'>{w.width}</td>
                                                            <td className='px-2'>{w.height}</td>
                                                            <td className='px-2'>{w.weight}</td>
                                                            <td className='px-2'>{w.source}</td>
                                                            <td className='px-2'>{w.color}</td>
                                                            <td className='px-2'>{w.reserved ? "Yes" : "No"}</td>
                                                            <td className='px-2'>{w.reserved_at ? w.reserved_at : "-"}</td>
                                                            <td className='px-2'>{w.reserved_by ? w.reserved_by : "-"}</td>
                                                            <td className='px-2'>{w.timestamp}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container >
                </div>
            }
        </>
    );
}