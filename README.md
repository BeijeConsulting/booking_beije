# booking_beije

## Required libraries

- [@craco/craco](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md)
- [@fortawesome/fontawesome-svg-core](https://fontawesome.com/v6/docs/web/use-with/react/#_1-add-svg-core)
- [@fortawesome/free-regular-svg-icons](https://fontawesome.com/v6/docs/web/use-with/react/#_2-add-icon-packages)
- [@fortawesome/free-solid-svg-icons](https://fontawesome.com/v6/docs/web/use-with/react/#_2-add-icon-packages)
- [@fortawesome/react-fontawesome](https://fontawesome.com/v6/docs/web/use-with/react/#_3-add-the-react-component)
- [@fullcalendar/react](https://fullcalendar.io/docs)
- [antd](https://ant.design/docs/react/introduce)
- [axios](https://axios-http.com/docs/intro)
- [craco-less](https://github.com/DocSpring/craco-less)
- [framer-motion](https://www.framer.com/docs/)
- [react-helmet](https://github.com/nfl/react-helmet#readme)
- [react-i18next](https://react.i18next.com/)
  - [i18next-browser-languagedetector](https://react.i18next.com/legacy-v9/step-by-step-guide#c-auto-detect-the-user-language)
  - [i18next-http-backend](https://react.i18next.com/legacy-v9/step-by-step-guide#a-adding-lazy-loading-for-translations)
- [react-leaflet](https://react-leaflet.js.org/)
- [react-redux](https://react-redux.js.org/)
- [react-router-dom](https://reactrouter.com/docs/en/v6)
- [redux](https://redux.js.org/)
- [redux-logger](https://github.com/LogRocket/redux-logger)
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [crypto-js](https://cryptojs.gitbook.io/docs/)

## Wrapper for map and filter

To increase the performance of the application we have created a wrapper to avoid the use of the contracted arrow function.

### map

```javascript
const wrapperMap = (Component, array) => {
  const renderComponent = (item, key) => {
    return <Component key={`${key}-${randomKey()}`} item={item} />;
  };
  return array.map(renderComponent);
};
```

When we need a map function we ca call it

```javascript
import wrapperMap from '$UTILS/generalIteration/generalIteration'

//Your React code


return{
  // It return all the card in cardList array
  {wrapperMap(Card, cardList)}
}
```

### filter

```javascript
const wrapperFilter = (Component, array, trueStatement) => {
  const renderComponent = (item) => {
    return <Component key={`${key}-${randomKey()}`} item={item} />;
  };
  return array.filter(renderComponent);
};
```

When we need a filter function we ca call it

```javascript
import wrapperFilter from '$UTILS/generalIteration/generalIteration'

//Your React code

const activeCard = (card) => {
  return card.active === true
}

return{
  // It return only the card that match the activeCard condition.
  {wrapperFilter(Card, cardList, activeCard)}
}


```
