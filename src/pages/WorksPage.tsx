import {
  ArrowRightOutlined,
  ArrowUpOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Image, Tabs, Tag } from "antd";
import { useLayoutEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import ShareButton from "../components/ShareButton";
import { works } from "../data";
import type { Language, WorkCategory } from "../types";
import NotFoundPage from "./NotFoundPage";

const categories: WorkCategory[] = [
  "tv",
  "ova",
  "novels",
  "manga",
  "games",
];

const worksScrollKey = "joho-ya-works-scroll";

const getWorksScrollElement = () =>
  document.querySelector<HTMLElement>(".site-main") ?? document.scrollingElement;

const getWorksDrawerContainer = () =>
  document.querySelector<HTMLElement>(".site-main-wrap") ?? document.body;

const rememberWorksScroll = () => {
  sessionStorage.setItem(
    worksScrollKey,
    String(getWorksScrollElement()?.scrollTop ?? 0),
  );
};

const restoreWorksScroll = (clear = true) => {
  const savedScroll = sessionStorage.getItem(worksScrollKey);
  if (!savedScroll) return;

  const scrollTop = Number(savedScroll);
  getWorksScrollElement()?.scrollTo({ top: scrollTop, behavior: "auto" });
  if (clear) sessionStorage.removeItem(worksScrollKey);
};

const orderGuides: Record<
  WorkCategory,
  Array<{ zh: string; ja: string }>
> = {
  tv: [
    { zh: "TV 第1期《无头骑士异闻录》", ja: "TV第1期『デュラララ!!』" },
    { zh: "《×2 承》", ja: "『×2 承』" },
    { zh: "《×2 转》", ja: "『×2 転』" },
    { zh: "《×2 结》", ja: "『×2 結』" },
  ],
  ova: [
    { zh: "第12.5话《天网恢恢》", ja: "第12.5話「天網恢恢」" },
    { zh: "第25话《天下泰平》", ja: "第25話「天下泰平」" },
    { zh: "第4.5话《我的心是火锅的形状》", ja: "第4.5話「私の心は鍋模様」" },
    { zh: "第13.5话《恋爱故事铿锵作响》", ja: "第13.5話「お惚気チャカポコ」" },
    { zh: "第19.5话《Dufufufu!!》", ja: "第19.5話「デュフフフ!!」" },
  ],
  music: [
    { zh: "动画原声音乐集", ja: "オリジナル・サウンドトラック" },
    { zh: "The Greatest Hits", ja: "The Greatest Hits" },
  ],
  novels: [
    { zh: "本传第1—3卷：三大事件篇", ja: "本編1～3巻：三大事件編" },
    { zh: "本传第4—6卷：新势力篇", ja: "本編4～6巻：新勢力編" },
    { zh: "本传第7—10卷：DOLLARS分裂篇", ja: "本編7～10巻：ダラーズ分裂編" },
    { zh: "本传第11—13卷：最终章", ja: "本編11～13巻：最終章" },
    { zh: "《外传!?》短篇集", ja: "『外伝!?』短編集" },
    { zh: "《SH》第1—4卷", ja: "『SH』1～4巻" },
  ],
  manga: [
    { zh: "漫画版 本篇第1—4卷", ja: "コミカライズ本編 1～4巻" },
    { zh: "罪歌篇第1—3卷", ja: "罪歌編 1～3巻" },
    { zh: "黄巾贼篇第1—3卷", ja: "黄巾賊編 1～3巻" },
    { zh: "RE;DOLLARS篇第1—8卷", ja: "RE;ダラーズ編 1～8巻" },
  ],
  games: [
    { zh: "3way standoff", ja: "3way standoff" },
    {
      zh: "3way standoff -alley-（追加版）",
      ja: "3way standoff -alley-（追加版）",
    },
    {
      zh: "3way standoff -alley- V（PS Vita版）",
      ja: "3way standoff -alley- V（PS Vita版）",
    },
    { zh: "Relay", ja: "Relay" },
  ],
};

export default function WorksPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { workId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const language = (i18n.resolvedLanguage === "ja" ? "ja" : "zh") as Language;
  const tabParam = searchParams.get("tab") as WorkCategory | null;
  const categoryFromUrl = tabParam && categories.includes(tabParam)
    ? tabParam
    : "tv";
  const selectedWork = useMemo(
    () => (workId ? works.find(({ id }) => id === workId) ?? null : null),
    [workId],
  );
  const activeCategory = selectedWork?.category ?? categoryFromUrl;

  useLayoutEffect(() => {
    restoreWorksScroll(!workId);
  }, [workId]);

  const closeWork = () => {
    const category = selectedWork?.category ?? activeCategory;
    navigate(`/works?tab=${category}`);
  };

  const changeCategory = (category: WorkCategory) => {
    setSearchParams({ tab: category });
  };

  if (workId && !selectedWork) return <NotFoundPage />;

  const renderWorks = (category: WorkCategory) => (
    <>
      <div className="works-list">
        {works
          .filter((work) => work.category === category)
          .map((work, index) => (
            <button
              type="button"
              className="work-card"
              key={work.id}
              style={
                {
                  "--work-color": "#f4f500",
                } as React.CSSProperties
              }
              onClick={() => {
                rememberWorksScroll();
                navigate(`/works/${work.id}?tab=${category}`);
              }}
            >
              <span className="work-image">
                {work.image ? (
                  <img src={work.image} alt="" loading="lazy" />
                ) : (
                  <i aria-hidden="true">DRRR</i>
                )}
              </span>
              <div className="work-copy">
                <div className="work-meta-line">
                  <Tag className="dark-work-tag">
                    {t(`works.${work.category}`)}
                  </Tag>
                  <time>{work.year}</time>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h2>{work.title[language]}</h2>
                <strong>{work.meta[language]}</strong>
                <p>{work.description[language]}</p>
                <span className="work-open">
                  {t("common.learnMore")} <ArrowRightOutlined />
                </span>
              </div>
            </button>
          ))}
      </div>
      <section className="watch-order">
        <header>
          <span>EDITOR'S ROUTE / {category.toUpperCase()}</span>
          <h2>{t("works.orderTitle")}</h2>
          <p>{t("works.orderLead")}</p>
        </header>
        <ol>
          {orderGuides[category].map((step, index) => (
            <li key={step.zh}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step[language]}</strong>
            </li>
          ))}
        </ol>
        <small>{t("works.orderNote")}</small>
      </section>
    </>
  );

  return (
    <div className="page">
      <PageHero
        title={t("works.title")}
        lead={t("works.lead")}
        index="03"
      />
      <section className="works-panel">
        <Tabs
          activeKey={activeCategory}
          onChange={(key) => changeCategory(key as WorkCategory)}
          items={categories.map((category, index) => ({
            key: category,
            label: (
              <span className="work-tab">
                <small>0{index + 1}</small>
                {t(`works.${category}`)}
              </span>
            ),
            children: renderWorks(category),
          }))}
        />
      </section>
      <Drawer
        className="work-drawer"
        open={Boolean(selectedWork)}
        width="min(92vw, 720px)"
        autoFocus={false}
        closeIcon={false}
        getContainer={getWorksDrawerContainer}
        rootStyle={{ position: "absolute" }}
        afterOpenChange={(open) => {
          if (open) restoreWorksScroll(false);
        }}
        onClose={closeWork}
        title={null}
      >
        {selectedWork && (
          <article
            className="work-file"
            style={{ "--work-color": "#f4f500" } as React.CSSProperties}
          >
            <div className="work-file-actions">
              <ShareButton
                compact
                className="drawer-action-button"
                title={selectedWork.title[language]}
                text={selectedWork.description[language]}
              />
              <Button
                className="file-close drawer-action-button"
                type="text"
                icon={<CloseOutlined />}
                onClick={closeWork}
              />
            </div>
            <div className="work-file-intro">
              <figure className="work-file-cover">
                {selectedWork.image ? (
                  <Image
                    src={selectedWork.image}
                    alt={selectedWork.title[language]}
                    preview={{ mask: t("common.learnMore") }}
                  />
                ) : (
                  <img src="/brand-helmet-watermark.svg" alt="" />
                )}
              </figure>
              <header>
                <Tag className="dark-work-tag">
                  {t(`works.${selectedWork.category}`)}
                </Tag>
                <time>{selectedWork.year}</time>
                <h2>{selectedWork.title[language]}</h2>
                <strong>{selectedWork.meta[language]}</strong>
                <p>{selectedWork.description[language]}</p>
              </header>
            </div>
            {selectedWork.details && (
              <section>
                <h3>{t("works.staff")} / Details</h3>
                <ul>
                  {selectedWork.details[language].map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </section>
            )}
            {Boolean(selectedWork.links?.length) && (
              <div className="work-external-links">
                {selectedWork.links?.map((link) => (
                  <a
                    className="work-external-link"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    key={link.href}
                  >
                    {link.title[language] || t("works.official")}{" "}
                    <ArrowUpOutlined />
                  </a>
                ))}
              </div>
            )}
          </article>
        )}
      </Drawer>
    </div>
  );
}
