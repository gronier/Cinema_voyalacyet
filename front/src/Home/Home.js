import React from "react";
import {Carousel,Card} from "react-bootstrap";
import {MDBCol, MDBRow} from "mdb-react-ui-kit";

export default function Home() {
    const width = 1300
    return (
        <>
            <br/>
            <h2 style={{textAlign:"center",marginTop:25}}> Bienvenue au Cinéma-Voyalacyet
            </h2>
            <MDBRow className='d-flex justify-content-center'>
                <MDBCol md='6'>
                    <p className="text-justify" style={{textAlign: "justify", marginTop: 50 ,fontSize:17}}>
                        Notre cinéma est l'endroit idéal pour les amateurs de films de tous genres. Nous offrons une
                        expérience de visionnement unique avec des équipements de pointe et une ambiance chaleureuse.

                        <br/>Nous avons une grande sélection de films, des blockbusters aux films indépendants, en passant
                        par les films d'animation pour enfants. Nous nous efforçons de présenter une programmation
                        variée pour plaire à tous les goûts et à tous les âges.

                        Nos salles de projection sont équipées des dernières technologies audio et vidéo, offrant une
                        qualité d'image et de son exceptionnelle. Nous avons également des sièges confortables pour
                        garantir une expérience de visionnement agréable.

                        <br/>De plus, notre personnel est amical et serviable, prêt à répondre à toutes vos questions
                        et à vous aider à trouver les meilleurs sièges dans la salle.

                        <br/>Nous proposons également des offres spéciales, comme des soirées à thème, des événements
                        spéciaux et des tarifs réduits pour les étudiants et les enfants.

                        <br/>Venez découvrir notre cinéma-Voyalacyet pour une expérience cinématographique inoubliable !</p>
                </MDBCol>
            </MDBRow>

            <div>
                <section className="slider container mb-3">
                    <Carousel>
                        <Carousel.Item className='slide'>
                            <img
                                className="d-block w-10"
                                src= {'http://localhost:8000/img/ciné1.jpeg'}
                                alt="First slide"
                                width={width}

                            />
                        </Carousel.Item>
                        <Carousel.Item className='slide'>
                            <img
                                className="d-block w-10"
                                src={'http://localhost:8000/img/ciné2.jpeg'}
                                alt="Second slide"
                                width={width}

                            />
                        </Carousel.Item>
                        <Carousel.Item className='slide'>
                            <img
                                className="d-block w-10"
                                src={'http://localhost:8000/img/ciné3.jpeg'}
                                alt="Third slide"
                                width={width}
                            />
                        </Carousel.Item>
                    </Carousel>
                </section>
            </div>
        </>
    );
}
