const rel = (source, target, type, label, note = "") => ({
  source,
  target,
  type,
  label,
  note,
});

export const relations = [
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
