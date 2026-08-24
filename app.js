
const STORAGE_KEY = "familySkyCalendarV01";

const STAMP_MASTER = [{"id": "music", "name": "音符", "category": "音楽", "image": "assets/stamps/music_note.png"}, {"id": "treble", "name": "ト音記号", "category": "音楽", "image": "assets/stamps/treble_cref.png"}, {"id": "horn", "name": "ホルン", "category": "音楽", "image": "assets/stamps/horn.png"}, {"id": "violin", "name": "バイオリン", "category": "音楽", "image": "assets/stamps/violin.png"}, {"id": "musicstand", "name": "譜面台", "category": "音楽", "image": "assets/stamps/music_stand.png"}, {"id": "microphone", "name": "マイク", "category": "音楽", "image": "assets/stamps/microphone.png"}, {"id": "book", "name": "本", "category": "音楽", "image": "assets/stamps/book.png"}, {"id": "stethoscope", "name": "聴診器", "category": "医療", "image": "assets/stamps/stethoscope.png"}, {"id": "syringe", "name": "注射", "category": "医療", "image": "assets/stamps/syringe.png"}, {"id": "medical_box", "name": "救急箱", "category": "医療", "image": "assets/stamps/medical_bag.png"}, {"id": "nurse", "name": "ナース", "category": "医療", "image": "assets/stamps/nurse_cap.png"}, {"id": "hospital", "name": "病院", "category": "医療", "image": "assets/stamps/hospital.png"}, {"id": "onigiri", "name": "おにぎり", "category": "食事", "image": "assets/stamps/onigiri.png"}, {"id": "bento", "name": "お弁当", "category": "食事", "image": "assets/stamps/bento.png"}, {"id": "cutlery", "name": "外食", "category": "食事", "image": "assets/stamps/cutlery.png"}, {"id": "coffee", "name": "カフェ", "category": "食事", "image": "assets/stamps/coffee.png"}, {"id": "tapioca", "name": "ドリンク", "category": "食事", "image": "assets/stamps/bubble_tea.png"}, {"id": "beer", "name": "飲み会", "category": "食事", "image": "assets/stamps/beer.png"}, {"id": "cake", "name": "ケーキ", "category": "おやつ", "image": "assets/stamps/cake_slice.png"}, {"id": "donut", "name": "ドーナツ", "category": "おやつ", "image": "assets/stamps/donut.png"}, {"id": "popcorn", "name": "映画", "category": "おやつ", "image": "assets/stamps/popcorn.png"}, {"id": "icecream", "name": "アイス", "category": "おやつ", "image": "assets/stamps/icecream.png"}, {"id": "candy", "name": "キャンディ", "category": "おやつ", "image": "assets/stamps/candy.png"}, {"id": "lollipop", "name": "ロリポップ", "category": "おやつ", "image": "assets/stamps/lollipop.png"}, {"id": "cupcake", "name": "カップケーキ", "category": "おやつ", "image": "assets/stamps/cupcake.png"}, {"id": "macaron", "name": "マカロン", "category": "おやつ", "image": "assets/stamps/macaron.png"}, {"id": "choco_strawberry", "name": "いちごチョコ", "category": "おやつ", "image": "assets/stamps/choco_strawberry.png"}, {"id": "pudding", "name": "プリン", "category": "おやつ", "image": "assets/stamps/pudding.png"}, {"id": "watermelon", "name": "スイカ", "category": "おやつ", "image": "assets/stamps/watermelon.png"}, {"id": "car", "name": "車", "category": "移動", "image": "assets/stamps/car.png"}, {"id": "train", "name": "電車", "category": "移動", "image": "assets/stamps/train.png"}, {"id": "airplane", "name": "飛行機", "category": "移動", "image": "assets/stamps/airplane.png"}, {"id": "suitcase", "name": "旅行", "category": "移動", "image": "assets/stamps/suitcase.png"}, {"id": "house", "name": "家", "category": "生活", "image": "assets/stamps/house.png"}, {"id": "bed", "name": "お泊まり", "category": "生活", "image": "assets/stamps/bed.png"}, {"id": "pencil", "name": "鉛筆", "category": "生活", "image": "assets/stamps/pencil.png"}, {"id": "camera", "name": "カメラ", "category": "生活", "image": "assets/stamps/camera.png"}, {"id": "moneybag", "name": "給料日", "category": "生活", "image": "assets/stamps/moneybag.png"}, {"id": "rainbow", "name": "虹", "category": "イベント", "image": "assets/stamps/rainbow.png"}, {"id": "heart", "name": "ハート", "category": "イベント", "image": "assets/stamps/heart.png"}, {"id": "star", "name": "星", "category": "イベント", "image": "assets/stamps/star.png"}, {"id": "gift", "name": "プレゼント", "category": "イベント", "image": "assets/stamps/gift.png"}, {"id": "balloons", "name": "風船", "category": "イベント", "image": "assets/stamps/balloons.png"}, {"id": "birthday_cake", "name": "誕生日", "category": "イベント", "image": "assets/stamps/birthday_cake.png"}, {"id": "sakura", "name": "桜", "category": "イベント", "image": "assets/stamps/sakura.png"}]
const STAMP_BY_ID = Object.fromEntries(STAMP_MASTER.map(s=>[s.id,s]));
const LEGACY_STAMP_MAP={"♪":"music","★":"star","♥":"heart","●":"star"};
const MAX_STAMPS=3;


