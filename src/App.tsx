import { ConfigProvider, theme } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import AboutPage from "./pages/AboutPage";
import FactionsPage from "./pages/FactionsPage";
import NetworkPage from "./pages/NetworkPage";
import CharactersPage from "./pages/CharactersPage";
import TermsLayout from "./pages/TermsLayout";
import WorksPage from "./pages/WorksPage";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#f4f500",
          colorInfo: "#f4f500",
          colorBgBase: "#202125",
          colorBgContainer: "#303136",
          colorBgElevated: "#292a2e",
          colorBorder: "rgba(5, 5, 6, 0.58)",
          colorText: "#f4f3ed",
          colorTextSecondary: "#aaa9a4",
          borderRadius: 2,
          borderRadiusLG: 2,
          fontFamily:
            '"Helvetica Neue", Inter, "PingFang SC", "Hiragino Sans", "Microsoft YaHei", sans-serif',
        },
        components: {
          Button: {
            primaryColor: "#171719",
            defaultBg: "rgba(10, 10, 11, 0.16)",
            defaultBorderColor: "rgba(244, 245, 0, 0.28)",
          },
          Drawer: {
            colorBgElevated: "#303136",
          },
          Input: {
            activeBorderColor: "#f4f500",
            hoverBorderColor: "rgba(244, 245, 0, 0.62)",
          },
          Tabs: {
            itemActiveColor: "#f4f500",
            itemSelectedColor: "#f4f500",
            inkBarColor: "#f4f500",
          },
        },
      }}
    >
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<NetworkPage />} />
          <Route path="network" element={<Navigate replace to="/" />} />
          <Route path="terms" element={<TermsLayout />}>
            <Route index element={<Navigate replace to="characters" />} />
            <Route path="characters" element={<CharactersPage />} />
            <Route path="factions" element={<FactionsPage />} />
          </Route>
          <Route path="works" element={<WorksPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}
