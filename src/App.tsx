import { ConfigProvider, theme } from "antd";
import { lazy, Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AppShell from "./components/AppShell";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const NetworkPage = lazy(() => import("./pages/NetworkPage"));
const TermsLayout = lazy(() => import("./pages/TermsLayout"));
const WorksPage = lazy(() => import("./pages/WorksPage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const ResourceGalleryPage = lazy(
  () => import("./pages/ResourceGalleryPage"),
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function RouteLoading() {
  return (
    <div className="route-loading" role="status">
      <span className="route-loading-mark" aria-hidden="true">
        <img src="/brand-helmet.svg" alt="" />
      </span>
      <span className="route-loading-copy">
        <small>《无头骑士异闻录》非官方档案站</small>
        <strong>DRRR情报屋</strong>
      </span>
    </div>
  );
}

function LegacyTermsRedirect({
  view,
}: {
  view: "characters" | "factions";
}) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  params.set("view", view);
  return <Navigate replace to={`/terms?${params.toString()}`} />;
}

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
      <Suspense fallback={<RouteLoading />}>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<NetworkPage />} />
            <Route path="network" element={<Navigate replace to="/" />} />
            <Route path="terms" element={<TermsLayout />} />
            <Route
              path="terms/characters"
              element={<LegacyTermsRedirect view="characters" />}
            />
            <Route
              path="terms/factions"
              element={<LegacyTermsRedirect view="factions" />}
            />
            <Route path="works" element={<WorksPage />} />
            <Route path="works/:workId" element={<WorksPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route
              path="resources/images/:kind"
              element={<ResourceGalleryPage />}
            />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ConfigProvider>
  );
}