const seed = {
  members: [
    {id:"chiaki", name:"ちあき", color:"#f4a8c6", living:"home", dinner:true, lunch:false},
    {id:"sora", name:"そら", color:"#f4cf72", living:"away", dinner:false, lunch:false},
    {id:"ao", name:"あお", color:"#9ed8b5", living:"home", dinner:true, lunch:true},
    {id:"towa", name:"とわ", color:"#91ccef", living:"home", dinner:true, lunch:true}
  ],
  groups: [
    {id:"schoolclub", name:"学校の部活", color:"#91ccef", members:["towa"]},
    {id:"junior", name:"ジュニオケ", color:"#f0a9c0", members:["towa"]},
    {id:"youth", name:"ユースオケ", color:"#b7a3ea", members:["ao","towa"]}
  ],
  events: [],
  life: {}
};

let state = loadState();
let cursor = startOfMonth(new Date());
let selectedFilter = "all";
let selectedDate = dateKey(new Date());
let dinnerChoice = "unknown";
let lunchChoice = "unknown";
let bulkSelected = new Set();
let editingEventId = null;
let editingMemberId = null;
let timelineDate = dateKey(new Date());
let lifeExpanded = false;
let selectedStampIds=[];
let activeStampCategory="すべて";

const DEFAULT_SHIFT_PRESETS = {
  day:{title:"日勤",start:"08:30",end:"17:15"},
  half:{title:"半日",start:"08:30",end:"12:30"},
  late:{title:"遅番",start:"10:30",end:"19:00"}
};
function shiftPresets(){
  state.settings ??= {};
  state.settings.shiftPresets ??= structuredClone(DEFAULT_SHIFT_PRESETS);
  return state.settings.shiftPresets;
}

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return structuredClone(seed);
    const parsed = JSON.parse(raw);
    return {...structuredClone(seed), ...parsed};
  }catch(e){ return structuredClone(seed); }
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function dateKey(d){
  const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,"0"), day=String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}
function parseKey(k){ const [y,m,d]=k.split("-").map(Number); return new Date(y,m-1,d); }
function startOfMonth(d){ return new Date(d.getFullYear(), d.getMonth(), 1); }
function addMonths(d,n){ return new Date(d.getFullYear(), d.getMonth()+n, 1); }
function memberById(id){ return state.members.find(m=>m.id===id); }
function groupById(id){ return state.groups.find(g=>g.id===id); }

function monthTitle(e){
  const raw=e.title||e.category||"";
  const aliases={
    "ユースオケ":"ユース",
    "ユースオーケストラ":"ユース",
    "ジュニオケ":"ジュニ",
    "ジュニアオーケストラ":"ジュニ",
    "学校の部活":"部活"
  };
  return aliases[raw]||raw;
}
function esc(s=""){ return String(s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c])); }
function mix(hex, amount=0.78){
  const c=hex.replace("#","");
  const n=parseInt(c,16), r=(n>>16)&255,g=(n>>8)&255,b=n&255;
  const mixc=x=>Math.round(x+(255-x)*amount);
  return `rgb(${mixc(r)},${mixc(g)},${mixc(b)})`;
}
function isSameDay(a,b){ return dateKey(a)===dateKey(b); }

function timeOptions(){
  const values=[""];
  for(let h=6;h<=24;h++){
    for(const min of [0,15,30,45]){
      if(h===24 && min>0) continue;
      values.push(`${String(h).padStart(2,"0")}:${String(min).padStart(2,"0")}`);
    }
  }
  return values;
}
function populateTimeSelect(id){
  const el=document.getElementById(id);
  if(!el) return;
  el.innerHTML=timeOptions().map(t=>`<option value="${t}">${t||"—"}</option>`).join("");
}
function migrateEventTimes(){
  state.events.forEach(e=>{
    if(!Array.isArray(e.stampIds)){
      const legacy=e.stamp && LEGACY_STAMP_MAP[e.stamp] ? [LEGACY_STAMP_MAP[e.stamp]] : [];
      e.stampIds=legacy;
    }
    if((!e.startTime && !e.endTime) && e.time){
      const m=String(e.time).match(/(\d{1,2}:\d{2})\s*[-–〜~]\s*(\d{1,2}:\d{2})/);
      if(m){
        e.startTime=m[1].padStart(5,"0");
        e.endTime=m[2].padStart(5,"0");
      }
    }
  });
}
function timeText(e){
  if(e.startTime && e.endTime) return `${e.startTime}–${e.endTime}`;
  return e.time || "";
}
function minutes(t){
  if(!t) return null;
  const [h,m]=t.split(":").map(Number);
  return h*60+m;
}
function setTimePair(prefix,start="",end=""){
  const s=document.getElementById(prefix+"Start"), e=document.getElementById(prefix+"End");
  if(s) s.value=start||"";
  if(e) e.value=end||"";
}
function readTimePair(prefix){
  return {
    startTime:document.getElementById(prefix+"Start")?.value||"",
    endTime:document.getElementById(prefix+"End")?.value||""
  };
}
function applyPreset(prefix,key,titleId){
  if(key==="clear"){ setTimePair(prefix,"",""); return; }
  const p=shiftPresets()[key]; if(!p) return;
  setTimePair(prefix,p.start,p.end);
  const title=document.getElementById(titleId);
  if(title && (!title.value.trim() || ["仕事","日勤","半日","遅番"].includes(title.value.trim()))) title.value=p.title;
}


