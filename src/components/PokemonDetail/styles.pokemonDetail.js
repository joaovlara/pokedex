import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  color: #333;
`;

export const Header = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Sprite = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

export const Title = styled.h2`
  font-size: 24px;
  text-transform: capitalize;
  span {
    font-size: 16px;
    color: #666;
    margin-left: 8px;
  }
`;

export const Section = styled.div`
  margin-top: 1rem;
  font-size: 16px;
`;

export const StatList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
`;

export const StatItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  border-bottom: 1px solid #eee;
`;

export const TypeBadge = styled.span`
  display: inline-block;
  background-color: ${({ type, theme }) => theme.colors?.[type] || "#aaa"};
  color: white;
  border-radius: 12px;
  padding: 4px 8px;
  margin-right: 4px;
  font-size: 14px;
  text-transform: capitalize;
`;

export const FavoriteButton = styled.button`
  background: none;
  border: none;
  font-size: 4rem;
  cursor: pointer;
  color: gold;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;