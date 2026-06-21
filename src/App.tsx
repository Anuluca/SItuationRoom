import { ConfigProvider, theme } from "antd";
import {
  lazy,
  Suspense,
  useEffect,
  useState,
  type ComponentType,
  type LazyExoticComponent,
  type ReactNode,
} from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppShell from "./components/AppShell";
import { getFontFamily, waitForSiteFont } from "./utils/fontPlatform";
import type { Language } from "./types";

type RouteComponent = ComponentType<Record<string, never>>;

type PreloadableComponent<T extends RouteComponent> = LazyExoticComponent<T> & {
  preload: () => Promise<{ default: T }>;
};

function lazyWithPreload<T extends RouteComponent>(
  importer: () => Promise<{ default: T }>,
): PreloadableComponent<T> {
  const Component = lazy(importer) as PreloadableComponent<T>;
  Component.preload = importer;
  return Component;
}

const AboutPage = lazyWithPreload(() => import("./pages/AboutPage"));
const NetworkPage = lazyWithPreload(() => import("./pages/NetworkPage"));
const TermsLayout = lazyWithPreload(() => import("./pages/TermsLayout"));
const WorksPage = lazyWithPreload(() => import("./pages/WorksPage"));
const ResourcesPage = lazyWithPreload(() => import("./pages/ResourcesPage"));
const ResourceGalleryPage = lazyWithPreload(
  () => import("./pages/ResourceGalleryPage"),
);
const NotFoundPage = lazyWithPreload(() => import("./pages/NotFoundPage"));
const preloadGraphEngine = () => import("@antv/g6");
const routePreloads: Array<() => Promise<unknown>> = [
  NetworkPage.preload,
  TermsLayout.preload,
  WorksPage.preload,
  ResourcesPage.preload,
  ResourceGalleryPage.preload,
  AboutPage.preload,
  NotFoundPage.preload,
  preloadGraphEngine,
];

function RouteTransition() {
  return (
    <div className="route-transition" role="status">
      <span className="route-transition-mark" aria-hidden="true">
        <img src="/brand-helmet.svg" alt="" />
      </span>
      <span className="route-transition-copy">
        <small>《无头骑士异闻录》关系网｜非官方档案站</small>
        <strong>正在调取档案</strong>
      </span>
    </div>
  );
}

function RouteElement({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RouteTransition />}>{children}</Suspense>;
}

function usePreloadRoutes() {
  useEffect(() => {
    const preload = () => {
      routePreloads.forEach((load) => {
        void load();
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preload, { timeout: 1800 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = setTimeout(preload, 800);
    return () => clearTimeout(timer);
  }, []);
}

function useInitialFontReady() {
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    let isActive = true;

    waitForSiteFont()
      .then(() => {
        if (isActive) {
          setFontReady(true);
        }
      })
      .catch((error: unknown) => {
        console.warn("Site font failed to load before initial render.", error);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return fontReady;
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
  const { i18n } = useTranslation();
  const language = (i18n.resolvedLanguage === "ja" ? "ja" : "zh") as Language;
  const initialFontReady = useInitialFontReady();
  usePreloadRoutes();

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
          fontFamily: getFontFamily(language),
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
      {!initialFontReady ? (
        <RouteTransition />
      ) : (
        <Routes>
          <Route element={<AppShell />}>
            <Route
              index
              element={
                <RouteElement>
                  <NetworkPage />
                </RouteElement>
              }
            />
            <Route path="network" element={<Navigate replace to="/" />} />
            <Route
              path="terms"
              element={
                <RouteElement>
                  <TermsLayout />
                </RouteElement>
              }
            />
            <Route
              path="terms/characters"
              element={<LegacyTermsRedirect view="characters" />}
            />
            <Route
              path="terms/factions"
              element={<LegacyTermsRedirect view="factions" />}
            />
            <Route
              path="works"
              element={
                <RouteElement>
                  <WorksPage />
                </RouteElement>
              }
            />
            <Route
              path="works/:workId"
              element={
                <RouteElement>
                  <WorksPage />
                </RouteElement>
              }
            />
            <Route
              path="resources"
              element={
                <RouteElement>
                  <ResourcesPage />
                </RouteElement>
              }
            />
            <Route
              path="resources/images/:kind"
              element={
                <RouteElement>
                  <ResourceGalleryPage />
                </RouteElement>
              }
            />
            <Route
              path="about"
              element={
                <RouteElement>
                  <AboutPage />
                </RouteElement>
              }
            />
            <Route
              path="*"
              element={
                <RouteElement>
                  <NotFoundPage />
                </RouteElement>
              }
            />
          </Route>
        </Routes>
      )}
    </ConfigProvider>
  );
}