function renderAll(){
  renderFilters();
  renderCalendar();
  renderSummary();
  renderNextMusic();
  renderMusic();
  renderMembers();
  renderTimeline();
  populateMemberSelects();
  populateGroupSelect();
}
function renderFilters(){
  const host=document.getElementById("memberFilters");
  host.innerHTML="";
  const all=document.createElement("button");
  all.className=`filter-chip ${selectedFilter==="all"?"active":""}`;
  all.textContent="ALL";
  all.onclick=()=>{selectedFilter="all"; renderCalendar(); renderFilters();};
  host.appendChild(all);
  state.members.forEach(m=>{
    const b=document.createElement("button");
    b.className=`filter-chip ${selectedFilter===m.id?"active":""}`;
    b.textContent=m.name;
    b.style.background=mix(m.color,.72);
    b.style.borderColor=m.color;
    b.onclick=()=>{selectedFilter=m.id; renderCalendar(); renderFilters();};
    host.appendChild(b);
  });
}
function renderCalendar(){
  const grid=document.getElementById("calendarGrid");
  const label=document.getElementById("monthLabel");
  label.textContent=`${cursor.getFullYear()}年 ${cursor.getMonth()+1}月`;
  grid.innerHTML="";

  const first=cursor;
  const mondayIndex=(first.getDay()+6)%7;
  const start=new Date(first.getFullYear(),first.getMonth(),1-mondayIndex);
  const today=new Date();

  for(let i=0;i<42;i++){
    const d=new Date(start); d.setDate(start.getDate()+i);
    const key=dateKey(d);
    const cell=document.createElement("button");
    cell.className="day-cell";
    if(d.getMonth()!==cursor.getMonth()) cell.classList.add("outside");
    if(isSameDay(d,today)) cell.classList.add("today");
    cell.innerHTML=`<div class="day-num">${d.getDate()}</div>`;

    let events=state.events.filter(e=>e.date===key);
    if(selectedFilter!=="all"){
      events=events.filter(e=>e.memberId===selectedFilter || (e.memberIds||[]).includes(selectedFilter));
    }

    events.slice(0,3).forEach(e=>{
      const m=memberById(e.memberId) || memberById((e.memberIds||[])[0]);
      const pill=document.createElement("span");
      pill.className="event-pill";
      const color=m?.color || "#b7a3ea";
      pill.style.background=mix(color,.66);
      pill.style.color="#315d76";
      const who=(e.memberIds?.length>1) ? e.memberIds.map(id=>memberById(id)?.name).filter(Boolean).join("・") : (m?.name||"");
      pill.innerHTML=`<span class="event-who">${who ? esc(who)+" " : ""}</span><span class="event-title">${esc(monthTitle(e))}</span>`;
      cell.appendChild(pill);
    });
    const stampIds=[...new Set(events.flatMap(e=>Array.isArray(e.stampIds)?e.stampIds:[]))].filter(id=>STAMP_BY_ID[id]);
    if(stampIds.length){
      const stampWrap=document.createElement("div");
      stampWrap.className="day-stamps";
      stampIds.slice(0,3).forEach(id=>{
        const stamp=STAMP_BY_ID[id];
        const img=document.createElement("img");
        img.className="day-stamp-img";
        img.src=stamp.image;
        img.alt="";
        stampWrap.appendChild(img);
      });
      cell.appendChild(stampWrap);
    }

    if(events.length>3){
      const more=document.createElement("div");
      more.className="more-pill";
      more.textContent=`＋${events.length-3}`;
      cell.appendChild(more);
    }
    cell.onclick=()=>openDay(key);
    grid.appendChild(cell);
  }
}
function lifeFor(date, memberId){
  return state.life?.[date]?.[memberId] || {dinner:"unknown", lunch:"unknown"};
}
function renderSummary(){
  const today=dateKey(new Date());
  const tomorrowD=new Date(); tomorrowD.setDate(tomorrowD.getDate()+1);
  const tomorrow=dateKey(tomorrowD);

  const dinnerMembers=state.members.filter(m=>m.dinner && (m.living==="home" || hasReturnHome(today,m.id)));
  const dinnerYes=dinnerMembers.filter(m=>lifeFor(today,m.id).dinner==="yes").length;
  const dinnerUnknown=dinnerMembers.filter(m=>lifeFor(today,m.id).dinner==="unknown").length;
  document.getElementById("dinnerCount").textContent=`${dinnerYes}人`;
  document.getElementById("dinnerDetail").textContent=dinnerUnknown?`未回答 ${dinnerUnknown}人`:"回答済み";

  const lunchMembers=state.members.filter(m=>m.lunch && (m.living==="home" || hasReturnHome(tomorrow,m.id)));
  const lunchYes=lunchMembers.filter(m=>lifeFor(tomorrow,m.id).lunch==="yes").length;
  const lunchUnknown=lunchMembers.filter(m=>lifeFor(tomorrow,m.id).lunch==="unknown").length;
  document.getElementById("lunchCount").textContent=`${lunchYes}個`;
  document.getElementById("lunchDetail").textContent=lunchUnknown?`未回答 ${lunchUnknown}人`:"回答済み";
}
function hasReturnHome(date, memberId){
  return state.events.some(e=>e.date===date && (e.memberId===memberId || (e.memberIds||[]).includes(memberId)) && e.category==="帰省");
}
function renderNextMusic(){
  const host=document.getElementById("nextMusic");
  const today=dateKey(new Date());
  const events=state.events.filter(e=>e.category==="音楽" && e.date>=today).sort((a,b)=>a.date.localeCompare(b.date));
  if(!events.length){ host.innerHTML=`<div class="music-mini"><div>☁️</div><div class="music-copy"><strong>まだ予定なし</strong>音楽予定を追加するとここに表示されます。</div></div>`; return; }
  const e=events[0], d=parseKey(e.date), g=groupById(e.groupId);
  host.innerHTML=`<div class="music-mini">
    <div class="music-date">${d.getMonth()+1}/${d.getDate()}</div>
    <div class="music-copy"><strong>${esc(g?.name||"音楽")}｜${esc(e.title||e.musicType||"予定")}</strong>
    ${esc((e.memberIds||[]).map(id=>memberById(id)?.name).filter(Boolean).join("・"))}${timeText(e)?` ・ ${esc(timeText(e))}`:""}</div>
  </div>`;
}
function renderMusic(){
  const groups=document.getElementById("musicGroups");
  groups.innerHTML=state.groups.map(g=>`<button class="group-chip" style="background:${mix(g.color,.7)};border-color:${g.color}">${esc(g.name)}</button>`).join("");
  const list=document.getElementById("musicList");
  const events=state.events.filter(e=>e.category==="音楽").sort((a,b)=>a.date.localeCompare(b.date));
  if(!events.length){ list.innerHTML=`<div class="hint">音楽予定はまだありません。</div>`; return; }
  list.innerHTML=events.map(e=>{
    const g=groupById(e.groupId), d=parseKey(e.date);
    const names=(e.memberIds||[]).map(id=>memberById(id)?.name).filter(Boolean).join("・");
    return `<div class="event-row">
      <div class="event-row-top"><span>${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${esc(timeText(e))}</span><span>${esc(names)}</span></div>
      <div class="event-row-title">🎼 ${esc(g?.name||"")}｜${esc(e.title||e.musicType||"予定")}</div>
      ${e.program?`<div class="member-meta">♪ ${esc(e.program).replace(/\n/g," / ")}</div>`:""}
      ${e.place?`<div class="member-meta">📍 ${esc(e.place)}</div>`:""}
    </div>`;
  }).join("");
}
function renderMembers(){
  const host=document.getElementById("memberList");
  host.innerHTML=state.members.map(m=>`
    <div class="member-row">
      <div class="member-badge"><span class="member-dot" style="background:${m.color}"></span><span>${esc(m.name)}</span></div>
      <div class="member-actions">
        <div class="member-meta">${m.living==="home"?"🏠 同居":"🚗 別居"}　${m.dinner?"🍚":""}${m.lunch?"🍱":""}</div>
        <button type="button" class="member-edit-btn" data-member-edit="${m.id}">編集</button>
      </div>
    </div>`).join("");

  host.querySelectorAll("[data-member-edit]").forEach(b=>b.onclick=()=>openMemberEditor(b.dataset.memberEdit));
}
function populateMemberSelects(){
  const opts=state.members.map(m=>`<option value="${m.id}">${esc(m.name)}</option>`).join("");
  ["eventMember","bulkMember"].forEach(id=>document.getElementById(id).innerHTML=opts);
}
function populateGroupSelect(){
  document.getElementById("musicGroup").innerHTML=state.groups.map(g=>`<option value="${g.id}">${esc(g.name)}</option>`).join("");
}
function openDay(key){
  selectedDate=key;
  editingEventId=null;
  const d=parseKey(key);
  document.getElementById("dayDialogTitle").textContent=`${d.getMonth()+1}月${d.getDate()}日`;
  document.getElementById("eventTitle").value="";
  setTimePair("event","","");
  document.getElementById("eventPlace").value="";
  document.getElementById("eventMemo").value="";
  selectedStampIds=[];
  renderSelectedStampPreview();
  timelineDate=key; renderTimeline();
  document.getElementById("eventCategory").value="仕事";
  document.getElementById("saveEventBtn").textContent="保存";
  lifeExpanded=false;
  document.getElementById("lifeBlock").classList.add("hidden");
  document.getElementById("lifeExpandBtn").classList.remove("active");
  document.getElementById("lifeExpandBtn").textContent="＋ 食事・生活情報を追加";
  const memberId=document.getElementById("eventMember").value || state.members[0]?.id;
  loadLifeChoices(memberId);
  renderExisting();
  document.getElementById("dayDialog").showModal();
}
function renderExisting(){
  const host=document.getElementById("dayExisting");
  const events=state.events.filter(e=>e.date===selectedDate);
  if(!events.length){host.innerHTML="";return;}
  host.innerHTML=events.map(e=>{
    const names=e.memberIds?.length ? e.memberIds.map(id=>memberById(id)?.name).filter(Boolean).join("・") : memberById(e.memberId)?.name;
    return `<div class="existing-item">
      <div class="existing-copy"><strong>${esc(names||"")}｜${esc(e.title||e.category)}</strong>${esc(timeText(e))}
        ${Array.isArray(e.stampIds)&&e.stampIds.length?`<div class="existing-stamps">${e.stampIds.filter(id=>STAMP_BY_ID[id]).map(id=>`<img src="${STAMP_BY_ID[id].image}" alt="${esc(STAMP_BY_ID[id].name)}">`).join("")}</div>`:""}
      </div>
      <div class="existing-actions">
        <button type="button" class="edit-btn" data-edit="${e.id}">編集</button>
        <button type="button" class="delete-btn" data-delete="${e.id}">削除</button>
      </div>
    </div>`;
  }).join("");

  host.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>startEditEvent(b.dataset.edit));

  host.querySelectorAll("[data-delete]").forEach(b=>b.onclick=()=>{
    state.events=state.events.filter(e=>e.id!==b.dataset.delete);
    if(editingEventId===b.dataset.delete) editingEventId=null;
    saveState(); renderExisting(); renderAll();
  });
}

