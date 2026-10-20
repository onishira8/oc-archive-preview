/* OC ARCHIVE — no external services or generated artwork */
(() => {
  'use strict';
  const DATA = window.OC_DATA;
  const app = document.getElementById('app');
  const state = {
    characterFilter:'agency', galleryFilter:'all', informant:'informant01',
    profileTab:'about', locationTab:'about', relMode:'groups', relSelected:'agency',
    editPrompt:null, mobileMenu:false, modal:null
  };
  const N = {
    home:'ホーム', characters:'メンバー', church:'教会組', informants:'情報屋',
    relations:'人物相関図', city:'建物案内', gallery:'ギャラリー'
  };
  const NAV = [
    {label:'MAIN',links:[['home','ホーム','home'],['characters','メンバー','users']]},
    {label:'ASSOCIATES',links:[['church','教会組','church'],['informants','情報屋','radio']]},
    {label:'EXPLORE',links:[['relations','人物相関図','network'],['city','建物案内','building'],['gallery','ギャラリー','grid']]}
  ];
  const icons = {
    home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    church:'<path d="M12 2v7M9 5h6M4 21V11l8-5 8 5v10M2 21h20M9 21v-7h6v7"/>',
    radio:'<circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>',
    network:'<rect x="2" y="2" width="7" height="7" rx="1"/><rect x="15" y="2" width="7" height="7" rx="1"/><rect x="8.5" y="15" width="7" height="7" rx="1"/><path d="M9 5.5h6M5.5 9v3l6.5 3M18.5 9v3L12 15"/>',
    building:'<rect x="3" y="2" width="18" height="20" rx="1"/><path d="M9 22v-5h6v5M7 6h2M15 6h2M7 10h2M15 10h2M7 14h2M15 14h2"/>',
    grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    arrow:'<path d="M5 12h14M12 5l7 7-7 7"/>',
    north:'<path d="M7 17 17 7M7 7h10v10"/>',
    back:'<path d="M19 12H5M12 19l-7-7 7-7"/>',
    chevron:'<path d="m9 18 6-6-6-6"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    close:'<path d="M18 6 6 18M6 6l12 12"/>',
    copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    edit:'<path d="m16 5 3 3M4 20l4.5-1 10-10a2.12 2.12 0 0 0-3-3l-10 10z"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    eye:'<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>',
    image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
    plus:'<path d="M12 4v16M4 12h16"/>',
    pin:'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    folder:'<path d="M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v5M12 7h.01"/>',
    lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'
  };
  function icon(name, size=18) {return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">${icons[name]||icons.info}</svg>`;}
  function esc(value=''){return String(value).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function getChar(id){return DATA.characters.find(c=>c.id===id);}
  function groupText(group){return {agency:'便利屋',church:'教会組',informants:'情報屋'}[group]||'ARCHIVE';}
  function groupColor(group){return {agency:'red',church:'blue',informants:'violet'}[group]||'red';}
  function href(route){return '#'+route;}
  function routeInfo(){let raw=decodeURIComponent(location.hash.replace(/^#\/?/,'')||'home');let [page,id]=raw.split('/');return {page:(Object.prototype.hasOwnProperty.call(N,page)||page==='character'||page==='place')?page:'home',id};}
  function art(c, extra=''){
    let group=groupColor(c.group);
    return `<div class="art-placeholder art-${group} ${extra}" aria-label="${esc(c.name)}の画像は未登録">
      <span class="corner-label">ARTWORK / EMPTY</span>
      <div class="art-orbit"><span class="art-monogram">${esc(c.en.split(' ')[0].slice(0,1))}</span></div>
      <span class="art-floor">${esc(c.en)} · ${esc(c.index)}</span>
      <span class="art-cross">+</span>
    </div>`;
  }
  function imgOrPlaceholder(c,extra=''){
    return c.image ? `<div class="actual-art ${extra}"><img src="${esc(c.image)}" alt="${esc(c.name)}" loading="lazy"/></div>`:art(c,extra);
  }
  function placeArt(p,extra=''){
    return p.image ? `<div class="actual-art ${extra}"><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy"/></div>` : `<div class="place-art ${extra} ${p.group==='church'?'place-blue':'place-red'}"><span class="corner-label">EXTERIOR / NO IMAGE</span><div class="place-outline">${icon(p.group==='church'?'church':'building',64)}</div><span class="art-floor">${esc(p.en)}</span></div>`;
  }
  function topTitle(kicker,title,desc,extra=''){
    return `<div class="page-heading reveal"><div class="eyebrow"><i></i>${esc(kicker)}</div><div class="page-heading-row"><h1>${title}</h1>${extra}</div>${desc?`<p>${esc(desc)}</p>`:''}</div>`;
  }
  function charCard(c,variant=''){
    return `<a class="char-card group-${groupColor(c.group)} ${variant}" href="${href('character/'+c.id)}" aria-label="${esc(c.name)}の詳細へ">
      <div class="char-card-art">${imgOrPlaceholder(c)}<span class="card-index">${esc(c.index)} / 06</span><span class="card-arrow">${icon('north',17)}</span></div>
      <div class="char-card-info"><div><div class="micro muted">${esc(c.role)}</div><h3>${esc(c.name)}</h3><p>${esc(c.subtitle)}</p></div>${icon('arrow',19)}</div>
    </a>`;
  }
  function navLink([path,label,ic],current){let active = current===path || ((current==='character')&&(path==='characters')) || ((current==='place')&&(path==='city'));
    return `<a href="${href(path)}" class="nav-link ${active?'active':''}" data-navigate="${path}" aria-current="${active?'page':'false'}"><span class="nav-icon">${icon(ic,18)}</span><span>${esc(label)}</span>${active?'<i class="active-dot"></i>':''}</a>`;
  }
  function sidebar(current){return `<aside class="sidebar ${state.mobileMenu?'sidebar-open':''}" id="sidebar">
    <a class="brand" href="#home"><span class="brand-mark"><span></span><span></span><span></span><span></span></span><span><strong>OC<span> / </span>ARCHIVE</strong><small>UNFOLD THE UNKNOWN</small></span></a>
    <div class="side-divider"></div><nav class="side-nav" aria-label="メインナビゲーション">${NAV.map(s=>`<div class="nav-group"><div class="nav-title">${s.label}</div>${s.links.map(l=>navLink(l,current)).join('')}</div>`).join('')}</nav>
    <div class="side-bottom"><span class="live-pulse"></span><span>PROTOTYPE VERSION 01</span><small>VISUAL DEMO · NO ARTWORK</small></div>
  </aside>`;}
  function topbar(page){return `<header class="topbar"><button type="button" data-menu="toggle" class="menu-toggle" aria-label="メニューを開閉">${icon('menu',22)}</button>
     <div class="crumb">ARCHIVE <span>/</span> <strong>${esc(page==='character'?'CHARACTER':page==='place'?'LOCATION':N[page]||'HOME')}</strong></div>
     <div class="top-right"><span class="top-tag">ORIGINAL CHARACTERS</span><span class="status-badge"><i></i>PREVIEW SITE</span></div></header>`;}
  function shell(page, content){return `<div class="layout">${sidebar(page)}<div class="mobile-scrim ${state.mobileMenu?'visible':''}" data-menu="close"></div><div class="content-column">${topbar(page)}<main class="main-content" id="main-content"><div class="page-enter">${content}</div><footer class="footer"><span>© OC ARCHIVE · PROTOTYPE</span><span>CREATED FOR ORIGINAL CHARACTERS <em>✦</em> 2026</span></footer></main></div><div class="toast" role="status" id="toast"></div>${modalMarkup()}</div>`;}
  function buttonRoute(label,to,style='primary'){return `<a href="${href(to)}" class="btn btn-${style}">${esc(label)}${icon('north',17)}</a>`;}
  function homePage(){let main=DATA.characters.filter(c=>c.group==='agency');return `
    <section class="home-hero reveal">
      <div class="hero-contours" aria-hidden="true"></div><div class="hero-rail">01 — MAIN FACTION <span>EVERY STORY BEGINS SOMEWHERE.</span></div>
      <div class="hero-left"><div class="eyebrow"><i></i>THE WORLD OF ORIGINAL CHARACTERS</div>
        <div class="hero-title"><span>THE</span><strong>AGENCY<span class="hero-period">.</span></strong></div>
        <p class="hero-jp">便利屋と、彼らを取り巻く人々の記録。</p>
        <p class="hero-sub">物語の中心は便利屋。関係する人々、活動拠点、街の記録をたどるオリジナルキャラクター・アーカイブ。</p>
        <div class="hero-actions">${buttonRoute('MEMBERS を見る','characters')}${buttonRoute('相関図を見る','relations','text')}</div>
      </div>
      <div class="hero-visual"><div class="hero-visual-grain"></div><div class="hero-corner">FEATURED ARTWORK <span>01 / 01</span></div><div class="hero-visual-center"><span class="fine-circle"></span><b>ART<br/>COMING<br/>SOON</b></div><div class="hero-visual-bottom">REPLACE WITH YOUR OWN ILLUSTRATION <span>↗</span></div></div>
      <span class="vertical-word">COLLECTION — 2026</span><div class="hero-bottom"><span class="scroll-line"></span> SCROLL TO EXPLORE <span class="hero-counter">01 / 04</span></div>
    </section>
    <section class="section-block reveal" id="home-members"><div class="section-heading"><div><span class="section-num">01 / MAIN MEMBERS</span><h2>Meet the <em>agency.</em></h2><p>メインメンバーの記録。画像・プロフィールは随時追加できます。</p></div><a href="#characters" class="text-link">ALL CHARACTERS ${icon('north',17)}</a></div>
      <div class="char-grid home-char-grid">${main.map(c=>charCard(c)).join('')}</div></section>
    <section class="section-block reveal"><div class="section-heading"><div><span class="section-num">02 / ASSOCIATES</span><h2>Beyond the <em>agency.</em></h2><p>便利屋に関わる協力者たち。別々の世界観をタブで探せます。</p></div></div>
      <div class="associate-grid"><a href="#church" class="associate-tile assoc-church"><span class="assoc-label">ASSOCIATE / 001</span><span class="assoc-graphic">${icon('church',62)}</span><h3>教会組 <small>THE CHURCH</small></h3><span class="assoc-link">VIEW FACTION ${icon('north',20)}</span></a>
      <a href="#informants" class="associate-tile assoc-informants"><span class="assoc-label">ASSOCIATE / 002</span><span class="assoc-graphic">${icon('radio',62)}</span><h3>情報屋 <small>INFORMANTS</small></h3><span class="assoc-link">VIEW PROFILES ${icon('north',20)}</span></a></div></section>
    <section class="home-bottom-grid reveal"><a class="explore-tile" href="#relations"><span class="section-num">03 / RELATIONSHIPS</span><div class="explore-mark">${icon('network',45)}</div><h3>人と人の、つながり。</h3><p>相関図から人物や組織を探す。</p><span class="tile-arrow">${icon('north',23)}</span></a><a class="explore-tile" href="#city"><span class="section-num">04 / CITY GUIDE</span><div class="explore-mark">${icon('building',45)}</div><h3>この街にある場所。</h3><p>事務所や教会など、建物の記録。</p><span class="tile-arrow">${icon('north',23)}</span></a></section>`;}
  function charactersPage(){let filters=[['agency','便利屋'],['all','すべて'],['church','教会組'],['informants','情報屋']];let members=DATA.characters.filter(c=>state.characterFilter==='all'||c.group===state.characterFilter);
    return `${topTitle('01 / CHARACTER DATABASE','CHARACTERS.','メンバーと協力者のキャラクターファイル。')}
    <div class="filter-bar reveal"><div class="seg-tabs" role="group" aria-label="キャラクターを絞り込む">${filters.map(([id,label])=>`<button class="seg-btn ${state.characterFilter===id?'selected':''}" data-filter="${id}">${label}</button>`).join('')}</div><span class="result-count">${String(members.length).padStart(2,'0')} RECORDS FOUND</span></div>
    <div class="char-grid content-char-grid">${members.map(c=>charCard(c)).join('')}</div><div class="editorial-note">※ 登録内容は試作用の仮データです。正式な名前・設定・イラストで差し替えられます。</div>`;}
  function churchPage(){let members=DATA.characters.filter(c=>c.group==='church');return `<section class="faction-hero faction-church reveal"><div><div class="eyebrow"><i></i>ASSOCIATES / 001</div><h1>THE<br/><em>CHURCH.</em></h1><p>便利屋に関わる協力者たち。<br/>教会の世界観に合わせて、銀青の配色に切り替わります。</p><span class="faction-note">FACTION ARCHIVE / CHURCH SIDE</span></div><div class="faction-seal">${icon('church',110)}</div></section>
    <section class="section-block reveal"><div class="section-heading"><div><span class="section-num">MEMBER DIRECTORY</span><h2>Church <em>members.</em></h2></div>${buttonRoute('教会の建物を見る','place/church','text')}</div><div class="char-grid content-char-grid">${members.map(c=>charCard(c)).join('')}</div></section>`;}
  function safeReadStorage(){try{return JSON.parse(localStorage.getItem('oc-archive-prompt-drafts-v1')||'{}');}catch{return {};}}
  function getPrompt(id,kind){const storage=safeReadStorage();const key=id+'-'+kind;return typeof storage[key]==='string'?storage[key]:(getChar(id)?.prompts?.[kind]||'');}
  function promptBox(id,kind){const key=id+'-'+kind;const val=getPrompt(id,kind);const editing=state.editPrompt===key;const name=kind==='character'?'CHARACTER PROMPT':'BASE / COMPOSITION';return `<div class="prompt-box">
    <div class="prompt-head"><div><span class="small-stripe"></span><strong>${name}</strong><small>${kind==='character'?'外見・固定設定':'ポーズ・構図・背景'}</small></div><div class="prompt-actions">${val?`<button class="mini-btn" data-copy-prompt="${esc(key)}" aria-label="プロンプトをコピー">${icon('copy',15)}<span>コピー</span></button>`:''}<button class="mini-btn" data-edit-prompt="${esc(key)}">${icon(editing?'close':'edit',15)}<span>${editing?'閉じる':'編集'}</span></button></div></div>
    ${editing?`<div class="prompt-editor"><textarea id="editor-${esc(key)}" rows="7" aria-label="${name} 編集" placeholder="ここにNovelAI用プロンプトを貼り付けます">${esc(val)}</textarea><div class="prompt-editor-bottom"><span>このブラウザにのみ保存されます</span><button class="btn btn-small btn-primary" data-save-prompt="${esc(key)}">${icon('check',15)} 保存</button></div></div>`:`<div class="prompt-body ${val?'has-content':'empty-content'}">${val?`<pre>${esc(val)}</pre>`:`<div class="empty-note">${icon('folder',23)}<span>プロンプトはまだ登録されていません。</span></div>`}</div>`}
  </div>`;}
  function informantsPage(){const id=state.informant;const c=getChar(id);return `${topTitle('02 / ASSOCIATES','INFORMANTS.','情報屋の二人を個別に紹介。各キャラクターのNAI用プロンプトを分けて保管できます。')}
   <div class="informant-tabs reveal">${DATA.characters.filter(x=>x.group==='informants').map(x=>`<button class="informant-tab ${x.id===id?'active':''}" data-informant="${x.id}"><span>${esc(x.en)}</span><strong>${esc(x.name)}</strong>${icon('north',19)}</button>`).join('')}</div>
   <section class="informant-layout reveal"><div class="informant-art-column">${imgOrPlaceholder(c,'big-art')}<div class="tag-line">ASSOCIATE / INFORMATION BROKER</div><a href="${href('character/'+c.id)}" class="text-link">プロフィール全体を見る ${icon('north',17)}</a></div><div class="informant-content"><div class="character-eyebrow">INFORMANT FILE — ${esc(c.index)}</div><h2>${esc(c.name)}</h2><p class="intro-text">${esc(c.description)}</p>
   <div class="prompt-title"><div><span class="section-num">PROMPT LIBRARY</span><h3>Generation <em>prompts.</em></h3></div><span class="tag-outline">NOVELAI</span></div>
   ${promptBox(id,'character')}${promptBox(id,'composition')}
   <p class="storage-note">${icon('info',16)} 「編集・保存」は試作用で、入力内容は現在使用中のブラウザ内だけに保存されます。公開サイトの内容を変更する機能ではありません。正式公開用プロンプトは data.js に登録します。</p>
   </div></section>`;}
  function profilePage(id){const c=getChar(id);if(!c)return notFound();const tabs=[['about','PROFILE'],['gallery','GALLERY'],...(c.group==='informants'?[['prompts','PROMPTS']]:[])];return `<a href="${href(c.group==='informants'?'informants':c.group==='church'?'church':'characters')}" class="backlink">${icon('back',16)} BACK TO ${c.group==='informants'?'INFORMANTS':c.group==='church'?'CHURCH':'CHARACTERS'}</a>
    <section class="profile-layout reveal"><div class="profile-image-col">${imgOrPlaceholder(c,'profile-art')}<div class="profile-image-foot"><span>NO. ${esc(c.index)}</span><span>ARTWORK NOT SET</span></div></div><div class="profile-info-col"><div class="eyebrow"><i></i>${esc(c.role)} / OC FILE</div><div class="profile-heading"><h1>${esc(c.name)}</h1><span>${esc(c.en)}</span></div><div class="profile-divider"></div><div class="profile-meta"><div><small>AFFILIATION</small><b>${esc(groupText(c.group))}</b></div><div><small>IDENTIFIER</small><b>OC / ${esc(c.index)}</b></div><div><small>STATUS</small><b>DETAILS PENDING</b></div></div>
    <div class="subtabs">${tabs.map(([key,label])=>`<button data-profile-tab="${key}" class="subtab ${state.profileTab===key?'active':''}">${label}</button>`).join('')}</div><div class="profile-tabpanel">${state.profileTab==='about'?`<div class="section-num">CHARACTER DESCRIPTION</div><p class="profile-description">${esc(c.description)}</p><div class="profile-tags">${c.attributes.length?c.attributes.map(a=>`<span>${esc(a)}</span>`).join(''):'<span>設定準備中</span>'}</div><div class="linked-resource"><span>RELATED LOCATION</span><a href="${href(c.group==='church'?'place/church':'place/office')}">${icon('building',18)} ${esc(c.group==='church'?'教会':'便利屋の事務所')} ${icon('north',15)}</a></div>`:state.profileTab==='gallery'?`${c.image?`<img class="profile-gallery-image" src="${esc(c.image)}" alt="${esc(c.name)}">`:`<div class="empty-subpanel">${icon('image',34)}<strong>イラスト未登録</strong><p>このキャラクターの作品を追加すると、ギャラリーから閲覧できます。</p><a href="#gallery" class="text-link">ギャラリーへ ${icon('north',16)}</a></div>`}`:`${promptBox(c.id,'character')}${promptBox(c.id,'composition')}<p class="storage-note">${icon('info',15)} 編集した内容はこのブラウザにだけ保存されます。</p>`}</div>
    <div class="profile-bottom-links"><a href="#relations">${icon('network',19)} 人物相関図へ ${icon('north',17)}</a><a href="#characters">${icon('users',19)} 一覧へ ${icon('north',17)}</a></div></div></section>`;}
  function relationsPage(){const orgMode=state.relMode==='groups';let nodes=orgMode?[{id:'agency',name:'便利屋',en:'MAIN FACTION',x:50,y:43,type:'red'},{id:'church',name:'教会組',en:'ASSOCIATE',x:22,y:75,type:'blue'},{id:'informants',name:'情報屋',en:'ASSOCIATE',x:78,y:75,type:'violet'}]:[
      {id:'ashiya',name:'アシヤ',en:'AGENCY',x:20,y:25,type:'red'},{id:'blackhair',name:'黒髪の男',en:'AGENCY',x:50,y:25,type:'red'},{id:'pinkhair',name:'ピンク髪の男',en:'AGENCY',x:80,y:25,type:'red'},
      {id:'sister',name:'シスター',en:'CHURCH',x:20,y:74,type:'blue'},{id:'informant01',name:'情報屋 01',en:'INFORMANT',x:50,y:74,type:'violet'},{id:'informant02',name:'情報屋 02',en:'INFORMANT',x:80,y:74,type:'violet'}];
    let selected=nodes.find(n=>n.id===state.relSelected)||nodes[0];let details=orgMode?(selected.id==='agency'?'この物語の中心となる組織。':selected.id==='church'?'便利屋の協力者として掲載する教会組。':'便利屋に関わる情報屋二人のカテゴリ。'):(getChar(selected.id)?.description||'人物設定は未登録です。');
    let link=orgMode?(selected.id==='agency'?'characters':selected.id==='church'?'church':'informants'):'character/'+selected.id;
    return `${topTitle('03 / CONNECTIONS','RELATIONSHIP.','組織や人物を選択して、関連情報に移動できます。')}
    <div class="relation-toolbar reveal"><div class="seg-tabs" role="group" aria-label="相関図の表示"><button data-rel-mode="groups" class="seg-btn ${orgMode?'selected':''}">組織相関図</button><button data-rel-mode="people" class="seg-btn ${!orgMode?'selected':''}">人物一覧図</button></div><div class="relation-legend"><span><i class="legend-red"></i>便利屋</span><span><i class="legend-blue"></i>教会組</span><span><i class="legend-violet"></i>情報屋</span></div></div>
    <div class="relation-layout reveal"><div class="relation-canvas"><div class="relation-grid"></div><span class="canvas-indicator">RELATIONSHIP / ${orgMode?'FACTIONS':'PEOPLE'}</span><svg class="relation-lines" viewBox="0 0 1000 550" preserveAspectRatio="none" aria-hidden="true">${orgMode?`<path d="M500 237 Q350 240 220 410"/><path d="M500 237 Q650 240 780 410"/>`:`<path d="M200 138H800M200 405H800"/><path d="M200 138V405M500 138V405M800 138V405"/>`}</svg>
      ${nodes.map(n=>`<button class="rel-node rel-${n.type} ${selected.id===n.id?'rel-active':''}" style="left:${n.x}%;top:${n.y}%" data-rel-node="${n.id}"><small>${esc(n.en)}</small><strong>${esc(n.name)}</strong><span>${icon('plus',13)}</span></button>`).join('')}<span class="canvas-corner">CLICK A NODE TO VIEW DETAILS</span></div>
      <aside class="relation-details"><span class="section-num">SELECTED NODE</span><div class="relationship-dot dot-${selected.type}"></div><h2>${esc(selected.name)}</h2><p class="muted">${esc(selected.en)}</p><div class="thin-divider"></div><p>${esc(details)}</p>${orgMode?`<span class="notice-small">※ 線は協力者カテゴリのつながりを示します。細かな人間関係は未設定です。</span>`:`<span class="notice-small">※ 人物一覧の線は配置を示すもので、人間関係を確定するものではありません。</span>`}<a href="${href(link)}" class="btn btn-primary btn-full">詳細を見る ${icon('north',16)}</a></aside>
    </div>`;}
  function cityCard(p,featured){return `<a class="location-card ${featured?'featured-location':''} ${p.group==='church'?'location-church':''}" href="${href('place/'+p.id)}"><div class="location-visual">${placeArt(p)}</div><div class="location-body"><div class="location-topline"><span>LOCATION / ${esc(p.index)}</span><span>${esc(p.category)}</span></div><h2>${esc(p.name)}</h2><p>${esc(p.description)}</p><div class="location-footer"><span>${esc(p.en)}</span><span class="circ-arrow">${icon('north',20)}</span></div></div></a>`;}
  function cityPage(){return `${topTitle('04 / LOCAL DIRECTORY','CITY GUIDE.','便利屋の事務所、教会、街の施設をカードから探索。')}
    <div class="city-list reveal">${DATA.locations.map((p,i)=>cityCard(p,i===0)).join('')}<div class="location-add"><div class="add-circle">${icon('plus',28)}</div><strong>MORE LOCATIONS</strong><span>施設は後からいくつでも追加可能</span></div></div>`;}
  function placePage(id){let p=DATA.locations.find(x=>x.id===id);if(!p)return notFound();const tabs=[['about','概要'],['images','外観・内観'],['people','関連人物']];return `<a href="#city" class="backlink">${icon('back',16)} BACK TO CITY GUIDE</a><section class="location-hero reveal ${p.group==='church'?'location-church':''}"><div class="location-hero-left"><span class="section-num">LOCATION / ${esc(p.index)} — ${esc(p.category)}</span><h1>${esc(p.en)}</h1><h2>${esc(p.name)}</h2><p>${esc(p.description)}</p></div><div class="location-hero-art">${placeArt(p)}</div></section>
      <div class="subtabs location-tabs">${tabs.map(([key,label])=>`<button data-location-tab="${key}" class="subtab ${state.locationTab===key?'active':''}">${label}</button>`).join('')}</div>
      <div class="location-details-panel reveal">${state.locationTab==='about'?`<div class="detail-two"><div><span class="section-num">ABOUT THIS LOCATION</span><h3>施設の記録</h3><p>${esc(p.description)}</p></div><div class="detail-rows">${p.details.map(([key,val])=>`<div><span>${esc(key)}</span><strong>${esc(val)}</strong></div>`).join('')}</div></div>`:state.locationTab==='images'?`${p.image?`<img class="location-gallery-image" src="${esc(p.image)}" alt="${esc(p.name)}">`:`<div class="empty-subpanel">${icon('image',36)}<strong>外観・内観イラストは未登録</strong><p>建物や部屋のイラストをここに掲載できます。</p></div>`}`:`<div class="section-num">CHARACTERS CONNECTED TO THIS LOCATION</div><div class="related-chars">${p.related.map(id=>{let c=getChar(id);return `<a href="${href('character/'+id)}"><div class="related-char-portrait">${icon('users',19)}</div><span>${esc(c?.name||id)}</span>${icon('north',16)}</a>`;}).join('')}</div>`}</div>`;}
  function galleryPage(){let filter=state.galleryFilter;const filters=[['all','すべて'],['agency','便利屋'],['church','教会組'],['informants','情報屋']];const sampleItems=DATA.gallery.filter(i=>filter==='all'||i.group===filter);
   return `${topTitle('05 / VISUAL ARCHIVE','GALLERY.','オリジナルイラストや、いただいた作品をまとめるギャラリー。')}
    <div class="filter-bar reveal"><div class="seg-tabs">${filters.map(([id,label])=>`<button data-gallery-filter="${id}" class="seg-btn ${filter===id?'selected':''}">${label}</button>`).join('')}</div><span class="result-count">${String(sampleItems.length).padStart(2,'0')} ARTWORK SLOTS</span></div>
    <div class="gallery-grid reveal">${sampleItems.map((item,i)=>`<button data-gallery-open="${item.id}" class="gallery-tile gallery-${item.shape} art-${groupColor(item.group)} ${item.image?'gallery-loaded':''}">${item.image?`<img class="gallery-image" src="${esc(item.image)}" alt="${esc(item.label)}" loading="lazy">`:''}<span class="gallery-topline">ARTWORK / ${String(i+1).padStart(2,'0')}</span>${item.image?'':`<span class="gallery-center">${icon('image',35)}<span>NO IMAGE YET</span></span>`}<span class="gallery-bottom"><span>${esc(item.label)}</span>${icon('north',18)}</span></button>`).join('')}</div><div class="editorial-note">画像未登録の枠は仮表示です。data.jsのgalleryに画像パスを設定すると作品が表示され、クリックで拡大できます。</div>`;}
  function notFound(){return topTitle('NOT FOUND','PAGE NOT FOUND.','指定したデータが見つかりません。')+buttonRoute('HOMEへ戻る','home');}
  function modalMarkup(){if(!state.modal)return '';const artwork=DATA.gallery.find(g=>g.id===state.modal);return `<div class="modal-backdrop" data-close-modal="1"><div class="modal-card" role="dialog" aria-modal="true" aria-label="ギャラリーのプレビュー"><button class="modal-close" data-close-modal="1" aria-label="閉じる">${icon('close',22)}</button>${artwork?.image?`<img class="modal-image" src="${esc(artwork.image)}" alt="${esc(artwork.label)}">`:`<div class="modal-art">${icon('image',56)}<b>ARTWORK NOT REGISTERED</b><span>画像登録後に、ここに拡大表示されます。</span></div>`}<p>${esc(artwork?.label||'GALLERY PREVIEW')}</p></div></div>`;}
  function render(resetScroll=false){const {page,id}=routeInfo();const pages={home:homePage,characters:charactersPage,church:churchPage,informants:informantsPage,relations:relationsPage,city:cityPage,gallery:galleryPage};
    const html=page==='character'?profilePage(id):page==='place'?placePage(id):(pages[page]||homePage)();document.title=`${page==='character'?getChar(id)?.name||'CHARACTER':page==='place'?DATA.locations.find(l=>l.id===id)?.name||'LOCATION':N[page]||'HOME'} | OC ARCHIVE`;
    app.innerHTML=shell(page,html);document.body.classList.toggle('modal-open',Boolean(state.modal));if(resetScroll)window.scrollTo({top:0,behavior:'instant'});}
  function toast(message){let t=document.getElementById('toast');if(!t)return;t.textContent=message;t.classList.add('shown');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('shown'),2900);}
  document.addEventListener('click',async e=>{
    let el=e.target.closest('[data-menu],[data-filter],[data-gallery-filter],[data-informant],[data-profile-tab],[data-location-tab],[data-rel-mode],[data-rel-node],[data-copy-prompt],[data-edit-prompt],[data-save-prompt],[data-gallery-open],[data-close-modal]');
    if(el){
      if(el.dataset.menu){state.mobileMenu=el.dataset.menu==='toggle'?!state.mobileMenu:false;render();return;}
      if(el.dataset.filter){state.characterFilter=el.dataset.filter;render();return;}
      if(el.dataset.galleryFilter){state.galleryFilter=el.dataset.galleryFilter;render();return;}
      if(el.dataset.informant){state.informant=el.dataset.informant;state.editPrompt=null;render();return;}
      if(el.dataset.profileTab){state.profileTab=el.dataset.profileTab;state.editPrompt=null;render();return;}
      if(el.dataset.locationTab){state.locationTab=el.dataset.locationTab;render();return;}
      if(el.dataset.relMode){state.relMode=el.dataset.relMode;state.relSelected=el.dataset.relMode==='groups'?'agency':'ashiya';render();return;}
      if(el.dataset.relNode){state.relSelected=el.dataset.relNode;render();return;}
      if(el.dataset.editPrompt){state.editPrompt=state.editPrompt===el.dataset.editPrompt?null:el.dataset.editPrompt;render();return;}
      if(el.dataset.savePrompt){const key=el.dataset.savePrompt;const area=document.getElementById('editor-'+key);if(area){try{let storage=safeReadStorage();storage[key]=area.value;localStorage.setItem('oc-archive-prompt-drafts-v1',JSON.stringify(storage));state.editPrompt=null;render();toast('このブラウザに保存しました（公開サイトは変更されません）');}catch{toast('保存できませんでした。ブラウザの設定をご確認ください。');}}return;}
      if(el.dataset.copyPrompt){let [id,kind]=el.dataset.copyPrompt.split(/-(?=[^-]+$)/);let value=getPrompt(id,kind);if(value){try{await navigator.clipboard.writeText(value);toast('プロンプトをコピーしました');}catch{const a=document.createElement('textarea');a.value=value;document.body.append(a);a.select();let ok=document.execCommand('copy');a.remove();toast(ok?'プロンプトをコピーしました':'コピーできませんでした');}}return;}
      if(el.dataset.galleryOpen){state.modal=el.dataset.galleryOpen;render();return;}
      if(el.dataset.closeModal){if(e.target===el||el.classList.contains('modal-close')){state.modal=null;render();}return;}
    }
    let anchor=e.target.closest('a[href^="#"]');if(anchor){state.mobileMenu=false;state.modal=null;if(anchor.getAttribute('href')===location.hash){render();window.scrollTo({top:0,behavior:'smooth'});}}
  });
  window.addEventListener('hashchange',()=>{state.profileTab='about';state.locationTab='about';state.editPrompt=null;state.modal=null;state.mobileMenu=false;render(true);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&(state.modal||state.mobileMenu)){state.modal=null;state.mobileMenu=false;render();}});
  if(!location.hash)history.replaceState(null,'','#home');render();
})();
