import React from 'react';
import styled from 'styled-components';

interface CardProps {
  brand: string;
  joinLink: string;
  bannerImage: string;
  feedTitle: string;
  brandlogo: string;
}

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid #ccc; /* Add borders or additional styling as needed */
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #f0f0f0; /* Add background color as needed */
`;

const TitleHead = styled.div`
  display: flex;
  align-items: center;
`;

const BrandLogo = styled.img`
  width: 20px;
  margin-right: 8px;
`;

const JoinLinkContainer = styled.div`
  width: 197px;
  text-align: right;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 60%;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TitleStyle = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: #fff;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Card = ({ brand, joinLink, bannerImage, feedTitle, brandlogo }: CardProps) => {
  return (
    <CardContainer>
      <Header>
        <TitleHead>
          <BrandLogo src={brandlogo} alt='Brand logo' />
          <p>{brand}</p>
        </TitleHead>
        <JoinLinkContainer>
          <p>{joinLink}</p>
          <a href={joinLink}>Join Brief Now</a>
        </JoinLinkContainer>
      </Header>
      <ImageWrapper>
        <Image src={bannerImage} alt="Feed Banner" />
        <TitleStyle>{feedTitle}</TitleStyle>
      </ImageWrapper>
    </CardContainer>
  );
};

export default Card;