function loadLifeChoices(memberId){
  const life=lifeFor(selectedDate, memberId);
  dinnerChoice=life.dinner || "unknown";
  lunchChoice=life.lunch || "unknown";
  updateSegments();
}

function startEditEvent(id){
  const e=state.events.find(x=>x.id===id);
  if(!e) return;
  editingEventId=id;
  const memberId=e.memberId || e.memberIds?.[0] || state.members[0]?.id;
  if(memberId) document.getElementById("eventMember").value=memberId;
  document.getElementById("eventCategory").value=e.category || "その他";
  document.getElementById("eventTitle").value=e.title || "";
  setTimePair("event",e.startTime||"",e.endTime||"");
  document.getElementById("eventPlace").value=e.place || "";
  document.getElementById("eventMemo").value=e.memo || "";
  selectedStampIds=[...(e.stampIds||[])].slice(0,MAX_STAMPS);
  renderSelectedStampPreview();
  document.getElementById("saveEventBtn").textContent="変更を保存";
  loadLifeChoices(memberId);
}


function renderSelectedStampPreview(){
  const host=document.getElementById("selectedStampPreview");
  const ph=document.getElementById("stampPickerPlaceholder");
  if(!host||!ph) return;
  host.innerHTML=selectedStampIds.filter(id=>STAMP_BY_ID[id]).map(id=>{
    const s=STAMP_BY_ID[id];
    return `<img src="${s.image}" alt="${esc(s.name)}" title="${esc(s.name)}">`;
  }).join("");
  ph.textContent=selectedStampIds.length?"変更する":"🍪 スタンプを選ぶ";
}
function stampCategories(){
  return ["すべて",...new Set(STAMP_MASTER.map(s=>s.category))];
}
function renderStampPicker(){
  const tabs=document.getElementById("stampCategoryTabs");
  const grid=document.getElementById("stampGrid");
  const count=document.getElementById("stampCount");
  if(!tabs||!grid) return;
  tabs.innerHTML=stampCategories().map(cat=>`<button type="button" class="stamp-category-tab ${cat===activeStampCategory?"active":""}" data-stamp-cat="${esc(cat)}">${esc(cat)}</button>`).join("");
  tabs.querySelectorAll("[data-stamp-cat]").forEach(b=>b.onclick=()=>{activeStampCategory=b.dataset.stampCat;renderStampPicker();});
  const list=activeStampCategory==="すべて"?STAMP_MASTER:STAMP_MASTER.filter(s=>s.category===activeStampCategory);
  grid.innerHTML=list.map(s=>`<button type="button" class="stamp-option ${selectedStampIds.includes(s.id)?"selected":""}" data-stamp-id="${s.id}" aria-label="${esc(s.name)}"><img src="${s.image}" alt=""><span>${esc(s.name)}</span></button>`).join("");
  grid.querySelectorAll("[data-stamp-id]").forEach(b=>b.onclick=()=>{
    const id=b.dataset.stampId;
    if(selectedStampIds.includes(id)) selectedStampIds=selectedStampIds.filter(x=>x!==id);
    else if(selectedStampIds.length<MAX_STAMPS) selectedStampIds=[...selectedStampIds,id];
    renderStampPicker();
  });
  count.textContent=`${selectedStampIds.length} / ${MAX_STAMPS}`;
}
document.getElementById("openStampPickerBtn").onclick=()=>{
  activeStampCategory="すべて";
  renderStampPicker();
  document.getElementById("stampDialog").showModal();
};
document.getElementById("clearStampsBtn").onclick=()=>{selectedStampIds=[];renderStampPicker();};
document.getElementById("doneStampsBtn").onclick=()=>{
  document.getElementById("stampDialog").close();
  renderSelectedStampPreview();
};

