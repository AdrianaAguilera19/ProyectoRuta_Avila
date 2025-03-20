import React from 'react';
import styled from 'styled-components';

const MissionVisionObjective = () => {
    return (
        <MisionVisionObjetivoSection>
            <Card>
                <Icon className="fas fa-rocket" />
                <Title>MISIÓN</Title>
                <Text>
                    Nuestra misión es brindar a los estudiantes de la Universidad Metropolitana una
                    plataforma centralizada orientada a la exposición de diferentes rutas de
                    senderismo proporcionadas por el Proyecto Ávila.
                </Text>
            </Card>
            <Card>
                <Icon className="fas fa-globe" />
                <Title>VISIÓN</Title>
                <Text>
                    Promover la participación estudiantil y el desarrollo integral de los estudiantes
                    de la Universidad Metropolitana a través de la creación de rutas de senderismo.
                </Text>
            </Card>
            <Card>
                <Icon className="fas fa-bullseye" />
                <Title>OBJETIVO</Title>
                <Text>
                    A partir de la creación de “Ruta Ávila UNIMET” se busca proporcionar una plataforma
                    virtual que permita a los estudiantes acceder a oportunidades de realizar rutas y
                    conectar con el mundo natural.
                </Text>
            </Card>
        </MisionVisionObjetivoSection>
    );
};

const MisionVisionObjetivoSection = styled.section`
    display: flex;
    justify-content: space-around;
    padding: 80px 20px;
    background: linear-gradient(135deg, rgb(17, 102, 163), rgb(28, 117, 234));
    text-align: center;
    flex-wrap: wrap;
    margin: 0;

    @media (max-width: 991px) {
        & > div {
            width: 45%;
        }
    }

    @media (max-width: 640px) {
        & > div {
            width: 90%;
            margin: 10px 0;
        }
    }
`;

const Card = styled.div`
    width: 30%;
    padding: 30px;
    border-radius: 15px;
    background: linear-gradient(135deg, #FFA500, #3498db);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    margin: 20px 10px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 640px) {
        width: 90%;
        margin: 10px 0;
    }
`;

const Title = styled.h2`
    font-size: 1.75rem;
    margin-bottom: 20px;
    color: #fff;
    font-weight: 700;

    @media (max-width: 640px) {
        font-size: 1.5rem;
    }
`;

const Text = styled.p`
    font-size: 1.1rem;
    color: #fff;
    line-height: 1.8;

    @media (max-width: 640px) {
        font-size: 1rem;
    }
`;

const Icon = styled.i`
    font-size: 3rem;
    color: #fff;
    margin-bottom: 20px;
`;

export default MissionVisionObjective;