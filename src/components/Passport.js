import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, Row, Tooltip } from "reactstrap";
import Cookie from 'js-cookie';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import ThreeDCube from "./3DView";
import { PCDViewer } from "./PCDViewer";
import PCD from "./../pcd/0698_EU_Wood_intake_00000079_Neutral.pcd";

export const Passport = () => {

    const { jwtToken } = useOutletContext();

    let { material_id } = useParams();
    if (material_id === 'undefined') {
        material_id = 0;
    };

    const { devMode } = useOutletContext();
    const [wood, setWood] = useState([]);
    const [loading, setLoading] = useState(true);
    const [impactData, setImpactData] = useState([]);
    const [showPie, setShowPie] = useState(false);

    const COLORS = ["#334", "#50f", "#d94", "#80d"];

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                var url = `${process.env.REACT_APP_BACKEND}`;
                if (devMode) {
                    url = `https://robotlab-residualwood-dev.onrender.com`;
                }

                // Fetch wood data
                const woodResponse = await fetch(`${url}/wood/${material_id}`, {
                    method: "GET", headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + jwtToken,
                        "X-CSRF-TOKEN": Cookie.get("csrf_access_token")
                    },
                    credentials: 'include'

                });
                const woodData = await woodResponse.json();
                console.log(wood);
                setWood(woodData);

                // Fetch impact data
                const impactResponse = await fetch(`${url}/impact/wood/${material_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + jwtToken,
                        "X-CSRF-TOKEN": Cookie.get("csrf_access_token")
                    },
                    credentials: 'include'
                });

                if (!impactResponse.ok) {
                    throw new Error(`Failed to fetch impact data: ${impactResponse.status}`);
                }

                const impact = await impactResponse.json();
                // Process impact data
                impact.carbon_footprint = parseFloat(impact.carbon_footprint);
                impact.eco_costs = parseFloat(impact.eco_costs);
                impact.eco_toxicity = parseFloat(impact.eco_toxicity);
                impact.footprint = parseFloat(impact.footprint);
                impact.resource_depletion = parseFloat(impact.resource_depletion);

                const { human_health, process: productionProcess, eco_toxicity, codename, material, wood_id, id, ...newImpact } = impact;

                const result = Object.entries(newImpact).map(([key, value]) => ({ name: key, value: value }));
                console.log(result);
                setImpactData(result);
                setShowPie(true);
                setLoading(false);

            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, [devMode, loading, material_id, jwtToken]); // Make sure to include all dependencies


    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <>
            {loading ?
                <div className="row justify-content-center" style={{ height: 500, backgroundColor: "#5500ff" }}>
                    <h1 className="fonts mt-5 mb-5 text-center" style={{ color: 'white', fontSize: 45, fontWeight: 700, textAlign: 'center' }}>Loading ...</h1>

                </div>

                :

                <div className="row justify-content-center" style={{ height: 'fit-content', backgroundColor: "#5500ff" }}>
                    <h1 className="fonts mt-5 mb-5 text-center" style={{ color: 'white', fontSize: 45, fontWeight: 700, textAlign: 'center' }}>Material passport</h1>
                    <div>
                        <button className="mt-2 mb-5 ms-4 text-start btn btn-submit-light-small" onClick={handleGoBack} style={{ width: 'fit-content', fontSize: 14 }}>Back</button>

                        <Container fluid className="" style={{ height: 'fit-content', backgroundColor: '#50f' }}>
                            {

                                <div key={wood.id} className="material-card- mt-2" style={{ width: '', backgroundColor: 'white', borderRadius: 10 }}>
                                    <Row className="justify-content-center">
                                        <Col>
                                            <Card style={{ backgroundColor: 'transparent', border: '0px' }}>
                                                <CardHeader style={{ border: '0px', backgroundColor: 'transparent' }}>
                                                    <label className="text-start" style={{ fontSize: 20, fontWeight: 700, color: '#888', minWidth: 300 }}>Wood ID: #{wood.id}</label><br />
                                                    <label className="text-start" style={{ fontSize: 14, fontWeight: 600, color: '#444' }}>{wood.name}</label><br />

                                                    <label className="text-start" style={{ fontSize: 14, fontWeight: 600, color: '#444', width: 'fit-content' }}>Created at: {wood.timestamp}</label><br />
                                                    <label className="text-start" style={{ fontSize: 14, fontWeight: 600, color: '#444' }}>Source location: {wood.source}</label>
                                                </CardHeader>
                                                <CardBody>
                                                    <div className="px-0">
                                                        <Row className="justify-content-center" >
                                                            <hr />

                                                            <Col sm={12} md={6}>
                                                                <label className="text-start me-2" style={{ fontSize: 12, fontWeight: 700, color: '#666' }}>{wood.length} mm x</label>
                                                                <label className="text-start me-2" style={{ fontSize: 12, fontWeight: 700, color: '#666' }}>{wood.width} mm x</label>
                                                                <label className="text-start" style={{ fontSize: 12, fontWeight: 700, color: '#666' }}>{wood.height} mm</label>
                                                                <br />
                                                                <label className="text-start" style={{ fontSize: 12, fontWeight: 700, color: '#666' }}>{wood.weight} grams</label><br />
                                                                <label className="text-start" style={{ fontSize: 12, fontWeight: 700, color: '#666' }}>{parseFloat(wood.density).toFixed(2)} g/cm3</label><br />
                                                                <hr />
                                                                <label className="text-start">{wood.reserved ? <span className="badge bg-warning" style={{ fontSize: 12, fontWeight: 700 }}>Reserved</span> : <span className="badge bg-success" style={{ fontSize: 12, fontWeight: 700 }}>Available</span>}</label><br />


                                                                <br />
                                                                <img
                                                                    className="material-card mt-5"
                                                                    style={{ width: 'fit-content', minWidth: 350, maxWidth: 450 }}
                                                                    // src="https://t4.ftcdn.net/jpg/03/10/50/83/360_F_310508338_CJsJ66AkZYmbcOknfHbPAqq9OBxQCQ9F.jpg"
                                                                    src={`https://robotlab-residualwood.onrender.com/image/${wood.id}?dir=wood_intake`}
                                                                    >
                                                                </img>
                                                            </Col>

                                                            <Col sm={12} md={6}>
                                                                {
                                                                    Array.isArray(impactData) && impactData.length > 0 && showPie &&
                                                                    <div className="">
                                                                        <div style={{ width: '350px', height: "350px", minWidth: "250px", minHeight: "250px" }}>
                                                                            {/* {selectedValue && (
                                                                                <div>
                                                                                    Selected Value: €{selectedValue}
                                                                                </div>
                                                                            )} */}
                                                                            <ResponsiveContainer>
                                                                                <PieChart>
                                                                                    <Pie
                                                                                        dataKey="value"
                                                                                        nameKey="name"
                                                                                        data={impactData}
                                                                                        cx="50%"
                                                                                        cy="50%"
                                                                                        outerRadius={125}
                                                                                        stroke='none'
                                                                                        fill="#8884d8"
                                                                                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                                                                                            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                                                                            const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                                                                            const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                                                                                            return (
                                                                                                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                                                                                    {`€${impactData[index].value.toFixed(2)}`}
                                                                                                </text>
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <Cell key={`cell-0`} fill={COLORS[0]} />
                                                                                        <Cell key={`cell-1`} fill={COLORS[1]} />
                                                                                        <Cell key={`cell-2`} fill={COLORS[2]} />
                                                                                        <Cell key={`cell-2`} fill={COLORS[3]} />
                                                                                    </Pie>
                                                                                    <Legend />
                                                                                </PieChart>
                                                                            </ResponsiveContainer>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </Col>
                                                        </Row>
                                                        <Row className="justify-content-center mt-4 mb-4">
                                                            <ThreeDCube
                                                                width={wood.width}
                                                                length={wood.length}
                                                                height={wood.height}
                                                                color={`rgb(${wood.color})`}
                                                                metalPositions={wood.metal_bbox_coords !== '' ? JSON.parse(wood.metal_bbox_coords) : null}
                                                                metalSpan={100}
                                                            />
                                                            <PCDViewer pcdFile={PCD} />
                                                        </Row>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>

                            };
                        </Container >
                    </div>

                </div>
            }
        </>
    );
};