function updateSegments(){
  document.querySelectorAll("#dinnerSegments button").forEach(b=>b.classList.toggle("active",b.dataset.value===dinnerChoice));
  document.querySelectorAll("#lunchSegments button").forEach(b=>b.classList.toggle("active",b.dataset.value===lunchChoice));
}
document.querySelectorAll("#dinnerSegments button").forEach(b=>b.onclick=()=>{dinnerChoice=b.dataset.value;updateSegments();});
document.querySelectorAll("#lunchSegments button").forEach(b=>b.onclick=()=>{lunchChoice=b.dataset.value;updateSegments();});
document.getElementById("eventMember").addEventListener("change",e=>loadLifeChoices(e.target.value));
document.getElementById("lifeExpandBtn").onclick=()=>{
  lifeExpanded=!lifeExpanded;
  document.getElementById("lifeBlock").classList.toggle("hidden",!lifeExpanded);
  document.getElementById("lifeExpandBtn").classList.toggle("active",lifeExpanded);
  document.getElementById("lifeExpandBtn").textContent=lifeExpanded?"− 食事・生活情報を閉じる":"＋ 食事・生活情報を追加";
};

document.getElementById("saveEventBtn").onclick=()=>{
  const memberId=document.getElementById("eventMember").value;
  const category=document.getElementById("eventCategory").value;
  const title=document.getElementById("eventTitle").value.trim() || category;

  const payload={
    date:selectedDate, memberId, category, title,
    ...readTimePair("event"),
    time:"",
    place:document.getElementById("eventPlace").value.trim(),
    memo:document.getElementById("eventMemo").value.trim(),
    stampIds:[...selectedStampIds]
  };

  if(editingEventId){
    const i=state.events.findIndex(e=>e.id===editingEventId);
    if(i>=0){
      // 音楽専用項目など、既存の追加情報は残す
      state.events[i]={...state.events[i], ...payload};
    }
  }else{
    state.events.push({id:crypto.randomUUID(), ...payload});
  }

  if(lifeExpanded){
    state.life[selectedDate] ??= {};
    state.life[selectedDate][memberId]={dinner:dinnerChoice,lunch:lunchChoice};
  }

  if(category==="外泊" || category==="飲み会"){
    const m=memberById(memberId);
    if(m?.dinner){
      state.life[selectedDate] ??= {};
      state.life[selectedDate][memberId] ??= {dinner:"unknown",lunch:"unknown"};
      state.life[selectedDate][memberId].dinner="no";
    }
  }

  editingEventId=null;
  saveState();
  document.getElementById("dayDialog").close();
  renderAll();
};

