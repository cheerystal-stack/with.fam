
const STORAGE_KEY = "familySkyCalendarV01";

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
function esc(s=""){ return String(s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c])); }
function mix(hex, amount=0.78){
  const c=hex.replace("#","");
  const n=parseInt(c,16), r=(n>>16)&255,g=(n>>8)&255,b=n&255;
  const mixc=x=>Math.round(x+(255-x)*amount);
  return `rgb(${mixc(r)},${mixc(g)},${mixc(b)})`;
}
function isSameDay(a,b){ return dateKey(a)===dateKey(b); }

function renderAll(){
  renderFilters();
  renderCalendar();
  renderSummary();
  renderNextMusic();
  renderMusic();
  renderMembers();
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
      pill.textContent=`${who ? who+" " : ""}${e.category==="音楽"?"🎼 ":""}${e.title||e.category}`;
      cell.appendChild(pill);
    });
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
    ${esc((e.memberIds||[]).map(id=>memberById(id)?.name).filter(Boolean).join("・"))}${e.time?` ・ ${esc(e.time)}`:""}</div>
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
      <div class="event-row-top"><span>${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${esc(e.time||"")}</span><span>${esc(names)}</span></div>
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
  document.getElementById("eventTime").value="";
  document.getElementById("eventPlace").value="";
  document.getElementById("eventMemo").value="";
  document.getElementById("eventCategory").value="仕事";
  document.getElementById("saveEventBtn").textContent="保存";
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
      <div class="existing-copy"><strong>${esc(names||"")}｜${esc(e.title||e.category)}</strong>${esc(e.time||"")}</div>
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
  document.getElementById("eventTime").value=e.time || "";
  document.getElementById("eventPlace").value=e.place || "";
  document.getElementById("eventMemo").value=e.memo || "";
  document.getElementById("saveEventBtn").textContent="変更を保存";
  loadLifeChoices(memberId);
}

function updateSegments(){
  document.querySelectorAll("#dinnerSegments button").forEach(b=>b.classList.toggle("active",b.dataset.value===dinnerChoice));
  document.querySelectorAll("#lunchSegments button").forEach(b=>b.classList.toggle("active",b.dataset.value===lunchChoice));
}
document.querySelectorAll("#dinnerSegments button").forEach(b=>b.onclick=()=>{dinnerChoice=b.dataset.value;updateSegments();});
document.querySelectorAll("#lunchSegments button").forEach(b=>b.onclick=()=>{lunchChoice=b.dataset.value;updateSegments();});
document.getElementById("eventMember").addEventListener("change",e=>loadLifeChoices(e.target.value));

document.getElementById("saveEventBtn").onclick=()=>{
  const memberId=document.getElementById("eventMember").value;
  const category=document.getElementById("eventCategory").value;
  const title=document.getElementById("eventTitle").value.trim() || category;

  const payload={
    date:selectedDate, memberId, category, title,
    time:document.getElementById("eventTime").value.trim(),
    place:document.getElementById("eventPlace").value.trim(),
    memo:document.getElementById("eventMemo").value.trim()
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

  state.life[selectedDate] ??= {};
  state.life[selectedDate][memberId]={dinner:dinnerChoice,lunch:lunchChoice};

  if(category==="外泊" || category==="飲み会"){
    const m=memberById(memberId);
    if(m?.dinner) state.life[selectedDate][memberId].dinner="no";
  }

  editingEventId=null;
  saveState();
  document.getElementById("dayDialog").close();
  renderAll();
};

function openBulk(){
  bulkSelected=new Set();
  const host=document.getElementById("bulkDateGrid");
  host.innerHTML="";
  const y=cursor.getFullYear(), m=cursor.getMonth();
  const days=new Date(y,m+1,0).getDate();
  for(let i=1;i<=days;i++){
    const d=new Date(y,m,i), key=dateKey(d);
    const b=document.createElement("button");
    b.type="button"; b.className="bulk-date"; b.textContent=i;
    b.onclick=()=>{ 
      if(bulkSelected.has(key)){bulkSelected.delete(key);b.classList.remove("selected");}
      else{bulkSelected.add(key);b.classList.add("selected");}
    };
    host.appendChild(b);
  }
  document.getElementById("bulkDialog").showModal();
}
document.getElementById("bulkBtn").onclick=()=>{document.getElementById("dayDialog").close();openBulk();};
document.getElementById("saveBulkBtn").onclick=()=>{
  const memberId=document.getElementById("bulkMember").value;
  const category=document.getElementById("bulkCategory").value;
  const title=document.getElementById("bulkTitle").value.trim()||category;
  const time=document.getElementById("bulkTime").value.trim();
  bulkSelected.forEach(date=>state.events.push({id:crypto.randomUUID(),date,memberId,category,title,time,place:"",memo:""}));
  saveState(); document.getElementById("bulkDialog").close(); renderAll();
};

document.getElementById("addMusicBtn").onclick=()=>{
  document.getElementById("musicDate").value=dateKey(new Date());
  document.getElementById("musicTitle").value="";
  document.getElementById("musicTime").value="";
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
    time:document.getElementById("musicTime").value.trim(),
    program:document.getElementById("musicProgram").value.trim(),
    place:document.getElementById("musicPlace").value.trim()
  });
  saveState(); document.getElementById("musicDialog").close(); renderAll();
};

function openMemberEditor(id=null){
  editingMemberId=id;
  const title=document.getElementById("memberDialogTitle");
  const saveBtn=document.getElementById("saveMemberBtn");

  if(id){
    const m=memberById(id);
    if(!m) return;
    title.textContent="メンバー編集";
    saveBtn.textContent="変更を保存";
    document.getElementById("memberName").value=m.name;
    document.getElementById("memberColor").value=m.color;
    document.getElementById("memberLiving").value=m.living;
    document.getElementById("memberDinner").checked=!!m.dinner;
    document.getElementById("memberLunch").checked=!!m.lunch;
  }else{
    title.textContent="メンバー追加";
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

document.getElementById("prevMonth").onclick=()=>{cursor=addMonths(cursor,-1);renderCalendar();};
document.getElementById("nextMonth").onclick=()=>{cursor=addMonths(cursor,1);renderCalendar();};
document.getElementById("todayBtn").onclick=()=>{cursor=startOfMonth(new Date());renderCalendar();};
document.getElementById("quickAdd").onclick=()=>openDay(dateKey(new Date()));

function openTab(tab){
  const music=document.getElementById("musicPanel");
  const members=document.getElementById("membersPanel");
  music.classList.toggle("hidden",tab!=="music");
  members.classList.toggle("hidden",tab!=="members");
  document.querySelector(".calendar-card").classList.toggle("hidden", tab==="music"||tab==="members");
  document.querySelector(".summary-grid").classList.toggle("hidden", tab==="music"||tab==="members");
  document.querySelector(".next-music-card").classList.toggle("hidden", tab==="music"||tab==="members");
  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab || (tab==="home"&&b.dataset.tab==="home")));
  if(tab==="calendar"){
    document.querySelector(".calendar-card").classList.remove("hidden");
  }
}
document.querySelectorAll(".nav-btn").forEach(b=>b.onclick=()=>openTab(b.dataset.tab));
document.querySelectorAll("[data-open-tab]").forEach(b=>b.onclick=()=>openTab(b.dataset.openTab));

renderAll();

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
}
