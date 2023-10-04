import ReactDOM from "react-dom/client";
import Router from "./routes";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "./app/theme";
import "./index.css";
// import { Popper } from "@mui/material";

// console.log(Popper);

const theme = createTheme();
ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router />
        </ThemeProvider>
    </Provider>
);