function openBulk(){
  // 「まとめ入力」を押した時点の入力内容を引き継ぐ
  const sourceMember=document.getElementById("eventMember")?.value || "";
  const sourceCategory=document.getElementById("eventCategory")?.value || "";
  const sourceTitle=document.getElementById("eventTitle")?.value || "";
  const sourceStart=document.getElementById("eventStart")?.value || "";
  const sourceEnd=document.getElementById("eventEnd")?.value || "";

  bulkSelected=new Set();
  const host=document.getElementById("bulkDateGrid");
  host.innerHTML="";
  const y=cursor.getFullYear(), m=cursor.getMonth();
  document.getElementById("bulkMonthLabel").textContent=`${y}年 ${m+1}月`;
  const first=new Date(y,m,1);
  const mondayIndex=(first.getDay()+6)%7;
  for(let i=0;i<mondayIndex;i++){
    const blank=document.createElement("div");
    blank.className="bulk-blank";
    host.appendChild(blank);
  }
  const days=new Date(y,m+1,0).getDate();
  const dowNames=["日","月","火","水","木","金","土"];
  for(let i=1;i<=days;i++){
    const d=new Date(y,m,i), key=dateKey(d);
    const b=document.createElement("button");
    b.type="button";
    b.className="bulk-date";
    if(d.getDay()===6) b.classList.add("sat");
    if(d.getDay()===0) b.classList.add("sun");
    b.innerHTML=`<span class="bulk-daynum">${i}</span><span class="bulk-dow">${dowNames[d.getDay()]}</span>`;
    b.onclick=()=>{ 
      if(bulkSelected.has(key)){bulkSelected.delete(key);b.classList.remove("selected");}
      else{bulkSelected.add(key);b.classList.add("selected");}
    };
    host.appendChild(b);
  }
  // 単日入力で選んだメンバー・カテゴリ・予定名・時間をそのまま引き継ぐ
  const bulkMember=document.getElementById("bulkMember");
  const bulkCategory=document.getElementById("bulkCategory");
  if(sourceMember && [...bulkMember.options].some(o=>o.value===sourceMember)) bulkMember.value=sourceMember;
  if(sourceCategory && [...bulkCategory.options].some(o=>o.value===sourceCategory)) bulkCategory.value=sourceCategory;
  document.getElementById("bulkTitle").value=sourceTitle;
  setTimePair("bulk",sourceStart,sourceEnd);
  document.getElementById("bulkDialog").showModal();
}
document.getElementById("bulkBtn").onclick=()=>{document.getElementById("dayDialog").close();openBulk();};
document.getElementById("saveBulkBtn").onclick=()=>{
  const memberId=document.getElementById("bulkMember").value;
  const category=document.getElementById("bulkCategory").value;
  const title=document.getElementById("bulkTitle").value.trim()||category;
  const timeData=readTimePair("bulk");
  bulkSelected.forEach(date=>state.events.push({id:crypto.randomUUID(),date,memberId,category,title,...timeData,time:"",place:"",memo:""}));
  saveState(); document.getElementById("bulkDialog").close(); renderAll();
};

document.getElementById("addMusicBtn").onclick=()=>{
  document.getElementById("musicDate").value=dateKey(new Date());
  document.getElementById("musicTitle").value="";
  setTimePair("music","","");
  document.getElementById("musicProgram").value="";
  document.getElementById("musicPlace").value="";
  document.getElementById("musicDialog").showModal();
};
document.getElementById("saveMusicBtn").onclick=()=>{
  const groupId=document.getElementById("musicGroup").value;
  const group=groupById(groupId);
  const date=document.getElementById("musicDate").value;
  if(!date) return;
  state.events.push({
    id:crypto.randomUUID(), date, category:"音楽", groupId,
    memberIds:[...(group?.members||[])],
    title:document.getElementById("musicTitle").value.trim() || document.getElementById("musicType").value,
    musicType:document.getElementById("musicType").value,
    ...readTimePair("music"),
    time:"",
    program:document.getElementById("musicProgram").value.trim(),
    place:document.getElementById("musicPlace").value.trim()
  });
  saveState(); document.getElementById("musicDialog").close(); renderAll();
};

