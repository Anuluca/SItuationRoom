const IKEBUKURO_DATA = (() => {
  const factions = {
    core: { name: "池袋核心", color: "#7a70ff" },
    dollars: { name: "DOLLARS", color: "#000000" },
    yellow: { name: "黄巾贼", color: "#f2bd27" },
    blue: { name: "蓝色平方", color: "#4f8cff" },
    awakening: { name: "罪歌之子", color: "#d96cff" },
    awakusu: { name: "粟楠会", color: "#ff7b45" },
    russia: { name: "俄罗斯势力", color: "#55d9ff" },
    yagiri: { name: "矢雾制药", color: "#5ee2a0" },
    media: { name: "演艺 / 媒体", color: "#ff78b6" },
    independent: { name: "独立人物", color: "#a09da8" },
  };

  const relationTypes = {
    intimate: { name: "亲密 / 爱慕", color: "#ff4d88", dash: null },
    family: { name: "家族", color: "#ff9b5c", dash: null },
    friend: { name: "朋友 / 同伴", color: "#ffc82c", dash: null },
    organization: { name: "组织 / 雇佣", color: "#5ee2a0", dash: [5, 3] },
    enemy: { name: "对立 / 冲突", color: "#ff5151", dash: [3, 3] },
    manipulate: { name: "利用 / 控制", color: "#9b72ff", dash: [7, 4] },
    protect: { name: "保护 / 救助", color: "#55d9ff", dash: null },
  };

  // Add `avatar: "./assets/images/avatars/<id>.webp"` to any character as needed.
  const characters = [
    {
      id: "celty",
      name: "塞尔提·史特路尔森",
      jp: "セルティ・ストゥルルソン",
      alias: "无头骑士 / 黑骑手",
      faction: "core",
      role: "都市传说 · 运送员",
      desc: "来自爱尔兰的无头妖精，为寻找失去的头颅来到池袋。她骑着由黑马变成的摩托，在城市中担任地下运送员；外表神秘，实际温和而富有人情味。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/01.jpg'
    },
    {
      id: "shinra",
      name: "岸谷新罗",
      jp: "岸谷 新羅",
      alias: "地下密医",
      faction: "core",
      role: "密医 · 塞尔提的恋人",
      desc: "从少年时代便迷恋塞尔提的地下医生。擅长处理无法进入正规医院的伤者，处事轻快却有很强的观察力，也会为了塞尔提隐瞒重要事实。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/02.jpg'
    },
    {
      id: "izaya",
      name: "折原临也",
      jp: "折原 臨也",
      alias: "情报贩子",
      faction: "independent",
      role: "情报商 · 棋局操纵者",
      desc: "自称热爱全人类的情报贩子，把池袋众人的选择视为观察人性的实验。擅长挑拨、布局与操纵情报，与平和岛静雄长期势同水火。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/03.jpg'
    },
    {
      id: "shizuo",
      name: "平和岛静雄",
      jp: "平和島 静雄",
      alias: "池袋最强",
      faction: "core",
      role: "讨债人 · 怪力者",
      desc: "穿酒保服、戴墨镜的池袋最强者。天生拥有远超常人的力量，讨厌暴力却极易被激怒；重视家人、朋友和承诺。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/04.jpg'
    },
    {
      id: "mikado",
      name: "龙之峰帝人",
      jp: "竜ヶ峰 帝人",
      alias: "田中太郎",
      faction: "dollars",
      avatar: "./assets/images/avatars/mikado.webp",
      role: "DOLLARS 创立者 · 蓝色平方首领",
      desc: "向往非日常而来到池袋的高中生，也是无色帮派 DOLLARS 的创立者之一。平静外表下藏着对异常世界的执着，后期逐渐走向极端。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/05.jpg'
    },
    {
      id: "masaomi",
      name: "纪田正臣",
      jp: "紀田 正臣",
      alias: "巴裘拉",
      faction: "yellow",
      role: "黄巾贼将军",
      desc: "帝人的好友，性格轻浮健谈，曾是黄巾贼首领。因为沙树受伤而逃离过去，最终仍选择面对帮派与朋友之间的冲突。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/06.jpg'
    },
    {
      id: "anri",
      name: "园原杏里",
      jp: "園原 杏里",
      alias: "罪歌母体",
      faction: "awakening",
      role: "来良学园学生 · 罪歌持有者",
      desc: "安静内向的女高中生，体内寄宿妖刀罪歌。她以“寄生”来理解人与世界，却非常珍惜帝人与正臣，并努力控制罪歌之子的网络。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/07.jpg'
    },
    {
      id: "kida-saki",
      name: "三岛沙树",
      jp: "三ヶ島 沙樹",
      alias: "沙树",
      faction: "yellow",
      role: "正臣的恋人",
      desc: "纪田正臣的恋人。曾受临也影响接近正臣，在蓝色平方事件中重伤；她看穿临也的操纵，也比正臣想象中更加坚韧。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/08.jpg'
    },
    {
      id: "aoba",
      name: "黑沼青叶",
      jp: "黒沼 青葉",
      alias: "蓝色平方幕后首领",
      faction: "blue",
      role: "学生 · 帮派策划者",
      desc: "来良学园后辈，表面爽朗，实际是蓝色平方真正的核心。试图借帝人和 DOLLARS 的名义扩张势力，并推动帝人更深地进入非日常。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/09.jpg'
    },
    {
      id: "izumii",
      name: "泉井兰",
      jp: "泉井 蘭",
      alias: "蓝色平方前首领",
      faction: "blue",
      role: "暴力派首领",
      desc: "青叶的兄长，曾作为蓝色平方的公开首领与黄巾贼抗争。性格凶暴，对弟弟既怨恨又受其摆布。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/10.jpg'
    },
    {
      id: "kadota",
      name: "门田京平",
      jp: "門田 京平",
      alias: "小田田",
      faction: "dollars",
      role: "DOLLARS 成员 · 小队领袖",
      desc: "可靠而讲义气的池袋青年，带领游马崎、狩泽和渡草行动。过去属于蓝色平方，因无法接受其做法而脱离。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/11.jpg'
    },
    {
      id: "yumasaki",
      name: "游马崎沃克",
      jp: "遊馬崎 ウォーカー",
      alias: "阿宅二人组",
      faction: "dollars",
      role: "DOLLARS 成员",
      desc: "门田小队成员，重度御宅族。言行看似脱线，处理敌人时却会展现危险而果断的一面。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/12.jpg'
    },
    {
      id: "karisawa",
      name: "狩泽绘理华",
      jp: "狩沢 絵理華",
      alias: "阿宅二人组",
      faction: "dollars",
      role: "DOLLARS 成员",
      desc: "门田小队成员，与游马崎兴趣相投。熟悉御宅文化，观察敏锐，常用作品梗解释池袋发生的事件。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/13.jpg'
    },
    {
      id: "togusa",
      name: "渡草三郎",
      jp: "渡草 三郎",
      alias: "面包车司机",
      faction: "dollars",
      role: "DOLLARS 成员 · 司机",
      desc: "门田小队的司机，对偶像圣边琉璃极度狂热。最不能容忍别人损坏自己的爱车。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/14.jpg'
    },
    {
      id: "seiji",
      name: "矢雾诚二",
      jp: "矢霧 誠二",
      alias: "头颅迷恋者",
      faction: "yagiri",
      role: "来良学园学生",
      desc: "对塞尔提的头颅产生病态爱恋的学生。无视周围常识追逐自己认定的“爱”，与张间美香形成扭曲却稳定的关系。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/15.jpg'
    },
    {
      id: "mika",
      name: "张间美香",
      jp: "張間 美香",
      alias: "诚二的追随者",
      faction: "independent",
      role: "来良学园学生",
      desc: "曾跟踪诚二并发现塞尔提的头颅。她接受整形伪装后继续留在诚二身边，执着程度与行动力都远超常人。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/16.jpg'
    },
    {
      id: "namie",
      name: "矢雾波江",
      jp: "矢霧 波江",
      alias: "矢雾制药研究员",
      faction: "yagiri",
      role: "研究员 · 临也的秘书",
      desc: "诚二的姐姐，对弟弟抱有偏执的占有欲。矢雾制药事件后成为临也的秘书，与他维持互相利用、彼此警惕的关系。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/17.jpg'
    },
    {
      id: "shingen",
      name: "岸谷森严",
      jp: "岸谷 森厳",
      alias: "面具研究员",
      faction: "yagiri",
      role: "研究者 · 新罗之父",
      desc: "新罗的父亲，研究非人存在的科学家。曾偷走塞尔提的头颅并参与矢雾制药研究，行为古怪而难以捉摸。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/18.jpg'
    },
    {
      id: "emilia",
      name: "艾米莉亚",
      jp: "エミリア",
      alias: "森严的妻子",
      faction: "yagiri",
      role: "研究者",
      desc: "森严的再婚对象，同样从事特殊研究。性格直率开放，与新罗相处得像年龄相近的朋友。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/19.jpg'
    },
    {
      id: "kasane",
      name: "鲸木重",
      jp: "鯨木 かさね",
      alias: "罪歌持有者",
      faction: "awakening",
      role: "经纪人 · 妖刀持有者",
      desc: "掌握另一把罪歌的神秘女子，长期以经纪人与幕后工作者身份活动。她冷静地利用罪歌网络，也对非人存在抱有独特兴趣。",
        avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/20.jpg'
    },
    {
      id: "haruna",
      name: "贽川春奈",
      jp: "贄川 春奈",
      alias: "罪歌之子",
      faction: "awakening",
      role: "学生 · 罪歌支配者",
      desc: "被罪歌控制并爱上那须岛的少女，曾在池袋制造大规模袭击。后来成为罪歌网络中仍保有强烈个人欲望的一员。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/21.jpg'
    },
    {
      id: "shuji",
      name: "贽川周二",
      jp: "贄川 周二",
      alias: "记者",
      faction: "independent",
      role: "杂志记者 · 春奈之父",
      desc: "专门调查池袋最强者的记者，也是春奈的父亲。在追查静雄的过程中被卷入罪歌事件。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/22.jpg'
    },
    {
      id: "nasujima",
      name: "那须岛隆志",
      jp: "那須島 隆志",
      alias: "前教师",
      faction: "independent",
      role: "欺诈者",
      desc: "利用学生与他人的前教师，曾与春奈发生不正当关系。其自私行为引发罪歌事件，之后仍不断卷入池袋的阴暗交易。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/23.jpg'
    },
    {
      id: "simon",
      name: "赛门·布雷兹涅夫",
      jp: "サイモン・ブレジネフ",
      alias: "露西寿司招牌店员",
      faction: "russia",
      role: "寿司店员 · 前战斗人员",
      desc: "在露西寿司门口招揽客人的俄罗斯壮汉，拥有足以阻止静雄的力量。性格温和，希望池袋众人以和平方式解决冲突。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/24.jpg'
    },
    {
      id: "denis",
      name: "丹尼斯",
      jp: "デニス",
      alias: "露西寿司老板",
      faction: "russia",
      role: "寿司店主",
      desc: "露西寿司的老板兼厨师，与赛门有共同的过去。表面经营餐馆，也熟悉俄罗斯地下圈子的规则。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/25.jpg'
    },
    {
      id: "vorona",
      name: "瓦罗娜",
      jp: "ヴァローナ",
      alias: "金发杀手",
      faction: "russia",
      role: "雇佣兵 · 静雄的后辈",
      desc: "来自俄罗斯的年轻雇佣兵，渴望与强者战斗。来到日本后与斯隆行动，后来在田中汤姆手下工作并逐渐敬佩静雄。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/26.jpg'
    },
    {
      id: "sloan",
      name: "斯隆",
      jp: "スローン",
      alias: "雇佣兵",
      faction: "russia",
      role: "瓦罗娜的搭档",
      desc: "与瓦罗娜一同来到日本的雇佣兵，负责支援和驾驶。看似粗犷，实际十分信任搭档。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/27.jpg'
    },
    {
      id: "egor",
      name: "叶戈尔",
      jp: "エゴール",
      alias: "哲学的杀人机器",
      faction: "russia",
      role: "俄罗斯杀手",
      desc: "俄罗斯地下世界闻名的杀手，实力强大且有自己的行事哲学。受伤后得到杏里帮助，由此进入池袋关系网。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/28.jpg'
    },
    {
      id: "tom",
      name: "田中汤姆",
      jp: "田中 トム",
      alias: "讨债公司负责人",
      faction: "core",
      role: "讨债人 · 静雄的上司",
      desc: "静雄的中学前辈与现任上司，头脑冷静，擅长安抚静雄。两人作为讨债搭档行动，后来也雇佣瓦罗娜。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/29.jpg'
    },
    {
      id: "kasuka",
      name: "平和岛幽",
      jp: "平和島 幽",
      alias: "羽岛幽平",
      faction: "media",
      role: "演员 · 静雄之弟",
      desc: "静雄的弟弟，以羽岛幽平之名成为知名演员。感情表现很淡，却一直理解并关心哥哥，与圣边琉璃交往。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/30.jpg'
    },
    {
      id: "ruri",
      name: "圣边琉璃",
      jp: "聖辺 ルリ",
      alias: "好莱坞",
      faction: "media",
      role: "偶像 · 连环袭击者",
      desc: "拥有异常身体能力的偶像，同时以“好莱坞”身份袭击他人。被幽接纳后逐渐找到容身之处，与塞尔提也成为朋友。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/31.jpg'
    },
    {
      id: "max",
      name: "马克斯·桑德谢尔特",
      jp: "マックス・サンドシェルト",
      alias: "制片人",
      faction: "media",
      role: "电影制片人",
      desc: "幽所属事务相关的制片人，热衷把池袋的异常事件转化为影视题材，行动力与商业嗅觉都很强。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/32.jpg'
    },
    {
      id: "akane",
      name: "粟楠茜",
      jp: "粟楠 茜",
      alias: "道场少女",
      faction: "awakusu",
      role: "粟楠会会长之孙女",
      desc: "粟楠会会长的孙女，因误解而试图刺杀静雄。真相揭开后，她把静雄视为值得信赖的“大哥哥”。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/33.jpg'
    },
    {
      id: "shiki",
      name: "四木春也",
      jp: "四木 春也",
      alias: "粟楠会干部",
      faction: "awakusu",
      role: "粟楠会干部",
      desc: "负责粟楠会对外交涉的干部，冷静克制，重视组织秩序。与塞尔提、新罗等地下职业者保持业务往来。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/34.jpg'
    },
    {
      id: "akabayashi",
      name: "赤林海月",
      jp: "赤林 海月",
      alias: "赤鬼",
      faction: "awakusu",
      role: "粟楠会干部",
      desc: "粟楠会实力派干部，年轻时曾被罪歌所伤，并对杏里的母亲怀有感情。暗中关照杏里，行事有自己的一套仁义。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/35.jpg'
    },
    {
      id: "aozaki",
      name: "青崎柊",
      jp: "青崎 柊",
      alias: "青鬼",
      faction: "awakusu",
      role: "粟楠会干部",
      desc: "粟楠会武斗派干部，与赤林常有竞争。重视组织威信，处理问题比四木和赤林更直接强硬。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/36.jpg'
    },
    {
      id: "chikage",
      name: "六条千景",
      jp: "六条 千景",
      alias: "DraGon Zombie 总长",
      faction: "independent",
      role: "埼玉暴走族首领",
      desc: "埼玉暴走族首领，重视伙伴，也有自己对待女性的原则。因成员被 DOLLARS 袭击而来到池袋，与正臣交手后互相认可。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/37.jpg'
    },
    {
      id: "kuzuhara",
      name: "葛原金之助",
      jp: "葛原 金之助",
      alias: "交警",
      faction: "independent",
      role: "交通警察",
      desc: "令塞尔提真正感到恐惧的交通警察。执着追捕违反交通规则的黑色摩托，是池袋混乱中少数坚持正规秩序的人。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/38.jpg'
    },
    {
      id: "mairu",
      name: "折原舞流",
      jp: "折原 舞流",
      alias: "临也的妹妹",
      faction: "independent",
      role: "来神学园学生",
      desc: "临也的双胞胎妹妹之一，活泼好动，擅长格斗。与九琉璃刻意把性格分成两个极端，两人都与哥哥保持复杂距离。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/39.jpg'
    },
    {
      id: "kururi",
      name: "折原九琉璃",
      jp: "折原 九瑠璃",
      alias: "临也的妹妹",
      faction: "independent",
      role: "来神学园学生",
      desc: "临也的双胞胎妹妹之一，寡言内向，却并不软弱。与舞流几乎总是共同行动。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/40.jpg'
    },
    {
      id: "rocchi",
      name: "法螺田",
      jp: "法螺田",
      alias: "黄巾贼夺权者",
      faction: "yellow",
      role: "黄巾贼成员",
      desc: "趁正臣离开后掌握黄巾贼的一派，实际受到蓝色平方与临也的影响。以暴力推动三方冲突。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/41.jpg'
    },
    {
      id: "mikage",
      name: "写乐美影",
      jp: "写楽 美影",
      alias: "格斗家",
      faction: "independent",
      role: "武术家",
      desc: "实力出众的女性格斗家，与临也有工作往来。追求与强者交手，对静雄和瓦罗娜都抱有兴趣。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/42.jpg'
    },
    {
      id: "adabashi",
      name: "徒桥喜助",
      jp: "徒橋 喜助",
      alias: "跟踪者",
      faction: "independent",
      role: "危险跟踪者",
      desc: "对圣边琉璃抱有扭曲执念的跟踪者，行为逐渐升级为暴力犯罪，是琉璃与幽关系中的直接威胁。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/43.jpg'
    },
    {
      id: "yodogiri",
      name: "淀切阵内",
      jp: "淀切 陣内",
      alias: "共享身份",
      faction: "independent",
      role: "幕后情报势力",
      desc: "并非单独一人，而是多人共同使用的身份。长期收集并交易有关非人存在的情报，与鲸木重、矢雾制药及临也均有交集。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/44.jpg'
    },
    {
      id: "manami",
      name: "间宫爱海",
      jp: "間宮 愛海",
      alias: "临也的复仇者 / 动画版名义：间宫爱美",
      faction: "independent",
      role: "复仇者 · 临也受害者",
      desc: "曾因折原临也的诱导走向自杀边缘，获救后长期追查并憎恨临也。她后来与其他受害者接触，以自己的方式参与针对临也的复仇。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/45.jpg'
    },
    {
      id: "yuiga",
      name: "唯我独尊丸",
      jp: "唯我独尊丸",
      alias: "独尊丸",
      faction: "media",
      role: "平和岛幽的爱猫",
      desc: "平和岛幽饲养的苏格兰折耳猫，后来也与圣边琉璃共同生活。名字气势十足，实际是平和岛兄弟与琉璃日常关系中的温柔一角。",
      avatar:'https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/avatar/46.jpg'
    },
  ];

  const characterCasts = {
    celty: "泽城美雪",
    shinra: "福山润",
    izaya: "神谷浩史",
    shizuo: "小野大辅",
    mikado: "丰永利行",
    masaomi: "宫野真守",
    anri: "花泽香菜",
    "kida-saki": "福圆美里",
    aoba: "下野纮",
    izumii: "伊丸冈笃",
    kadota: "中村悠一",
    yumasaki: "梶裕贵",
    karisawa: "高垣彩阳",
    togusa: "寺岛拓笃",
    seiji: "堀江一真",
    mika: "伊濑茉莉也",
    namie: "小林沙苗",
    shingen: "大塚明夫",
    emilia: "种崎敦美",
    kasane: "桑岛法子",
    haruna: "中原麻衣",
    shuji: "小山力也",
    nasujima: "上田祐司",
    simon: "黑田崇矢",
    denis: "高桥伸也",
    vorona: "M・A・O",
    sloan: "三上哲",
    egor: "森川智之",
    tom: "小西克幸",
    kasuka: "岸尾大辅",
    ruri: "藤田咲",
    max: "小野坂昌也",
    akane: "久野美咲",
    shiki: "大塚芳忠",
    akabayashi: "山口胜平",
    aozaki: "梁田清之",
    chikage: "小野友树",
    kuzuhara: "藤原启治",
    mairu: "喜多村英梨",
    kururi: "金元寿子",
    rocchi: "高木涉",
    mikage: "五十岚裕美",
    adabashi: "上田燿司",
    yodogiri: "飞田展男、长克巳、秋元羊介 等",
    manami: "田上真里奈",
    yuiga: "种崎敦美",
  };

  const identityOverrides = {
    celty: ["core", "dollars"],
    shizuo: ["core", "dollars"],
    mikado: ["dollars", "blue"],
    masaomi: ["yellow", "dollars"],
    anri: ["awakening", "dollars"],
    aoba: ["blue", "dollars"],
    kadota: ["dollars", "blue"],
    yumasaki: ["dollars", "blue"],
    karisawa: ["dollars", "blue"],
    togusa: ["dollars", "blue"],
    rocchi: ["yellow", "blue"],
  };

  const appearanceProfiles = {
    core: {
      animation: [
        "TV 第1期：第1–24话主要篇章",
        "TV《×2》承・转・结：第1–36话主要篇章",
      ],
      ova: ["第1期特别篇：第12.5话、第25话", "《×2》外传：第4.5、13.5、19.5话"],
      novel: ["本传第1–13卷：贯穿 DOLLARS、罪歌、黄巾贼与最终抗争篇"],
    },
    early: {
      animation: [
        "TV 第1期：第1–24话相关篇章",
        "TV《×2》承・转・结：回归及支线篇章",
      ],
      ova: ["第1期特别篇：第12.5话、第25话", "《×2》外传篇：相关群像"],
      novel: ["本传第1–3卷：首次主要登场", "本传第4–13卷：相关后续篇章"],
    },
    shou: {
      animation: ["TV《×2 承》起主要登场", "TV《×2 转／结》后续篇章"],
      ova: ["《×2》外传：第4.5、13.5、19.5话相关群像"],
      novel: ["本传第4–6卷：首次主要登场", "本传第7–13卷：后续篇章"],
    },
    ten: {
      animation: ["TV《×2 转》起主要登场", "TV《×2 结》后续篇章"],
      ova: ["《×2》外传：第13.5、19.5话相关群像"],
      novel: ["本传第7–9卷：首次主要登场", "本传第10–13卷：后续篇章"],
    },
    ketsu: {
      animation: ["TV《×2 结》主要篇章"],
      ova: ["《×2》外传第19.5话及同期群像"],
      novel: ["本传第10–13卷：最终抗争篇"],
    },
  };

  const coreAppearanceIds = new Set([
    "celty",
    "shinra",
    "izaya",
    "shizuo",
    "mikado",
    "masaomi",
    "anri",
  ]);
  const shouAppearanceIds = new Set([
    "aoba",
    "chikage",
    "mairu",
    "kururi",
    "ruri",
    "max",
    "akane",
    "shiki",
    "vorona",
    "sloan",
  ]);
  const tenAppearanceIds = new Set([
    "egor",
    "akabayashi",
    "aozaki",
    "kasane",
    "emilia",
    "yodogiri",
  ]);
  const ketsuAppearanceIds = new Set(["mikage", "adabashi", "manami"]);

  characters.forEach((character) => {
    character.factions = identityOverrides[character.id] || [character.faction];
    character.cv = characterCasts[character.id];

    let appearanceKey = "early";
    if (coreAppearanceIds.has(character.id)) appearanceKey = "core";
    if (shouAppearanceIds.has(character.id)) appearanceKey = "shou";
    if (tenAppearanceIds.has(character.id)) appearanceKey = "ten";
    if (ketsuAppearanceIds.has(character.id)) appearanceKey = "ketsu";

    character.appearances = appearanceProfiles[appearanceKey];
  });

  const characterExtraAppearances = {
    izaya: ["外传小说：《折原临也与夕阳》系列"],
  };

  const characterAppearanceOverrides = {
    manami: {
      animation: ["TV《×2 转／结》：临也相关篇章"],
      novel: ["本传第1卷：无名登场", "本传第11–13卷：以间宫爱海身份再登场"],
    },
    yuiga: {
      animation: ["TV《×2 承》第3话起：平和岛幽相关场景"],
      novel: ["本传第4卷起：平和岛幽的爱猫"],
    },
  };

  characters.forEach((character) => {
    if (characterAppearanceOverrides[character.id]) {
      character.appearances = characterAppearanceOverrides[character.id];
    }
    if (characterExtraAppearances[character.id]) {
      character.appearances = {
        ...character.appearances,
        extra: characterExtraAppearances[character.id],
      };
    }
  });

  const rel = (source, target, type, label, note = "") => ({
    source,
    target,
    type,
    label,
    note,
  });

  const relations = [
    rel("celty", "shinra", "intimate", "恋人", "共同生活，彼此是最重要的归宿"),
    rel(
      "celty",
      "shingen",
      "enemy",
      "头颅被盗",
      "森严曾偷走并研究塞尔提的头颅"
    ),
    rel("celty", "shizuo", "friend", "好友", "彼此信任，经常互相帮忙"),
    rel(
      "celty",
      "izaya",
      "manipulate",
      "情报交易",
      "临也利用她对头颅的执念推动局势"
    ),
    rel(
      "celty",
      "mikado",
      "protect",
      "相识 / 帮助",
      "多次帮助被卷入事件的帝人"
    ),
    rel("celty", "anri", "friend", "朋友", "共同面对罪歌与都市传说事件"),
    rel("celty", "kuzuhara", "enemy", "追捕", "金之助不断追查黑色无牌摩托"),
    rel(
      "celty",
      "shiki",
      "organization",
      "业务委托",
      "为粟楠会执行地下运送工作"
    ),
    rel("celty", "ruri", "friend", "非人好友", "因相似的异质身份产生理解"),
    rel(
      "shinra",
      "shingen",
      "family",
      "父子",
      "研究兴趣相近，价值观却常有冲突"
    ),
    rel("shinra", "emilia", "family", "继母与继子"),
    rel("shinra", "izaya", "friend", "同学 / 熟人", "来神高中时代的同学"),
    rel(
      "shinra",
      "shizuo",
      "friend",
      "同学 / 医患",
      "来神高中同学，也常替静雄治疗"
    ),
    rel(
      "shinra",
      "shiki",
      "organization",
      "地下医疗",
      "为粟楠会相关人员提供治疗"
    ),
    rel("izaya", "shizuo", "enemy", "宿敌", "长期互相憎恶并在池袋追逐冲突"),
    rel(
      "izaya",
      "mikado",
      "manipulate",
      "引导 / 观察",
      "诱导帝人走向他渴望的非日常"
    ),
    rel("izaya", "masaomi", "manipulate", "操纵", "利用沙树与黄巾贼控制正臣"),
    rel("izaya", "kida-saki", "manipulate", "操纵", "曾指示沙树接近并观察正臣"),
    rel(
      "izaya",
      "namie",
      "organization",
      "雇佣",
      "波江成为临也的秘书，双方互相利用"
    ),
    rel("izaya", "mairu", "family", "兄妹"),
    rel("izaya", "kururi", "family", "兄妹"),
    rel("izaya", "yodogiri", "enemy", "情报战", "双方争夺非人情报并互设陷阱"),
    rel("izaya", "mikage", "organization", "雇佣关系"),
    rel(
      "shizuo",
      "tom",
      "organization",
      "讨债搭档",
      "汤姆是静雄的上司与稳定器"
    ),
    rel("shizuo", "kasuka", "family", "兄弟", "静雄十分珍视弟弟"),
    rel(
      "shizuo",
      "vorona",
      "friend",
      "前辈 / 后辈",
      "瓦罗娜从挑战强者转为敬佩静雄"
    ),
    rel("shizuo", "akane", "protect", "保护", "误会解除后成为茜信任的大哥哥"),
    rel("shizuo", "chikage", "enemy", "短暂冲突", "因池袋骚乱交手"),
    rel("shizuo", "shuji", "enemy", "调查对象", "周二为报道追查池袋最强"),
    rel("mikado", "masaomi", "friend", "挚友", "三人组的核心友情"),
    rel(
      "mikado",
      "anri",
      "intimate",
      "喜欢 / 同伴",
      "互有好感，却长期无法坦白秘密"
    ),
    rel(
      "mikado",
      "aoba",
      "manipulate",
      "合作与诱导",
      "青叶推动帝人成为蓝色平方的表面领袖"
    ),
    rel(
      "mikado",
      "kadota",
      "friend",
      "DOLLARS 同伴",
      "门田常在关键时刻帮助帝人"
    ),
    rel("mikado", "seiji", "friend", "同学"),
    rel("mikado", "mika", "friend", "同学"),
    rel("masaomi", "anri", "friend", "挚友", "三人彼此隐瞒身份又互相保护"),
    rel("masaomi", "kida-saki", "intimate", "恋人"),
    rel("masaomi", "rocchi", "enemy", "黄巾贼内斗"),
    rel(
      "masaomi",
      "chikage",
      "friend",
      "交手后认可",
      "两位首领在冲突后建立理解"
    ),
    rel(
      "anri",
      "haruna",
      "enemy",
      "罪歌母体争夺",
      "杏里压制春奈控制的罪歌之子"
    ),
    rel(
      "anri",
      "akabayashi",
      "protect",
      "暗中关照",
      "赤林因过去的缘分保护杏里"
    ),
    rel("anri", "egor", "protect", "救助", "杏里救助受伤的叶戈尔"),
    rel("anri", "nasujima", "enemy", "威胁"),
    rel(
      "aoba",
      "izumii",
      "family",
      "兄弟 / 利用",
      "青叶把兄长推到蓝色平方台前"
    ),
    rel("aoba", "rocchi", "organization", "幕后指挥"),
    rel(
      "izumii",
      "kadota",
      "enemy",
      "旧日对立",
      "门田因反对蓝色平方的暴行而脱离"
    ),
    rel("kadota", "yumasaki", "friend", "小队同伴"),
    rel("kadota", "karisawa", "friend", "小队同伴"),
    rel("kadota", "togusa", "friend", "小队同伴"),
    rel("yumasaki", "karisawa", "friend", "御宅同好"),
    rel("togusa", "ruri", "intimate", "偶像崇拜", "渡草是琉璃的狂热粉丝"),
    rel("seiji", "mika", "intimate", "扭曲的恋爱关系"),
    rel("seiji", "namie", "family", "姐弟", "波江对诚二有强烈占有欲"),
    rel(
      "namie",
      "shingen",
      "organization",
      "研究合作",
      "共同参与塞尔提头颅研究"
    ),
    rel("namie", "yodogiri", "organization", "情报交易"),
    rel("shingen", "yodogiri", "organization", "非人研究网络"),
    rel("shingen", "emilia", "intimate", "夫妻"),
    rel("kasane", "haruna", "organization", "罪歌网络", "两人都能影响罪歌之子"),
    rel(
      "kasane",
      "yodogiri",
      "organization",
      "从属 / 合作",
      "鲸木曾以淀切阵内体系行动"
    ),
    rel("haruna", "shuji", "family", "父女"),
    rel("haruna", "nasujima", "intimate", "病态爱恋"),
    rel("simon", "denis", "organization", "露西寿司伙伴"),
    rel("simon", "shizuo", "friend", "能阻止静雄的朋友"),
    rel("simon", "vorona", "friend", "俄罗斯同乡"),
    rel("simon", "egor", "friend", "旧识"),
    rel("vorona", "sloan", "friend", "雇佣兵搭档"),
    rel("vorona", "tom", "organization", "受雇讨债"),
    rel("vorona", "egor", "enemy", "任务冲突"),
    rel("kasuka", "ruri", "intimate", "恋人"),
    rel("kasuka", "yuiga", "family", "饲主与爱猫"),
    rel("ruri", "yuiga", "family", "共同生活"),
    rel("anri", "yuiga", "protect", "临时照看"),
    rel("kasuka", "max", "organization", "演艺合作"),
    rel("ruri", "max", "organization", "演艺合作"),
    rel("ruri", "adabashi", "enemy", "跟踪与伤害"),
    rel("akane", "shiki", "family", "组织监护"),
    rel("akane", "akabayashi", "family", "组织监护"),
    rel("shiki", "akabayashi", "organization", "粟楠会同僚"),
    rel("shiki", "aozaki", "organization", "粟楠会同僚"),
    rel("akabayashi", "aozaki", "friend", "竞争中的同僚"),
    rel("mairu", "kururi", "family", "双胞胎姐妹"),
    rel("mairu", "anri", "friend", "仰慕 / 朋友"),
    rel("kururi", "anri", "friend", "朋友"),
    rel("mikage", "vorona", "enemy", "强者之间的交手"),
    rel(
      "manami",
      "izaya",
      "enemy",
      "受害与复仇",
      "爱海曾受临也诱导，获救后长期追查并试图向他复仇"
    ),
  ];

  const localized = (zh, ja) => ({ zh, ja });
  const makeVolumes = ({
    id,
    category,
    title,
    count,
    year,
    description,
    details,
    image = "",
    link = "",
  }) =>
    Array.from({ length: count }, (_, index) => {
      const volume = index + 1;
      return {
        id: `${id}-${volume}`,
        series: id,
        volume,
        category,
        year,
        title: localized(
          `${title.zh} 第${volume}卷`,
          `${title.ja} 第${volume}巻`
        ),
        meta: localized(`单行本第${volume}卷`, `単行本 第${volume}巻`),
        description,
        details,
        image: volume === 1 ? image : "",
        link,
        accent: "#f4f500",
      };
    });

  const works = [
    {
      id: "tv-1",
      category: "tv",
      year: "2010",
      title: localized("无头骑士异闻录", "デュラララ!!"),
      meta: localized("TV 第1期 · 全24话", "TV第1期・全24話"),
      description: localized(
        "从帝人来到池袋开始，串联 DOLLARS、罪歌与黄巾贼三大篇章。",
        "帝人の池袋到着から、ダラーズ、罪歌、黄巾賊の物語を描く。"
      ),
      details: {
        zh: ["首播：2010年1月—6月", "制作：Brain's Base", "导演：大森贵弘"],
        ja: ["放送：2010年1月～6月", "制作：Brain's Base", "監督：大森貴弘"],
      },
      image: "https://www.durarara.com/img/top/KV.jpg",
      link: "https://www.durarara.com/",
      accent: "#f4f500",
    },
    ...["承", "转", "结"].map((part, index) => ({
      id: `tv-x2-${index + 1}`,
      category: "tv",
      year: index === 0 ? "2015" : index === 1 ? "2015" : "2016",
      title: localized(
        `无头骑士异闻录×2 ${part}`,
        `デュラララ!!×2 ${["承", "転", "結"][index]}`
      ),
      meta: localized(
        `TV 第2期第${index + 1}部 · 全12话`,
        `TV第2期 第${index + 1}クール・全12話`
      ),
      description: localized(
        "池袋各方势力与人物关系继续扩张，并逐步进入最终抗争。",
        "池袋の勢力と人物関係が広がり、物語は最終局面へ進む。"
      ),
      details: {
        zh: ["制作：朱夏", "导演：大森贵弘", "系列构成：高木登"],
        ja: ["制作：朱夏", "監督：大森貴弘", "シリーズ構成：高木登"],
      },
      image: "https://www.durarara.com/img/top/KV.jpg",
      link: "https://www.durarara.com/",
      accent: "#f4f500",
    })),
    ...[
      ["ova-12-5", "2010", "第12.5话《天网恢恢》", "第12.5話「天網恢恢」"],
      ["ova-25", "2011", "第25话《天下泰平》", "第25話「天下泰平」"],
      ["ova-4-5", "2015", "第4.5话《我的心是火锅的形状》", "第4.5話「私の心は鍋模様」"],
      ["ova-13-5", "2015", "第13.5话《恋爱故事铿锵作响》", "第13.5話「お惚気チャカポコ」"],
      ["ova-19-5", "2016", "第19.5话《Dufufufu!!》", "第19.5話「デュフフフ!!」"],
    ].map(([id, year, zh, ja]) => ({
      id,
      category: "ova",
      year,
      title: localized(zh, ja),
      meta: localized("OVA / 特别篇", "OVA / 特別編"),
      description: localized(
        "补充本篇间隙中池袋人物的日常、关系与城市骚动。",
        "本編の幕間にある人物の日常、関係、池袋の騒動を描く。"
      ),
      details: { zh: [`话数：${zh.split("《")[0]}`], ja: [`話数：${ja.split("「")[0]}`] },
      image: id.startsWith("ova-1") && id !== "ova-19-5"
        ? "https://www.durarara.com/img/top/bnr_ova.jpg"
        : "https://www.durarara.com/img/ova03/about/img.jpg",
      link: "https://www.durarara.com/ova/",
      accent: "#f4f500",
    })),
    {
      id: "music-ost",
      category: "music",
      year: "2010–2016",
      title: localized("动画原声音乐", "アニメーション・サウンドトラック"),
      meta: localized("作曲：吉森信", "音楽：吉森信"),
      description: localized(
        "以爵士、放克与都市感配乐构成池袋独特的声音景观。",
        "ジャズ、ファンク、都会的な劇伴が池袋の音風景を作る。"
      ),
      details: { zh: ["作曲：吉森信"], ja: ["音楽：吉森信"] },
      image: "https://www.durarara.com/img/music/ost/jk.jpg",
      link: "https://www.durarara.com/music/ost.html",
      accent: "#f4f500",
    },
    {
      id: "music-best",
      category: "music",
      year: "2016",
      title: localized(
        "The Greatest Hits ～Sweet Strange Memories",
        "The Greatest Hits ～Sweet Strange Memories"
      ),
      meta: localized("BGM 精选集", "BGMベストセレクション"),
      description: localized(
        "从动画两期中选出的吉森信配乐合集。",
        "アニメシリーズを彩った吉森信のBGMベスト盤。"
      ),
      details: { zh: ["发行：2016年6月8日"], ja: ["発売：2016年6月8日"] },
      image: "https://www.durarara.com/img/music/comp/jk.jpg",
      link: "https://www.durarara.com/",
      accent: "#f4f500",
    },
    ...makeVolumes({
      id: "novels-main",
      category: "novels",
      title: localized("无头骑士异闻录 本传", "デュラララ!! 本編"),
      count: 13,
      year: "2004–2014",
      description: localized(
        "成田良悟创作、安田典生插画的电击文库轻小说本传。",
        "成田良悟著、ヤスダスズヒト画による電撃文庫の本編。"
      ),
      details: { zh: ["作者：成田良悟", "插画：安田典生"], ja: ["著者：成田良悟", "イラスト：ヤスダスズヒト"] },
      image: "https://cdn.kdkw.jp/cover_1000/312133/312133900000.webp",
      link: "https://dengekibunko.jp/product/drrr/",
    }),
    ...makeVolumes({
      id: "novels-sh",
      category: "novels",
      title: localized("无头骑士异闻录SH", "デュラララ!!SH"),
      count: 4,
      year: "2014–",
      description: localized(
        "本传约一年半后的池袋，新一代学生与熟悉人物再次相遇。",
        "本編から約一年半後、新世代の学生とおなじみの人物が交差する。"
      ),
      details: { zh: ["作者：成田良悟", "插画：安田典生"], ja: ["著者：成田良悟", "イラスト：ヤスダスズヒト"] },
      image: "https://cdn.kdkw.jp/cover_1000/312097/312097600000.webp",
      link: "https://dengekibunko.jp/product/drrr/",
    }),
    ...makeVolumes({
      id: "novels-gaiden",
      category: "novels",
      title: localized("无头骑士异闻录 外传!?", "デュラララ!! 外伝!?"),
      count: 1,
      year: "2015",
      description: localized(
        "收录发生在本传幕间的短篇，以池袋居民的日常与骚动为中心。",
        "本編の幕間にある池袋の住人たちの日常と騒動を収めた短編集。"
      ),
      details: { zh: ["作者：成田良悟", "插画：安田典生"], ja: ["著者：成田良悟", "イラスト：ヤスダスズヒト"] },
      image: "https://cdn.kdkw.jp/cover_1000/312032/312032400000.webp",
      link: "https://dengekibunko.jp/product/drrr/",
    }),
    ...makeVolumes({
      id: "novels-izaya",
      category: "novels",
      title: localized("折原临也系列", "折原臨也シリーズ"),
      count: 2,
      year: "2015–2016",
      description: localized(
        "描写折原临也离开池袋后的《与夕阳》和《与喝彩》。",
        "池袋を離れた折原臨也を描く『夕焼けを』『喝采を』。"
      ),
      details: { zh: ["作者：成田良悟", "插画：安田典生"], ja: ["著者：成田良悟", "イラスト：ヤスダスズヒト"] },
      image: "https://cdn.kdkw.jp/cover_1000/312032/312032500000.webp",
      link: "https://dengekibunko.jp/product/drrr/",
    }),
    ...makeVolumes({
      id: "manga-main",
      category: "manga",
      title: localized("无头骑士异闻录 漫画版", "デュラララ!! コミカライズ"),
      count: 4,
      year: "2009–2011",
      description: localized(
        "由茶鸟木明代作画的本篇漫画化系列。",
        "茶鳥木明代作画による本編コミカライズ。"
      ),
      details: { zh: ["原作：成田良悟", "作画：茶鸟木明代"], ja: ["原作：成田良悟", "作画：茶鳥木明代"] },
      link: "https://magazine.jp.square-enix.com/gfantasy/story/durarara/",
    }),
    ...makeVolumes({
      id: "manga-saika",
      category: "manga",
      title: localized("无头骑士异闻录 罪歌篇", "デュラララ!! 罪歌編"),
      count: 3,
      year: "2011–2013",
      description: localized("漫画版罪歌篇。", "コミカライズ版・罪歌編。"),
      details: { zh: ["原作：成田良悟"], ja: ["原作：成田良悟"] },
      link: "https://magazine.jp.square-enix.com/gfantasy/story/durarara/",
    }),
    ...makeVolumes({
      id: "manga-yellow",
      category: "manga",
      title: localized("无头骑士异闻录 黄巾贼篇", "デュラララ!! 黄巾賊編"),
      count: 3,
      year: "2013–2015",
      description: localized("漫画版黄巾贼篇。", "コミカライズ版・黄巾賊編。"),
      details: { zh: ["原作：成田良悟"], ja: ["原作：成田良悟"] },
      link: "https://magazine.jp.square-enix.com/gfantasy/story/durarara/",
    }),
    ...makeVolumes({
      id: "manga-redollars",
      category: "manga",
      title: localized("无头骑士异闻录 RE;DOLLARS篇", "デュラララ!! RE;ダラーズ編"),
      count: 8,
      year: "2015–2022",
      description: localized("漫画版 RE;DOLLARS 篇。", "コミカライズ版・RE;ダラーズ編。"),
      details: { zh: ["原作：成田良悟"], ja: ["原作：成田良悟"] },
      link: "https://magazine.jp.square-enix.com/gfantasy/story/durarara/",
    }),
    ...[
      ["game-3way", "2010", "无头骑士异闻录 3way standoff", "デュラララ!! 3way standoff", "PSP"],
      ["game-alley", "2011", "无头骑士异闻录 3way standoff -alley-", "デュラララ!! 3way standoff -alley-", "PSP"],
      ["game-relay", "2015", "无头骑士异闻录 Relay", "デュラララ!! Relay", "PlayStation Vita"],
    ].map(([id, year, zh, ja, platform]) => ({
      id,
      category: "games",
      year,
      title: localized(zh, ja),
      meta: localized(`平台：${platform}`, `対応機種：${platform}`),
      description: localized(
        "以池袋群像与多路线选择为核心的系列游戏作品。",
        "池袋の群像と複数ルートの選択を軸にしたゲーム作品。"
      ),
      details: { zh: [`平台：${platform}`], ja: [`対応機種：${platform}`] },
      image: "",
      link: "",
      accent: "#f4f500",
    })),
  ];

  const factionBackgrounds = {
    core: "https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/other/iShot_2026-06-13_01.23.46.jpg",
    dollars: "https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/other/iShot_2026-06-13_01.25.18.jpg",
    yellow: "https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/other/01%20(3).jpg",
    blue: "https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/other/01%20(2)%20(1).jpg",
    awakening: "https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/other/05%20(1).jpg",
    awakusu: "https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/other/05%20(2)%20(1).jpg",
    russia: "https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/other/iShot_2026-06-13_01.21.42.jpg",
    yagiri: "https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/other/02%20(1).jpg",
    media: "https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/other/01%20(1)%20(1).jpg",
    independent: "https://agzhrzaeerclitlfnhhz.supabase.co/storage/v1/object/public/assets/otherWebsites/drrr/other/03%20(1).jpg",
  };

  const resourceImages = {
    avatars: [
      ["01_Sturluson.png", "塞尔提·史特路尔森", "セルティ・ストゥルルソン"],
      ["02_Ryugamine.png", "龙之峰帝人", "竜ヶ峰 帝人"],
      ["03_Kida.png", "纪田正臣", "紀田 正臣"],
      ["04_Sonohara.png", "园原杏里", "園原 杏里"],
      ["05_Orihara.png", "折原临也", "折原 臨也"],
      ["06_Heiwajima.png", "平和岛静雄", "平和島 静雄"],
      ["07_Kishitani.png", "岸谷新罗", "岸谷 新羅"],
      ["08_Kadota.png", "门田京平", "門田 京平"],
      ["09_Yumasaki-.png", "游马崎沃克", "遊馬崎 ウォーカー"],
      ["10_Karisawa-.png", "狩泽绘理华", "狩沢 絵理華"],
      ["11_Togusa.png", "渡草三郎", "渡草 三郎"],
      ["12_Kuronuma.png", "黑沼青叶", "黒沼 青葉"],
    ].map(([file, zh, ja]) => ({
      src: `https://www.durarara.com/img/chara/chara_img/${file}`,
      title: localized(zh, ja),
      source: "TV Anime official",
    })),
    avatars2: [],
    dvd: [
      ["02", "《承》Blu-ray / DVD 第2卷"],
      ["03", "《承》Blu-ray / DVD 第3卷"],
      ["04", "《承》Blu-ray / DVD 第4卷"],
      ["05", "《承》Blu-ray / DVD 第5卷"],
      ["06", "《承》Blu-ray / DVD 第6卷"],
    ].map(([number, title]) => ({
      src: `https://www.durarara.com/img/bluray/01_sho/package${number}.jpg`,
      title: localized(title, `『承』Blu-ray / DVD 第${Number(number)}巻`),
      source: "TV Anime official",
    })).concat({
      src: "https://www.durarara.com/1st/dvd/img/dvd01.jpg",
      title: localized("第1期 DVD 第1卷", "第1期 DVD 第1巻"),
      source: "TV Anime official",
    }),
    music: [
      {
        src: "https://www.durarara.com/img/music/ost/jk.jpg",
        title: localized("动画原声音乐集", "オリジナル・サウンドトラック"),
        source: "TV Anime official",
      },
      {
        src: "https://www.durarara.com/img/music/comp/jk.jpg",
        title: localized("The Greatest Hits", "The Greatest Hits"),
        source: "TV Anime official",
      },
    ],
    mangaCovers: [],
    novelCovers: [],
  };

  const resourceLinks = {
    video: [
      {
        title: localized("哔哩哔哩番剧检索", "bilibili 配信検索"),
        description: localized(
          "在哔哩哔哩检索《无头骑士异闻录》正版番剧页面。",
          "bilibiliで『デュラララ!!』の配信ページを検索します。"
        ),
        href: "https://search.bilibili.com/bangumi?keyword=%E6%97%A0%E5%A4%B4%E9%AA%91%E5%A3%AB%E5%BC%82%E9%97%BB%E5%BD%95",
      },
      {
        title: localized("爱奇艺番剧检索", "iQIYI 配信検索"),
        description: localized(
          "在爱奇艺检索《无头骑士异闻录》可用番剧内容。",
          "iQIYIで視聴可能な関連コンテンツを検索します。"
        ),
        href: "https://so.iqiyi.com/so/q_%E6%97%A0%E5%A4%B4%E9%AA%91%E5%A3%AB%E5%BC%82%E9%97%BB%E5%BD%95",
      },
    ],
    audio: [
      {
        title: localized("动画官网 Radio", "アニメ公式 Radio"),
        description: localized("动画官网保存的广播节目与相关信息。", "アニメ公式サイトのラジオ番組・関連情報です。"),
        href: "https://www.durarara.com/radio/",
      },
      {
        title: localized("动画官网 OST", "アニメ公式 OST"),
        description: localized("吉森信创作的动画原声专辑资料。", "吉森信によるアニメ劇伴アルバムの公式情報です。"),
        href: "https://www.durarara.com/music/ost.html",
      },
    ],
    text: [
      {
        title: localized("BOOK☆WALKER 日本站", "BOOK☆WALKER"),
        description: localized("检索原作本传、SH 与相关电子书。", "原作本編、SH、関連電子書を検索します。"),
        href: "https://bookwalker.jp/search/?word=%E3%83%87%E3%83%A5%E3%83%A9%E3%83%A9",
      },
      {
        title: localized("Kindle 日本站", "Kindle ストア"),
        description: localized("在 Amazon 日本 Kindle 商店检索系列电子书。", "Amazon.co.jp Kindleストアでシリーズを検索します。"),
        href: "https://www.amazon.co.jp/s?k=%E3%83%87%E3%83%A5%E3%83%A9%E3%83%A9&rh=n%3A2250738051",
      },
    ],
  };

  return {
    factions,
    relationTypes,
    characters,
    relations,
    works,
    factionBackgrounds,
    resourceImages,
    resourceLinks,
  };
})();

export default IKEBUKURO_DATA;
