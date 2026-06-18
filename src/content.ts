import type { Language } from "./types";

export interface JapaneseProfile {
  alias: string;
  role: string;
  desc: string;
}

export const japaneseProfiles: Record<string, JapaneseProfile> = {
  celty: {
    alias: "首なしライダー / 黒バイク",
    role: "都市伝説・運び屋",
    desc: "失った首を探してアイルランドから池袋へ来たデュラハン。黒いバイクで運び屋を営み、穏やかで人情深い。",
  },
  shinra: {
    alias: "闇医者",
    role: "闇医者・セルティの恋人",
    desc: "幼い頃からセルティを愛する闇医者。観察眼に優れる一方、彼女のためなら重要な事実も隠す。",
  },
  izaya: {
    alias: "情報屋",
    role: "情報屋・観察者",
    desc: "人間を愛すると称する情報屋。池袋の人々を盤上に置き、選択と感情を観察しながら事件を動かす。",
  },
  shizuo: {
    alias: "池袋最強",
    role: "借金取り・怪力",
    desc: "バーテン服とサングラスが目印の池袋最強。暴力を嫌うが短気で、家族や友人との約束を重んじる。",
  },
  mikado: {
    alias: "田中太郎",
    role: "ダラーズ創始者・ブルースクウェア首領",
    desc: "非日常を求めて池袋へ来た高校生。無色の集団ダラーズの創始者で、平穏な外見の下に異常への執着を隠す。",
  },
  masaomi: {
    alias: "バキュラ",
    role: "黄巾賊の将軍",
    desc: "帝人の親友で、かつて黄巾賊を率いた少年。過去から逃げながらも、仲間と沙樹を守るため再び向き合う。",
  },
  anri: {
    alias: "罪歌の母",
    role: "来良学園生・罪歌の所有者",
    desc: "妖刀・罪歌を宿す物静かな少女。人との距離に悩みながら、帝人と正臣、罪歌の子たちを守ろうとする。",
  },
  "kida-saki": {
    alias: "沙樹",
    role: "正臣の恋人",
    desc: "紀田正臣の恋人。臨也の影響で近づいた過去を持つが、彼の操作を見抜く強さと覚悟を備えている。",
  },
  aoba: {
    alias: "ブルースクウェアの黒幕",
    role: "学生・カラーギャング策士",
    desc: "爽やかな後輩を装うブルースクウェアの中心人物。帝人とダラーズの名を利用して勢力拡大を狙う。",
  },
  izumii: {
    alias: "元ブルースクウェア首領",
    role: "武闘派リーダー",
    desc: "青葉の兄で、かつて組織の表向きの首領だった。粗暴な性格だが、弟の計画に翻弄され続ける。",
  },
  kadota: {
    alias: "ドタチン",
    role: "ダラーズ・チームリーダー",
    desc: "義理堅く頼れる池袋の青年。遊馬崎、狩沢、渡草を率い、危機では迷わず仲間を助ける。",
  },
  yumasaki: {
    alias: "オタクコンビ",
    role: "ダラーズ",
    desc: "門田チームの重度オタク。普段は軽妙だが、敵に対しては危険なほど思い切った行動を取る。",
  },
  karisawa: {
    alias: "オタクコンビ",
    role: "ダラーズ",
    desc: "遊馬崎と趣味を共有する門田チームの一員。観察力が高く、池袋の事件を作品ネタで語る。",
  },
  togusa: {
    alias: "ワゴンの運転手",
    role: "ダラーズ・運転手",
    desc: "門田チームの足を担う運転手。聖辺ルリの熱狂的ファンで、愛車を傷つけられることを最も嫌う。",
  },
  seiji: {
    alias: "首への崇拝者",
    role: "来良学園生",
    desc: "セルティの首に異常な恋心を抱く学生。常識を無視して愛を追い、張間美香と奇妙な関係を築く。",
  },
  mika: {
    alias: "誠二の追随者",
    role: "来良学園生",
    desc: "誠二を追い続け、セルティの首を発見した少女。執着と行動力で自らの居場所を作り出す。",
  },
  namie: {
    alias: "矢霧製薬研究員",
    role: "研究員・臨也の秘書",
    desc: "誠二の姉で、弟への強い独占欲を持つ。事件後は臨也の秘書となり、互いに利用し警戒し合う。",
  },
  shingen: {
    alias: "仮面の研究者",
    role: "研究者・新羅の父",
    desc: "非人存在を研究する新羅の父。セルティの首を盗み研究へ持ち込んだ、奇行の多い科学者。",
  },
  emilia: {
    alias: "森厳の妻",
    role: "研究者",
    desc: "森厳の再婚相手で特殊研究に携わる。率直で開放的な性格から、新羅とは友人のように接する。",
  },
  kasane: {
    alias: "罪歌の所有者",
    role: "マネージャー・妖刀所有者",
    desc: "別の罪歌を操る謎の女性。芸能の裏方として動きながら、罪歌のネットワークと非人存在を利用する。",
  },
  haruna: {
    alias: "罪歌の子",
    role: "学生・罪歌支配者",
    desc: "罪歌に斬られ那須島を愛した少女。大規模な襲撃後も、罪歌の子として強烈な個人欲望を残す。",
  },
  shuji: {
    alias: "雑誌記者",
    role: "記者・春奈の父",
    desc: "池袋最強を追う雑誌記者で春奈の父。静雄を調査するうちに罪歌事件へ巻き込まれる。",
  },
  nasujima: {
    alias: "元教師",
    role: "詐欺師",
    desc: "生徒や他人を利用する元教師。無責任な行動で罪歌事件を招き、その後も裏取引へ関わる。",
  },
  simon: {
    alias: "露西亜寿司の呼び込み",
    role: "寿司店員・元戦闘員",
    desc: "静雄を止められるほどの力を持つロシア人。温厚で、池袋の争いを平和に収めようとする。",
  },
  denis: {
    alias: "露西亜寿司店主",
    role: "寿司店主",
    desc: "露西亜寿司の店主兼料理人。サイモンと過去を共有し、ロシアの裏社会にも通じている。",
  },
  vorona: {
    alias: "金髪の殺し屋",
    role: "傭兵・静雄の後輩",
    desc: "強者との戦いを求めるロシア出身の傭兵。日本での仕事を通して静雄を先輩として敬うようになる。",
  },
  sloan: {
    alias: "傭兵",
    role: "ヴァローナの相棒",
    desc: "ヴァローナと来日した傭兵。運転と支援を担当し、荒々しく見えて相棒への信頼は厚い。",
  },
  egor: {
    alias: "哲学する殺人機械",
    role: "ロシア人殺し屋",
    desc: "ロシアの裏社会で知られる殺し屋。独自の哲学を持ち、杏里に救われたことで池袋の関係網へ入る。",
  },
  tom: {
    alias: "借金取りの責任者",
    role: "借金取り・静雄の上司",
    desc: "静雄の先輩で現在の上司。冷静な判断で彼をなだめ、借金取りの相棒として支える。",
  },
  kasuka: {
    alias: "羽島幽平",
    role: "俳優・静雄の弟",
    desc: "羽島幽平として活動する人気俳優。感情表現は薄いが兄を理解し、聖辺ルリと交際する。",
  },
  ruri: {
    alias: "ハリウッド",
    role: "アイドル・連続襲撃者",
    desc: "異常な身体能力を持つアイドル。ハリウッドとして事件を起こすが、幽に受け入れられ居場所を得る。",
  },
  max: {
    alias: "プロデューサー",
    role: "映画プロデューサー",
    desc: "池袋の異常を映像企画へ変える行動派のプロデューサー。幽やルリの芸能活動にも関わる。",
  },
  akane: {
    alias: "道場の少女",
    role: "粟楠会会長の孫",
    desc: "粟楠会会長の孫。誤解から静雄を狙うが、真相を知った後は信頼できる兄のように慕う。",
  },
  shiki: {
    alias: "粟楠会幹部",
    role: "対外交渉担当",
    desc: "粟楠会の交渉を担う冷静な幹部。組織の秩序を重んじ、セルティや新羅とも仕事でつながる。",
  },
  akabayashi: {
    alias: "赤鬼",
    role: "粟楠会幹部",
    desc: "独自の仁義を持つ粟楠会幹部。過去の因縁から杏里を陰で見守り、危険から守る。",
  },
  aozaki: {
    alias: "青鬼",
    role: "粟楠会幹部",
    desc: "粟楠会の武闘派幹部。組織の面子を重視し、問題を直接的かつ強硬に処理する。",
  },
  chikage: {
    alias: "DraGon Zombie総長",
    role: "埼玉の暴走族リーダー",
    desc: "仲間と自分の流儀を大切にする暴走族総長。正臣と拳を交え、互いを認め合う。",
  },
  kuzuhara: {
    alias: "白バイ警官",
    role: "交通警察官",
    desc: "セルティが本気で恐れる交通警察官。無登録の黒バイクを執念深く追い、法と交通秩序を貫く。",
  },
  mairu: {
    alias: "臨也の妹",
    role: "来神学園生",
    desc: "臨也の双子の妹の一人。活発で格闘も得意、九瑠璃と意図的に対照的な人格を演じる。",
  },
  kururi: {
    alias: "臨也の妹",
    role: "来神学園生",
    desc: "臨也の双子の妹の一人。寡黙で内向的に見えるが弱くはなく、舞流と常に行動を共にする。",
  },
  rocchi: {
    alias: "黄巾賊の簒奪者",
    role: "黄巾賊",
    desc: "正臣の不在中に黄巾賊を掌握した男。ブルースクウェアと臨也の影響下で三勢力の衝突を激化させる。",
  },
  mikage: {
    alias: "格闘家",
    role: "武術家",
    desc: "高い実力を持つ女性格闘家。強者との勝負を求め、静雄やヴァローナにも関心を示す。",
  },
  adabashi: {
    alias: "ストーカー",
    role: "危険な追跡者",
    desc: "聖辺ルリへ歪んだ執着を向けるストーカー。行為を暴力へ拡大し、ルリと幽を脅かす。",
  },
  yodogiri: {
    alias: "共有される名",
    role: "裏社会の情報勢力",
    desc: "一人ではなく複数人が共有する名義。非人の情報を集め、矢霧製薬や臨也らと複雑に取引する。",
  },
  manami: {
    alias: "臨也への復讐者 / アニメ名義：間宮愛美",
    role: "復讐者・臨也の被害者",
    desc: "折原臨也の誘導で自殺寸前まで追い込まれ、救出後は彼を憎み追跡する。ほかの被害者とも接触し、自分なりの復讐へ動く。",
  },
  yuiga: {
    alias: "独尊丸",
    role: "平和島幽の愛猫",
    desc: "平和島幽が飼うスコティッシュフォールド。後に聖辺ルリとも暮らし、平和島兄弟とルリの日常をつなぐ存在となる。",
  },
};

