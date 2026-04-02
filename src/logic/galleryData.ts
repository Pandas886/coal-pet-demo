export const COAL_MAIN = "#1c1815";  
export const COAL_DARK = "#0a0705";  
export const COAL_LITE = "#2c2521";  

export const P_WHITE = "#f9f6f0";    
export const P_BLACK = "#000000";    
export const P_RED   = "#e04c38";    
export const P_YEL   = "#f2ab3e";    
export const P_GRN   = "#62c454";    
export const P_BLU   = "#56a8f5";    
export const P_GREY  = "#8c8784";
export const P_GOLD  = "#ffd700";
export const P_SILV  = "#d1d5da";
export const P_BLUE_D= "#0366d6";

export interface GalleryItem {
  id: string;
  name: string;
  svg: string;
}

export const bases: GalleryItem[] = [
  {
    id: "coal_round", name: "圆润标体",
    svg: `
      <rect x="11" y="10" width="10" height="12" fill="${COAL_DARK}" />
      <rect x="9" y="12" width="14" height="8" fill="${COAL_DARK}" />
      <rect x="10" y="11" width="1" height="1" fill="${COAL_DARK}" />
      <rect x="21" y="11" width="1" height="1" fill="${COAL_DARK}" />
      <rect x="10" y="20" width="1" height="1" fill="${COAL_DARK}" />
      <rect x="21" y="20" width="1" height="1" fill="${COAL_DARK}" />
      <rect x="12" y="11" width="8" height="10" fill="${COAL_MAIN}" />
      <rect x="10" y="13" width="12" height="6" fill="${COAL_MAIN}" />
      <rect x="11" y="12" width="3" height="2" fill="${COAL_LITE}" />
      <rect x="12" y="14" width="1" height="1" fill="${COAL_LITE}" />
      <rect x="13" y="22" width="1" height="2" fill="${COAL_MAIN}" />
      <rect x="18" y="22" width="1" height="2" fill="${COAL_MAIN}" />
      <rect x="8" y="15" width="2" height="1" fill="${COAL_MAIN}" />
      <rect x="22" y="16" width="2" height="1" fill="${COAL_MAIN}" />
    `
  },
  {
    id: "coal_flat", name: "卧地煤渣",
    svg: `
      <rect x="8" y="15" width="16" height="7" fill="${COAL_DARK}" />
      <rect x="10" y="14" width="12" height="1" fill="${COAL_DARK}" />
      <rect x="9" y="16" width="14" height="5" fill="${COAL_MAIN}" />
      <rect x="11" y="15" width="10" height="1" fill="${COAL_MAIN}" />
      <rect x="11" y="16" width="3" height="1" fill="${COAL_LITE}" />
      <rect x="6" y="21" width="1" height="1" fill="${COAL_DARK}" />
      <rect x="25" y="21" width="2" height="1" fill="${COAL_MAIN}" />
    `
  },
  {
    id: "coal_spiky", name: "狂躁刺头",
    svg: `
      <rect x="10" y="11" width="12" height="10" fill="${COAL_MAIN}" />
      <rect x="12" y="9" width="8" height="14" fill="${COAL_MAIN}" />
      <rect x="9" y="12" width="1" height="1" fill="${COAL_DARK}" />
      <rect x="8" y="15" width="2" height="1" fill="${COAL_DARK}" />
      <rect x="9" y="18" width="1" height="2" fill="${COAL_DARK}" />
      <rect x="22" y="11" width="2" height="1" fill="${COAL_DARK}" />
      <rect x="22" y="16" width="1" height="1" fill="${COAL_DARK}" />
      <rect x="21" y="18" width="2" height="1" fill="${COAL_DARK}" />
      <rect x="11" y="8" width="1" height="2" fill="${COAL_DARK}" />
      <rect x="15" y="7" width="1" height="2" fill="${COAL_DARK}" />
      <rect x="19" y="8" width="2" height="1" fill="${COAL_DARK}" />
      <rect x="11" y="22" width="1" height="1" fill="${COAL_DARK}" />
      <rect x="16" y="23" width="2" height="1" fill="${COAL_DARK}" />
      <rect x="19" y="22" width="1" height="1" fill="${COAL_DARK}" />
      <rect x="12" y="11" width="4" height="2" fill="${COAL_LITE}" />
      <rect x="13" y="13" width="2" height="1" fill="${COAL_LITE}" />
    `
  },
  {
    id: "coal_cube", name: "死板块砖",
    svg: `
      <rect x="10" y="11" width="12" height="11" fill="${COAL_DARK}" />
      <rect x="11" y="12" width="10" height="9" fill="${COAL_MAIN}" />
      <rect x="11" y="12" width="3" height="9" fill="${COAL_LITE}" />
      <rect x="14" y="12" width="6" height="1" fill="${COAL_LITE}" />
      <rect x="23" y="19" width="1" height="1" fill="${COAL_MAIN}" />
      <rect x="24" y="21" width="1" height="1" fill="${COAL_DARK}" />
      <rect x="12" y="22" width="2" height="1" fill="${COAL_DARK}" />
      <rect x="18" y="22" width="2" height="1" fill="${COAL_DARK}" />
    `
  },
  {
    id: "coal_broken", name: "缺角老煤",
    svg: `
      <rect x="9" y="13" width="14" height="9" fill="${COAL_MAIN}" />
      <rect x="11" y="11" width="6" height="2" fill="${COAL_MAIN}" />
      <rect x="17" y="11" width="1" height="2" fill="${COAL_DARK}" />
      <rect x="18" y="12" width="1" height="1" fill="${COAL_DARK}" />
      <rect x="19" y="13" width="2" height="2" fill="${COAL_DARK}" />
      
      <rect x="11" y="11" width="4" height="1" fill="${COAL_LITE}" />
      <rect x="9" y="13" width="3" height="2" fill="${COAL_LITE}" />
      <rect x="12" y="22" width="2" height="2" fill="${COAL_DARK}" />
      <rect x="18" y="22" width="2" height="2" fill="${COAL_DARK}" />
    `
  },
  {
    id: "coal_tall", name: "高瘦焦炭",
    svg: `
      <rect x="12" y="8" width="8" height="14" fill="${COAL_DARK}" />
      <rect x="13" y="9" width="6" height="12" fill="${COAL_MAIN}" />
      <rect x="13" y="9" width="2" height="12" fill="${COAL_LITE}" />
      <rect x="11" y="10" width="1" height="2" fill="${COAL_DARK}" />
      <rect x="20" y="14" width="1" height="3" fill="${COAL_MAIN}" />
      <rect x="14" y="22" width="1" height="2" fill="${COAL_MAIN}" />
      <rect x="17" y="22" width="1" height="2" fill="${COAL_MAIN}" />
      <rect x="9" y="16" width="3" height="1" fill="${COAL_MAIN}" />
      <rect x="20" y="17" width="3" height="1" fill="${COAL_MAIN}" />
    `
  },
  {
    id: "coal_comet", name: "彗星残渣",
    svg: `
      <rect x="11" y="12" width="12" height="7" fill="${COAL_DARK}" />
      <rect x="12" y="13" width="10" height="5" fill="${COAL_MAIN}" />
      <rect x="13" y="14" width="3" height="2" fill="${COAL_LITE}" />
      <rect x="7" y="14" width="2" height="1" fill="${COAL_DARK}" />
      <rect x="4" y="15" width="2" height="1" fill="${COAL_DARK}" />
      <rect x="9" y="15" width="2" height="2" fill="${COAL_MAIN}" />
      <rect x="8" y="17" width="2" height="1" fill="${COAL_DARK}" />
    `
  }
];

