import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  background-color: #dedede;
`;

export const Dropdown = styled.select`
  width: 180px;
  padding: 12px 16px;
  border-radius: 16px;
  border: none;
  background-color: #dedede;
  font-size: 16px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const LoadMoreButton = styled.button`
  margin: 2rem auto;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  background-color: #3b4cca;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: block;

  &:hover {
    background-color: #2a3691;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const FavoritesButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? "#f0c040" : "#e0e0e0")};
  border: none;
  cursor: pointer;
  font-weight: bold;
`;