export const appearanceJa: Record<string, string> = {
  "TV 第1期：第1–24话主要篇章": "TV第1期：第1～24話の主要エピソード",
  "TV《×2》承・转・结：第1–36话主要篇章":
    "TV『×2』承・転・結：第1～36話の主要エピソード",
  "第1期特别篇：第12.5话、第25话": "第1期特別編：第12.5話・第25話",
  "《×2》外传：第4.5、13.5、19.5话":
    "『×2』外伝：第4.5話・第13.5話・第19.5話",
  "本传第1–13卷：贯穿 DOLLARS、罪歌、黄巾贼与最终抗争篇":
    "本編1～13巻：ダラーズ、罪歌、黄巾賊、最終抗争を通して登場",
  "TV 第1期：第1–24话相关篇章": "TV第1期：第1～24話の関連エピソード",
  "TV《×2》承・转・结：回归及支线篇章":
    "TV『×2』承・転・結：再登場およびサブエピソード",
  "《×2》外传篇：相关群像": "『×2』外伝：関連する群像エピソード",
  "本传第1–3卷：首次主要登场": "本編1～3巻：主な初登場",
  "本传第4–13卷：相关后续篇章": "本編4～13巻：関連する後続エピソード",
  "TV《×2 承》起主要登场": "TV『×2 承』から主に登場",
  "TV《×2 转／结》后续篇章": "TV『×2 転／結』の後続エピソード",
  "本传第4–6卷：首次主要登场": "本編4～6巻：主な初登場",
  "本传第7–13卷：后续篇章": "本編7～13巻：後続エピソード",
  "TV《×2 转》起主要登场": "TV『×2 転』から主に登場",
  "TV《×2 结》后续篇章": "TV『×2 結』の後続エピソード",
  "《×2》外传：第13.5、19.5话相关群像":
    "『×2』外伝：第13.5話・第19.5話の関連群像",
  "本传第7–9卷：首次主要登场": "本編7～9巻：主な初登場",
  "本传第10–13卷：后续篇章": "本編10～13巻：後続エピソード",
  "TV《×2 结》主要篇章": "TV『×2 結』の主要エピソード",
  "《×2》外传第19.5话及同期群像": "『×2』外伝第19.5話と同時期の群像",
  "本传第10–13卷：最终抗争篇": "本編10～13巻：最終抗争編",
  "外传小说：《折原临也与夕阳》系列": "外伝小説：『折原臨也』シリーズ",
  "TV《×2 转／结》：临也相关篇章":
    "TV『×2 転／結』：臨也に関するエピソード",
  "本传第1卷：无名登场": "本編第1巻：名前のない人物として登場",
  "本传第11–13卷：以间宫爱海身份再登场":
    "本編第11～13巻：間宮愛海として再登場",
  "TV《×2 承》第3话起：平和岛幽相关场景":
    "TV『×2 承』第3話以降：平和島幽の関連シーン",
  "本传第4卷起：平和岛幽的爱猫":
    "本編第4巻以降：平和島幽の愛猫",
};