function openMemberEditor(id=null){
  editingMemberId=id;
  const title=document.getElementById("memberDialogTitle");
  const saveBtn=document.getElementById("saveMemberBtn");
  const danger=document.getElementById("memberDangerZone");

  if(id){
    const m=memberById(id);
    if(!m) return;
    title.textContent="メンバー編集";
    danger.classList.remove("hidden");
    saveBtn.textContent="変更を保存";
    document.getElementById("memberName").value=m.name;
    document.getElementById("memberColor").value=m.color;
    document.getElementById("memberLiving").value=m.living;
    document.getElementById("memberDinner").checked=!!m.dinner;
    document.getElementById("memberLunch").checked=!!m.lunch;
  }else{
    title.textContent="メンバー追加";
    danger.classList.add("hidden");
    saveBtn.textContent="追加";
    document.getElementById("memberName").value="";
    document.getElementById("memberColor").value="#f4a8c6";
    document.getElementById("memberLiving").value="home";
    document.getElementById("memberDinner").checked=true;
    document.getElementById("memberLunch").checked=true;
  }
  document.getElementById("memberDialog").showModal();
}
document.getElementById("addMemberBtn").onclick=()=>openMemberEditor();
document.getElementById("saveMemberBtn").onclick=()=>{
  const name=document.getElementById("memberName").value.trim();
  if(!name) return;

  const payload={
    name,
    color:document.getElementById("memberColor").value,
    living:document.getElementById("memberLiving").value,
    dinner:document.getElementById("memberDinner").checked,
    lunch:document.getElementById("memberLunch").checked
  };

  if(editingMemberId){
    const i=state.members.findIndex(m=>m.id===editingMemberId);
    if(i>=0) state.members[i]={...state.members[i], ...payload};
  }else{
    state.members.push({id:"m_"+Date.now(), ...payload});
  }

  editingMemberId=null;
  saveState();
  document.getElementById("memberDialog").close();
  renderAll();
};


document.getElementById("deleteMemberBtn").onclick=()=>{
  if(!editingMemberId) return;
  const m=memberById(editingMemberId);
  if(!m) return;
  if(!confirm(`${m.name}をメンバーから削除しますか？\n過去の予定は履歴として残します。`)) return;
  state.members=state.members.filter(x=>x.id!==editingMemberId);
  state.groups.forEach(g=>g.members=(g.members||[]).filter(id=>id!==editingMemberId));
  editingMemberId=null;
  saveState();
  document.getElementById("memberDialog").close();
  if(selectedFilter===m.id) selectedFilter="all";
  renderAll();
};

function timelineHourHeight(){ return window.matchMedia("(max-width:500px)").matches ? 22 : 32; }
function shiftTimelineDay(delta){
  const d=parseKey(timelineDate);
  d.setDate(d.getDate()+delta);
  timelineDate=dateKey(d);
  renderTimeline();
}
function renderTimeline(){
  const host=document.getElementById("timeline");
  if(!host) return;
  const d=parseKey(timelineDate);
  document.getElementById("timelineDateLabel").textContent=`${d.getMonth()+1}月${d.getDate()}日`;
  const members=state.members;
  host.style.setProperty("--member-count",Math.max(1,members.length));
  host.innerHTML=`<div class="timeline-corner"></div>`+
    members.map(m=>`<div class="timeline-member"><span class="member-dot" style="display:inline-block;background:${m.color};vertical-align:-3px;margin-right:4px"></span>${esc(m.name)}</div>`).join("");

  for(let h=6;h<24;h++){
    host.insertAdjacentHTML("beforeend",`<div class="timeline-time">${String(h).padStart(2,"0")}:00</div>`);
    members.forEach(m=>{
      const cell=document.createElement("div");
      cell.className="timeline-slot";
      cell.dataset.member=m.id;
      cell.dataset.hour=h;
      host.appendChild(cell);
    });
  }

  const events=state.events.filter(e=>e.date===timelineDate && e.startTime && e.endTime);
  events.forEach(e=>{
    const ids=e.memberIds?.length ? e.memberIds : [e.memberId];
    ids.forEach(id=>{
      if(!memberById(id)) return;
      const start=minutes(e.startTime), end=minutes(e.endTime);
      if(start===null||end===null||end<=start) return;
      const clippedStart=Math.max(start,360), clippedEnd=Math.min(end,1440);
      if(clippedEnd<=clippedStart) return;
      const hour=Math.floor(clippedStart/60);
      const slot=host.querySelector(`.timeline-slot[data-member="${CSS.escape(id)}"][data-hour="${hour}"]`);
      if(!slot) return;
      const m=memberById(id);
      const hourHeight=timelineHourHeight();
      const top=((clippedStart-hour*60)/60)*hourHeight;
      const height=Math.max(14,((clippedEnd-clippedStart)/60)*hourHeight);
      const block=document.createElement("div");
      block.className="timeline-event";
      block.style.top=`${top}px`;
      block.style.height=`${height}px`;
      block.style.background=mix(m.color,.5);
      block.textContent=`${monthTitle(e)} ${e.startTime}–${e.endTime}`;
      slot.appendChild(block);
    });
  });
}

