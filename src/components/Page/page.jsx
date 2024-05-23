import PageComponent from "./PageComponent/PageComponent.jsx";
import {PageContextProvider} from "./context/PageContextProvider.jsx";

const Page = (props) => {
  return (
    <PageContextProvider>
      <PageComponent {...props}>{props.children}</PageComponent>
    </PageContextProvider>
  );
};

export {Page};
