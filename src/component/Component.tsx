import styled from 'styled-components';

/* Category.tsx */
export const CategoryContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const CategoryButton = styled.div<{ $isClicked: boolean }>`
  padding: 8px 16px;
  background-color: ${(props) => (props.$isClicked ? '#cae0f9' : 'white')};
  border-radius: 16px;
  box-shadow:
    0px 4px 6px -1px rgba(0, 0, 0, 0.2),
    0px 2px 4px -1px rgba(0, 0, 0, 0.12);

  transition: transform 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.12);
  }
`;

export const SkeletonCategory = styled.div`
  padding: 8px 16px;
  border-radius: 16px;
  border: 1px solid #ddd;
  width: 100px;
  height: 20px;

  animation: skeletonShine 1.5s ease-in-out infinite;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;

  @keyframes skeletonShine {
    0% {
      background-position: -200px;
    }
    100% {
      background-position: calc(100% + 200px);
    }
  }
`;

/* DisplayScreen.tsx */
export const DisplayScreenContainer = styled.div<{ $viewCount: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.$viewCount}, 1fr)`};
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const MealContainer = styled.div<{ $viewCount: number }>`
  border-radius: 8px;

  transition: transform 0.3s ease;
  &:hover {
    cursor: pointer;
    transform: ${(props) =>
      `scale(${props.$viewCount == 4 ? '1.07' : '1.03'})`};
  }
`;

export const SkeletonBox = styled.div`
  width: 100%;
  height: 276px;
  border-radius: 8px;

  animation: skeletonShine 1.5s ease-in-out infinite;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;

  @keyframes skeletonShine {
    0% {
      background-position: -200px;
    }
    100% {
      background-position: calc(100% + 200px);
    }
  }
`;

export const MealImage = styled.img`
  width: 100%;
  border-radius: 24px;
  box-shadow:
    0px 4px 6px -1px rgba(0, 0, 0, 0.2),
    0px 2px 4px -1px rgba(0, 0, 0, 0.12);
`;

/* Filter.tsx */
export const CountSpan = styled.span`
  text-decoration: underline;
`;

export const FilterContainer = styled.div`
  display: flex;
  height: 32px;
  justify-content: space-between;
`;

export const FilterButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const SelectContainer = styled.select<{ $view?: boolean }>`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;

  @media (max-width: 768px) {
    display: ${(props) => (props.$view ? 'none' : 'block')};
  }

  &:hover {
    border-color: #888;
  }

  &:focus {
    border-color: #0052cc;
    outline: none;
  }
`;