["event","bulk","music"].forEach(prefix=>{
  populateTimeSelect(prefix+"Start");
  populateTimeSelect(prefix+"End");
});
document.querySelectorAll("#eventPresets [data-preset]").forEach(b=>b.onclick=()=>applyPreset("event",b.dataset.preset,"eventTitle"));
document.querySelectorAll("#bulkPresets [data-preset]").forEach(b=>b.onclick=()=>applyPreset("bulk",b.dataset.preset,"bulkTitle"));
document.getElementById("timelineTodayBtn").onclick=()=>{timelineDate=dateKey(new Date());renderTimeline();};
document.getElementById("timelinePrevBtn").onclick=()=>shiftTimelineDay(-1);
document.getElementById("timelineNextBtn").onclick=()=>shiftTimelineDay(1);

document.getElementById("prevMonth").onclick=()=>{cursor=addMonths(cursor,-1);renderCalendar();};
document.getElementById("nextMonth").onclick=()=>{cursor=addMonths(cursor,1);renderCalendar();};
document.getElementById("todayBtn").onclick=()=>{cursor=startOfMonth(new Date());renderCalendar();};
document.getElementById("quickAdd").onclick=()=>openDay(dateKey(new Date()));

function openTab(tab){
  const music=document.getElementById("musicPanel");
  const members=document.getElementById("membersPanel");
  const settings=document.getElementById("settingsPanel");
  const special=tab==="music"||tab==="members"||tab==="settings";

  music.classList.toggle("hidden",tab!=="music");
  members.classList.toggle("hidden",tab!=="members");
  settings.classList.toggle("hidden",tab!=="settings");

  document.querySelector(".calendar-card").classList.toggle("hidden", special);
  document.querySelector(".summary-grid").classList.toggle("hidden", special);
  document.querySelector(".next-music-card").classList.toggle("hidden", special);
  document.getElementById("timelineCard").classList.toggle("hidden", special);

  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab || (tab==="home"&&b.dataset.tab==="home")));

  if(tab==="settings") renderSettings();
}

function renderSettings(){
  const p=shiftPresets();
  const ids=["settingDayStart","settingDayEnd","settingHalfStart","settingHalfEnd","settingLateStart","settingLateEnd"];
  ids.forEach(populateTimeSelect);
  document.getElementById("settingDayStart").value=p.day.start;
  document.getElementById("settingDayEnd").value=p.day.end;
  document.getElementById("settingHalfStart").value=p.half.start;
  document.getElementById("settingHalfEnd").value=p.half.end;
  document.getElementById("settingLateStart").value=p.late.start;
  document.getElementById("settingLateEnd").value=p.late.end;
}
document.getElementById("savePresetSettingsBtn").onclick=()=>{
  const p=shiftPresets();
  p.day.start=document.getElementById("settingDayStart").value;
  p.day.end=document.getElementById("settingDayEnd").value;
  p.half.start=document.getElementById("settingHalfStart").value;
  p.half.end=document.getElementById("settingHalfEnd").value;
  p.late.start=document.getElementById("settingLateStart").value;
  p.late.end=document.getElementById("settingLateEnd").value;
  saveState();
  document.getElementById("backupStatus").textContent="勤務プリセットを保存しました。";
};

function exportData(){
  const payload={
    app:"with.fam",
    schemaVersion:1,
    exportedAt:new Date().toISOString(),
    data:state
  };
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  const now=new Date();
  const stamp=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
  a.href=url;
  a.download=`with-fam-backup-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  document.getElementById("backupStatus").textContent="EXPORTしました。Filesアプリなどに保存してください。";
}
document.getElementById("exportBtn").onclick=exportData;

document.getElementById("importFile").addEventListener("change",async(e)=>{
  const file=e.target.files?.[0];
  if(!file) return;
  const status=document.getElementById("backupStatus");
  try{
    const text=await file.text();
    const parsed=JSON.parse(text);
    const imported=parsed?.app==="with.fam" ? parsed.data : parsed;
    if(!imported || !Array.isArray(imported.members) || !Array.isArray(imported.events) || typeof imported.life!=="object"){
      throw new Error("形式が違います");
    }
    if(!confirm("現在のwith.famデータをIMPORTした内容に置き換えます。よろしいですか？")) return;
    state={...structuredClone(seed),...imported};
    migrateEventTimes();
    saveState();
    cursor=startOfMonth(new Date());
    selectedFilter="all";
    timelineDate=dateKey(new Date());
    renderAll();
    renderSettings();
    status.textContent="IMPORT完了。別端末のデータを読み込みました。";
  }catch(err){
    status.textContent="IMPORTできませんでした。with.famのバックアップJSONか確認してください。";
  }finally{
    e.target.value="";
  }
});

document.querySelectorAll(".nav-btn").forEach(b=>b.onclick=()=>openTab(b.dataset.tab));
document.querySelectorAll("[data-open-tab]").forEach(b=>b.onclick=()=>openTab(b.dataset.openTab));

shiftPresets();
migrateEventTimes();
saveState();
renderSelectedStampPreview();
renderAll();

window.addEventListener("resize",()=>renderTimeline());

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
}
