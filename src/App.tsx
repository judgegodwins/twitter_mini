import Router from "./routes";
import Alert from "components/Alert";
import ShareDialogProvider from "components/providers/ShareDialogProvider";
import NotificationProvider from "components/providers/NotificationProvider";

export default function App() {
  return (
    <NotificationProvider>
      <ShareDialogProvider>
        {/* <GlobalStyle /> */}
        <Alert />
        <Router />
      </ShareDialogProvider>
    </NotificationProvider>
  );
}
