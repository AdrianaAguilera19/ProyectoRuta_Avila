import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterContainer>
            <Content>
                <Text>
                    <Icon className="fas fa-phone" /> Teléfono: +58 212 508 1000
                </Text>
                <Text>
                    <Icon className="fas fa-envelope" /> E-Mail: rutaavilaunimet@unimet.com
                </Text>

            </Content>
        </FooterContainer>
    );
};

const FooterContainer = styled.footer`
    background: linear-gradient(135deg, rgb(30, 63, 38), rgb(10, 83, 156));
    text-align: center;
    padding: 40px 20px;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    width: 100%; // Asegura que el footer ocupe todo el ancho

    @media (max-width: 768px) {
        padding: 30px 15px;
    }
`;

const Content = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const Text = styled.p`
    font-size: 1rem;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

const Icon = styled.i`
    font-size: 1.2rem;
`;

export default Footer;