# 프로그라피 9기 프론트엔드 리엑트 과제

## 결과물
Vercel 배포  
https://prography-9th-frontend.vercel.app/

## 주요목표
- 카테고리에 해당하는 음식들의 사진/이름 출력하기
- 필터링을 통한 Sort 적용하기
- 무한 스크롤을 이용해 20개씩 불러오기
- QueryString을 이용해 카테고리, 필터링 값 저장 및 불러오기
- Mobile 반응형 구현하기

## 시작하기
```
1. yarn
2. yarn start

or

1. npm install
2. npm start
```

## 폴더구조
📦src  
 ┣ 📂assets  
 ┃ ┗ 📂images  
 ┃ ┃ ┗ 📜logo.png  
 ┣ 📂component  
 ┃ ┣ 📜Category.tsx  
 ┃ ┣ 📜Component.tsx  
 ┃ ┣ 📜DisplayScreen.tsx  
 ┃ ┣ 📜Filter.tsx  
 ┃ ┣ 📜Header.tsx  
 ┃ ┗ 📜ScrollToTop.tsx  
 ┣ 📂hooks  
 ┃ ┗ 📜FetchApi.ts  
 ┣ 📂store  
 ┃ ┣ 📜slice.ts  
 ┃ ┗ 📜store.ts  
 ┣ 📂type  
 ┃ ┗ 📜type.ts  
 ┣ 📜App.tsx  
 ┣ 📜index.tsx  

## 사용 라이브러리
- React v.18.2.0
- Language: TypeScript
- CSS: Styled-Componet
- RestApi: React-Query, Axios
- Global State: Redux-Tool-Kit
- etc: Prettier, EsLint
- CommitRule: gitmoji

## 작업 내용
### App.tsx
간단한 레이아웃 구조와 useFetchMeals Hook을 통해 전체 음식데이터를 가져옵니다.  
React-Query의 useQueries를 이용해 선택된 Category의 데이터들을 전부 호출했습니다.  
이렇게 받은 복잡한 데이터들을 JS의 filter와 flatMap을 이용해 하나의 배열로 받을 수 있게 가공했습니다.  
```
const meals = results
  .filter((result) => !result.isLoading && result.isSuccess)
  .flatMap((result) => result.data || [])
  .map((meal) => ({
    ...meal,
    strMeal: meal.strMeal.trimStart(), // strMeal 필드의 앞쪽 공백 제거
  }));
```
* Sort가 제대로 진행되지 않은 오류가 있어 확인해보니 " Bubble & Squeak"와 같이 공백문자가 있어 오름차순 시, 제일 앞으로 오는 문제가 있었습니다. 이를 trimStart()를 통해서 해결했습니다.  

### Category.tsx
받아온 배열 데이터를 객체로 저장해서 사용하고 있습니다.  
클릭 시 특정 요소의 값을 바꾸는 상황에서 배열은 전부 순회하며 요소를 찾아야 하지만, 객체는 id를 통해 바로 접근 할 수 있어 추후 만약 대규모 처리하는 과정에서 좀 더 용이할 것이라고 판단했습니다.  
```
const newCategories = data.data.categories.reduce(
  (acc: categoryObjectType, category: categoryType) => ({
    ...acc,
    [category.idCategory]: {
      ...category,
      isClicked: currentCategoryArray.includes(category.strCategory),
    },
  }),
  {}
);
setCategories(newCategories);
```
* reduce를 이용해 객체로 변환시키면서 추가적으로 isClicked 값을 설정해줬습니다.  


### DisplayScreen
무한스크롤 구현을 위해서, IntersectionObserver를 사용해서 구현했습니다.  
React-Query와 함께 사용해 사용자가 요청 시 필요한 데이터만 불러오는 방식으로 진행하면 좀 더 좋았겠지만, 공개 API 서버에서 Pagination을 지원하지 않는 것 같아 데이터를 전부 받아와 FE단에 저장하고 일정 부분만 보여주는 방식으로 진행하였습니다.  
```
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      mealsData.length >= index + 20
        ? dispatch(setIndex(index + 20))
        : dispatch(setIndex(mealsData.length));
    }
  },
  { threshold: 1.0 }
);
```
이때, 모든 이미지를 렌더링 하지 않게 image에 lazyLoading 처리를 진행하였습니다.  
  

### QueryString
QueryString를 통해 url에 데이터들을 저장해서 사용했습니다.  
```
const searchParams = new URLSearchParams(location.search);
```
URLSearchParams를 이용해 params를 set, delete, get 작업을 진행했습니다.  

### Redux-Tool-Kit
Redux-Tool-Kit을 좀 더 깔끔하게 코드를 관리하고 있습니다.  
부모 <-> 자식간의 Props 전달을 줄이기 위해 Redux를 사용하고 State Hook 사용을 최소화 하였습니다.  