export const faces: GalleryItem[] = [
  {
    id: "face_big", name: "标大眼",
    svg: `
      <rect x="12" y="14" width="2" height="2" fill="${P_WHITE}" />
      <rect x="13" y="14" width="1" height="1" fill="${P_BLACK}" />
      <rect x="18" y="14" width="2" height="2" fill="${P_WHITE}" />
      <rect x="18" y="14" width="1" height="1" fill="${P_BLACK}" />
    `
  },
  {
    id: "face_dot", name: "圆豆眼",
    svg: `
      <rect x="13" y="15" width="1" height="1" fill="${P_WHITE}" />
      <rect x="18" y="15" width="1" height="1" fill="${P_WHITE}" />
    `
  },
  {
    id: "face_mad", name: "凌厉眉",
    svg: `
      <rect x="12" y="15" width="2" height="1" fill="${P_WHITE}" />
      <rect x="18" y="15" width="2" height="1" fill="${P_WHITE}" />
      <rect x="12" y="14" width="1" height="1" fill="${COAL_DARK}" />
      <rect x="19" y="14" width="1" height="1" fill="${COAL_DARK}" />
    `
  },
  {
    id: "face_derp", name: "斗鸡眼",
    svg: `
      <rect x="13" y="14" width="2" height="2" fill="${P_WHITE}" />
      <rect x="14" y="15" width="1" height="1" fill="${P_BLACK}" />
      <rect x="16" y="14" width="2" height="2" fill="${P_WHITE}" />
      <rect x="16" y="15" width="1" height="1" fill="${P_BLACK}" />
    `
  },
  {
    id: "face_sleep", name: "卧蚕线",
    svg: `
      <rect x="12" y="16" width="2" height="1" fill="${P_WHITE}" />
      <rect x="18" y="16" width="2" height="1" fill="${P_WHITE}" />
    `
  },
  {
    id: "face_shock", name: "惊异瞳",
    svg: `
      <rect x="11" y="13" width="3" height="3" fill="${P_WHITE}" />
      <rect x="12" y="14" width="1" height="1" fill="${P_BLACK}" />
      <rect x="18" y="14" width="2" height="2" fill="${P_WHITE}" />
      <rect x="18" y="15" width="1" height="1" fill="${P_BLACK}" />
    `
  },
  {
    id: "face_fire", name: "炽焰眼",
    svg: `
      <rect x="12" y="14" width="2" height="2" fill="${P_YEL}" />
      <rect x="18" y="14" width="2" height="2" fill="${P_YEL}" />
      <rect x="13" y="14" width="1" height="1" fill="${P_RED}" />
      <rect x="18" y="14" width="1" height="1" fill="${P_RED}" />
    `
  }
];

