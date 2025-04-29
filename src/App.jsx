import { Provider } from "react-redux";
import Store from "@Store";
import { Master } from "@Routes";
import { SnackbarProvider } from "notistack";
import { HeroUIProvider } from "@heroui/react";

function App() {
  return (
    <>
      <HeroUIProvider>
        <SnackbarProvider>
          <Provider store={Store}>
            <Master />
          </Provider>
        </SnackbarProvider>
      </HeroUIProvider>
    </>
  );
}

export default App;
