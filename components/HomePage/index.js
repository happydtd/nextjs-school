import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import Image from 'next/image'

const HomePage = () => {
  return (
    <section className="section position-relative">
        <Container>
        <Row className="align-items-center">
            <Col lg={6}>
            <div className="pr-lg-5">
                <p className="text-uppercase text-primary font-weight-medium f-14 mb-4">School management system</p>
                <h1 className="mb-4 font-weight-normal line-height-1_4">Simply dummy text of the printing <span className="text-primary font-weight-medium">Name</span></h1>
                <p className="text-muted mb-4 pb-2">Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                <a href="#" className="btn btn-warning">
                Find Out How <span className="ml-2 right-icon">&#8594;</span>
                </a>
            </div>
            </Col>
            <Col lg={6}>
            <div className="mt-5 mt-lg-0">
                <Image src="/Images/ps.jpg" layout='fill' alt="" className="img-fluid mx-auto d-block"/>
            </div>
            </Col>
        </Row>
        </Container>
    </section>
    )
}

export default HomePage