export const props: GalleryItem[] = [
  {
    id: "prop_dust", name: "煤灰漂浮",
    svg: `
      <rect x="7" y="9" width="1" height="1" fill="${P_GREY}" />
      <rect x="8" y="8" width="1" height="1" fill="${COAL_MAIN}" />
      <rect x="23" y="14" width="1" height="1" fill="${P_GREY}" />
      <rect x="25" y="12" width="1" height="1" fill="${COAL_MAIN}" />
      <rect x="9" y="20" width="1" height="1" fill="${P_GREY}" />
    `
  },
  {
    id: "prop_fire", name: "头顶火苗",
    svg: `
      <rect x="14" y="5" width="4" height="4" fill="${P_YEL}" />
      <rect x="15" y="3" width="2" height="2" fill="${P_YEL}" />
      <rect x="15" y="6" width="2" height="3" fill="${P_RED}" />
    `
  },
  {
    id: "prop_sprout", name: "头顶抽芽",
    svg: `
      <rect x="15" y="8" width="1" height="3" fill="${COAL_DARK}" />
      <rect x="16" y="7" width="2" height="1" fill="${P_GRN}" />
      <rect x="17" y="6" width="1" height="1" fill="${P_GRN}" />
    `
  },
  {
    id: "prop_sweat", name: "打工汗滴",
    svg: `
      <rect x="22" y="11" width="1" height="2" fill="${P_BLU}" />
      <rect x="21" y="13" width="3" height="1" fill="${P_BLU}" />
      <rect x="22" y="14" width="1" height="1" fill="${P_BLU}" />
    `
  },
  {
    id: "prop_gold", name: "顶配金矿",
    svg: `
      <rect x="14" y="7" width="5" height="4" fill="${P_GOLD}" />
      <rect x="13" y="9" width="7" height="2" fill="${P_GOLD}" />
      <rect x="15" y="8" width="1" height="2" fill="${P_WHITE}" />
      <rect x="18" y="8" width="1" height="1" fill="${P_WHITE}" />
    `
  },
  {
    id: "prop_crown", name: "像素王冠",
    svg: `
      <rect x="12" y="8" width="9" height="3" fill="${P_YEL}" />
      <rect x="12" y="7" width="1" height="1" fill="${P_YEL}" />
      <rect x="16" y="7" width="1" height="1" fill="${P_YEL}" />
      <rect x="20" y="7" width="1" height="1" fill="${P_YEL}" />
      <rect x="14" y="9" width="1" height="1" fill="${P_RED}" />
      <rect x="18" y="9" width="1" height="1" fill="${P_BLU}" />
    `
  },
  {
    id: "prop_glasses", name: "老框墨镜",
    svg: `
      <rect x="10" y="13" width="12" height="1" fill="${P_BLACK}" />
      <rect x="11" y="13" width="4" height="4" fill="${P_BLACK}" />
      <rect x="17" y="13" width="4" height="4" fill="${P_BLACK}" />
      <rect x="12" y="14" width="2" height="1" fill="${P_WHITE}" />
      <rect x="18" y="14" width="2" height="1" fill="${P_WHITE}" />
    `
  },
  {
    id: "prop_headphone", name: "巨大耳机",
    svg: `
      <rect x="11" y="7" width="10" height="2" fill="${P_SILV}" />
      <rect x="9" y="8" width="2" height="3" fill="${P_SILV}" />
      <rect x="21" y="8" width="2" height="3" fill="${P_SILV}" />
      <rect x="7" y="10" width="4" height="6" fill="${P_BLUE_D}" />
      <rect x="21" y="10" width="4" height="6" fill="${P_BLUE_D}" />
    `
  },
  {
    id: "prop_terminal", name: "手持终端",
    svg: `
      <rect x="10" y="20" width="12" height="5" fill="#24292e" />
      <rect x="11" y="21" width="2" height="1" fill="#ea4a5a" />
      <rect x="11" y="23" width="6" height="1" fill="${P_GRN}" />
      <rect x="18" y="23" width="3" height="1" fill="${P_BLU}" />
    `
  },
  { id: "prop_none", name: "原生全裸", svg: `` }
];

export function seedRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
