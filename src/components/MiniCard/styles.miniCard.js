import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  align-items: center;
  background-color: #F4E5EFFF;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  height: 100px;

    &:hover {
    transform: scale(1.03);
    cursor: pointer;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5%;
  flex: 1;
`;

export const Number = styled.span`
  font-size: 12px;
  color: #6c6c6c;
  margin-bottom: 4px;
`;

export const Name = styled.h3`
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #000;
`;

export const Types = styled.div`
  display: flex;
  gap: 8px;
`;

export const TypeBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme, type }) => theme.colors[type] || "#ccc"};
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  text-transform: capitalize;
`;

export const ImageSection = styled.div`
  /* background-color: ${({ theme }) => theme.colors.grass || "#ccc"}; */
  border-radius: 12px;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Sprite = styled.img`

`;

export const FavoriteIcon = styled.button`
  font-size: 28px;
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  color: ${({ isFavorite }) => (isFavorite ? "#f5b301" : "#ccc")};
  border: none;
  cursor: pointer;
    &:hover {
    transform: scale(2);
  }
`;