export const localizeProfile = (
  id: string,
  language: Language,
  fallback: JapaneseProfile,
) => (language === "ja" ? japaneseProfiles[id] ?? fallback : fallback);

export interface WorkEntry {
  id: string;
  category: "tv" | "ova" | "music" | "novels" | "manga";
  year: string;
  title: { zh: string; ja: string };
  meta: { zh: string; ja: string };
  description: { zh: string; ja: string };
  details?: { zh: string[]; ja: string[] };
  image?: string;
  images?: string[];
  imageRatio?: "16:9" | "4:3";
  links?: WorkLink[];
  accent: string;
}

export interface WorkLink {
  title: { zh: string; ja: string };
  href: string;
}

export const works: WorkEntry[] = [
  {
    id: "tv-1",
    category: "tv",
    year: "2010",
    title: { zh: "无头骑士异闻录", ja: "デュラララ!!" },
    meta: { zh: "TV 第1期 · 全24话", ja: "TV第1期・全24話" },
    description: {
      zh: "从帝人来到池袋开始，串联 DOLLARS、罪歌与黄巾贼三大篇章。",
      ja: "帝人の池袋到着から、ダラーズ、罪歌、黄巾賊の三つの物語を描く。",
    },
    details: {
      zh: ["首播：2010年1月—6月", "制作：Brain's Base", "导演：大森贵弘", "系列构成：高木登"],
      ja: ["放送：2010年1月～6月", "制作：Brain's Base", "監督：大森貴弘", "シリーズ構成：高木登"],
    },
    image: "https://www.durarara.com/img/top/KV.jpg",
    imageRatio: "16:9",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://www.durarara.com/",
      },
    ],
    accent: "#f4f500",
  },
  {
    id: "tv-shou",
    category: "tv",
    year: "2015",
    title: { zh: "无头骑士异闻录×2 承", ja: "デュラララ!!×2 承" },
    meta: { zh: "TV 第2期第一部 · 全12话", ja: "TV第2期 第1クール・全12話" },
    description: {
      zh: "池袋群像再次展开，青叶、茜、瓦罗娜等新人物进入关系网。",
      ja: "青葉、茜、ヴァローナらが加わり、池袋の群像が再び動き始める。",
    },
    details: {
      zh: ["首播：2015年1月—3月", "制作：朱夏", "导演：大森贵弘", "系列构成：高木登"],
      ja: ["放送：2015年1月～3月", "制作：朱夏", "監督：大森貴弘", "シリーズ構成：高木登"],
    },
    image: "https://www.durarara.com/img/top/KV.jpg",
    imageRatio: "16:9",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://www.durarara.com/",
      },
    ],
    accent: "#55d9ff",
  },
  {
    id: "tv-ten",
    category: "tv",
    year: "2015",
    title: { zh: "无头骑士异闻录×2 转", ja: "デュラララ!!×2 転" },
    meta: { zh: "TV 第2期第二部 · 全12话", ja: "TV第2期 第2クール・全12話" },
    description: {
      zh: "各阵营矛盾升级，帝人、正臣与杏里的秘密逐渐逼近彼此。",
      ja: "各勢力の対立が深まり、帝人、正臣、杏里の秘密が互いに迫っていく。",
    },
    details: {
      zh: ["首播：2015年7月—9月", "制作：朱夏", "承接《×2 承》第13—24话"],
      ja: ["放送：2015年7月～9月", "制作：朱夏", "『×2 承』に続く第13～24話"],
    },
    image: "https://www.durarara.com/img/top/KV.jpg",
    imageRatio: "16:9",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://www.durarara.com/",
      },
    ],
    accent: "#ff8c42",
  },
  {
    id: "tv-ketsu",
    category: "tv",
    year: "2016",
    title: { zh: "无头骑士异闻录×2 结", ja: "デュラララ!!×2 結" },
    meta: { zh: "TV 第2期第三部 · 全12话", ja: "TV第2期 第3クール・全12話" },
    description: {
      zh: "三人组与池袋多方势力进入最终抗争，长期铺设的关系集中收束。",
      ja: "三人組と池袋の勢力が最終局面へ進み、積み重ねられた関係が収束する。",
    },
    details: {
      zh: ["首播：2016年1月—3月", "制作：朱夏", "《×2》最终章，第25—36话"],
      ja: ["放送：2016年1月～3月", "制作：朱夏", "『×2』最終章・第25～36話"],
    },
    image: "https://www.durarara.com/img/top/KV.jpg",
    imageRatio: "16:9",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://www.durarara.com/",
      },
    ],
    accent: "#ff4d88",
  },
  {
    id: "ova-12-5",
    category: "ova",
    year: "2010",
    title: { zh: "第12.5话《天网恢恢》", ja: "第12.5話「天網恢恢」" },
    meta: { zh: "第1期特别篇 · 第一弹", ja: "第1期 特別編・第1弾" },
    description: {
      zh: "发生在本篇间隙的池袋骚动，补充主要人物的日常与城市传闻。",
      ja: "本編の合間に起きた池袋の騒動と、主要人物たちの日常を描く。",
    },
    details: {
      zh: ["话数：第12.5话", "标题：《天网恢恢》", "收录于第1期影像制品"],
      ja: ["話数：第12.5話", "タイトル：「天網恢恢」", "第1期映像商品に収録"],
    },
    image: "https://www.durarara.com/img/top/bnr_ova.jpg",
    imageRatio: "4:3",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://www.durarara.com/ova/",
      },
    ],
    accent: "#9b72ff",
  },
  {
    id: "ova-25",
    category: "ova",
    year: "2011",
    title: { zh: "第25话《天下泰平》", ja: "第25話「天下泰平」" },
    meta: { zh: "第1期特别篇 · 第二弹", ja: "第1期 特別編・第2弾" },
    description: {
      zh: "第1期之后的番外事件，以池袋居民的日常骚动为中心。",
      ja: "第1期後の番外事件として、池袋の住人たちの日常と騒動を描く。",
    },
    details: {
      zh: ["话数：第25话", "标题：《天下泰平》", "收录于第1期影像制品"],
      ja: ["話数：第25話", "タイトル：「天下泰平」", "第1期映像商品に収録"],
    },
    image: "https://www.durarara.com/img/top/bnr_ova.jpg",
    imageRatio: "4:3",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://www.durarara.com/ova/",
      },
    ],
    accent: "#9b72ff",
  },
  {
    id: "ova-x2-4-5",
    category: "ova",
    year: "2015",
    title: {
      zh: "第4.5话《我的心是火锅的形状》",
      ja: "第4.5話「私の心は鍋模様」",
    },
    meta: { zh: "《×2 承》外传", ja: "『×2 承』外伝" },
    description: {
      zh: "对应《×2 承》的外传篇，以火锅聚会串联池袋众人的关系。",
      ja: "『×2 承』に対応し、鍋を囲む池袋の人物たちを描く外伝。",
    },
    details: {
      zh: ["话数：第4.5话", "对应篇章：《×2 承》", "剧场先行上映特别篇"],
      ja: ["話数：第4.5話", "対応章：『×2 承』", "劇場先行上映の特別編"],
    },
    image: "https://www.durarara.com/img/ova03/about/img.jpg",
    imageRatio: "4:3",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://www.durarara.com/ova/",
      },
    ],
    accent: "#d96cff",
  },
  {
    id: "ova-x2-13-5",
    category: "ova",
    year: "2015",
    title: {
      zh: "第13.5话《恋爱故事铿锵作响》",
      ja: "第13.5話「お惚気チャカポコ」",
    },
    meta: { zh: "《×2 转》外传", ja: "『×2 転』外伝" },
    description: {
      zh: "对应《×2 转》的外传篇，从恋爱话题展开池袋群像的另一面。",
      ja: "『×2 転』に対応し、恋愛話から池袋群像の別の顔を描く外伝。",
    },
    details: {
      zh: ["话数：第13.5话", "对应篇章：《×2 转》", "剧场先行上映特别篇"],
      ja: ["話数：第13.5話", "対応章：『×2 転』", "劇場先行上映の特別編"],
    },
    image: "https://www.durarara.com/img/ova03/about/img.jpg",
    imageRatio: "4:3",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://www.durarara.com/ova/",
      },
    ],
    accent: "#d96cff",
  },
  {
    id: "ova-x2-19-5",
    category: "ova",
    year: "2016",
    title: { zh: "第19.5话《Dufufufu!!》", ja: "第19.5話「デュフフフ!!」" },
    meta: { zh: "《×2 结》外传", ja: "『×2 結』外伝" },
    description: {
      zh: "对应《×2 结》的外传篇，在最终阶段前补充人物日常与城市细节。",
      ja: "『×2 結』に対応し、終盤前の人物の日常と街の細部を補完する外伝。",
    },
    details: {
      zh: ["话数：第19.5话", "对应篇章：《×2 结》", "剧场先行上映特别篇"],
      ja: ["話数：第19.5話", "対応章：『×2 結』", "劇場先行上映の特別編"],
    },
    image: "https://www.durarara.com/img/ova03/about/img.jpg",
    imageRatio: "4:3",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://www.durarara.com/ova/",
      },
    ],
    accent: "#d96cff",
  },
  {
    id: "music-ost",
    category: "music",
    year: "2010–2016",
    title: { zh: "动画原声音乐", ja: "アニメーション・サウンドトラック" },
    meta: { zh: "作曲：吉森信", ja: "音楽：吉森信" },
    description: {
      zh: "以爵士、放克与都市感配乐构成池袋独特的声音景观。",
      ja: "ジャズ、ファンク、都会的な劇伴が池袋独自の音風景を作り出す。",
    },
    details: {
      zh: ["作曲：吉森信", "涵盖第一期与《×2》系列配乐", "包含多张原声及附属特典盘"],
      ja: ["作曲：吉森信", "第1期と『×2』の劇伴を収録", "複数のサウンドトラックと特典盤で展開"],
    },
    image: "https://www.durarara.com/social.jpg",
    imageRatio: "4:3",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://www.durarara.com/",
      },
    ],
    accent: "#5ee2a0",
  },
  {
    id: "music-best",
    category: "music",
    year: "2016",
    title: {
      zh: "The Greatest Hits ～Sweet Strange Memories",
      ja: "The Greatest Hits ～Sweet Strange Memories",
    },
    meta: { zh: "BGM 精选集", ja: "BGMベストセレクション" },
    description: {
      zh: "从《无头骑士异闻录》与《×2》中选出的吉森信配乐合集。",
      ja: "『デュラララ!!』と『×2』を彩った吉森信のBGMベスト盤。",
    },
    details: {
      zh: ["发行：2016年6月8日", "作曲：吉森信", "系列代表性 BGM 精选"],
      ja: ["発売：2016年6月8日", "作曲：吉森信", "シリーズを代表するBGMベスト"],
    },
    image: "https://www.durarara.com/social.jpg",
    imageRatio: "4:3",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://www.durarara.com/",
      },
    ],
    accent: "#55d9ff",
  },
  {
    id: "novels-main",
    category: "novels",
    year: "2004–2014",
    title: { zh: "无头骑士异闻录 本传", ja: "デュラララ!! 本編" },
    meta: { zh: "成田良悟 · 全13卷", ja: "成田良悟・全13巻" },
    description: {
      zh: "由成田良悟创作、安田典生插画的电击文库轻小说系列。",
      ja: "成田良悟著、ヤスダスズヒト画による電撃文庫のライトノベル。",
    },
    details: {
      zh: ["作者：成田良悟", "插画：安田典生", "电击文库，全13卷", "出版：2004年4月—2014年1月"],
      ja: ["著者：成田良悟", "イラスト：ヤスダスズヒト", "電撃文庫・全13巻", "刊行：2004年4月～2014年1月"],
    },
    image: "https://cdn.kdkw.jp/cover_1000/312133/312133900000.webp",
    imageRatio: "4:3",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://dengekibunko.jp/product/drrr/312133900000.html",
      },
    ],
    accent: "#f4f500",
  },
  {
    id: "novels-sh",
    category: "novels",
    year: "2014–",
    title: { zh: "无头骑士异闻录SH", ja: "デュラララ!!SH" },
    meta: { zh: "新世代篇 · 已出版4卷", ja: "新世代編・既刊4巻" },
    description: {
      zh: "本传完结约一年半后的池袋，新一代学生与熟悉人物再次相遇。",
      ja: "本編から約一年半後の池袋で、新世代の学生とおなじみの人物が交差する。",
    },
    details: {
      zh: ["作者：成田良悟", "插画：安田典生", "电击文库，已出版4卷", "故事时间位于本传约一年半后"],
      ja: ["著者：成田良悟", "イラスト：ヤスダスズヒト", "電撃文庫・既刊4巻", "本編から約1年半後を描く"],
    },
    image: "https://cdn.kdkw.jp/cover_1000/312097/312097600000.webp",
    imageRatio: "4:3",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://dengekibunko.jp/product/drrr/",
      },
    ],
    accent: "#ff8c42",
  },
  {
    id: "novels-gaiden",
    category: "novels",
    year: "2015",
    title: { zh: "无头骑士异闻录 外传!?", ja: "デュラララ!! 外伝!?" },
    meta: { zh: "短篇集 · 全1卷", ja: "短編集・全1巻" },
    description: {
      zh: "收录发生在本传幕间的短篇，以池袋居民的日常与骚动为中心。",
      ja: "本編の幕間に起きた、池袋の住人たちの日常と騒動を収める短編集。",
    },
    details: {
      zh: ["作者：成田良悟", "插画：安田典生", "电击文库", "本传相关短篇合集"],
      ja: ["著者：成田良悟", "イラスト：ヤスダスズヒト", "電撃文庫", "本編関連の短編を収録"],
    },
    image: "https://cdn.kdkw.jp/cover_1000/312032/312032400000.webp",
    imageRatio: "4:3",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://dengekibunko.jp/product/drrr/",
      },
    ],
    accent: "#9b72ff",
  },
  {
    id: "novels-izaya",
    category: "novels",
    year: "2015–2016",
    title: { zh: "折原临也系列", ja: "折原臨也シリーズ" },
    meta: { zh: "角色外传 · 全2卷", ja: "キャラクター外伝・全2巻" },
    description: {
      zh: "描写折原临也离开池袋后的事件，包括《与夕阳》和《与喝彩》。",
      ja: "池袋を離れた折原臨也を描く『夕焼けを』『喝采を』の二作品。",
    },
    details: {
      zh: ["《折原临也与夕阳》", "《折原临也与喝彩》", "作者：成田良悟", "插画：安田典生"],
      ja: ["『折原臨也と、夕焼けを』", "『折原臨也と、喝采を』", "著者：成田良悟", "イラスト：ヤスダスズヒト"],
    },
    image: "https://cdn.kdkw.jp/cover_1000/312032/312032500000.webp",
    imageRatio: "4:3",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://dengekibunko.jp/product/drrr/",
      },
    ],
    accent: "#d96cff",
  },
  {
    id: "manga-main",
    category: "manga",
    year: "2009–2016",
    title: { zh: "无头骑士异闻录 漫画版", ja: "デュラララ!! コミカライズ" },
    meta: { zh: "本篇及罪歌、黄巾贼、RE;DOLLARS篇", ja: "本編・罪歌編・黄巾賊編・RE;ダラーズ編" },
    description: {
      zh: "由茶鸟木明代等作画，将小说主要篇章分系列漫画化。",
      ja: "茶鳥木明代らの作画で、原作の主要エピソードをシリーズ別に漫画化。",
    },
    details: {
      zh: ["原作：成田良悟", "角色原案：安田典生", "漫画：茶鸟木明代等", "SQUARE ENIX 出版"],
      ja: ["原作：成田良悟", "キャラクター原案：ヤスダスズヒト", "作画：茶鳥木明代ほか", "スクウェア・エニックス刊"],
    },
    image: "https://www.durarara.com/social.jpg",
    imageRatio: "4:3",
    links: [
      {
        title: { zh: "官方页面", ja: "公式ページ" },
        href: "https://magazine.jp.square-enix.com/gfantasy/story/durarara/",
      },
    ],
    accent: "#5ee2a0",
  },
];
